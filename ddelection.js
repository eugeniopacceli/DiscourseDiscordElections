// by Eugênio Fonseca
var express = require('express');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
var https = require('https');
var fs = require('fs');
var request = require('request');
var session = require('express-session');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/avatars', express.static(__dirname + '/avatars'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'discourseDiscordElectionsv1',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

var sessions = {}; 

/*
function ensureSecure(req, res, next){
  if(req.secure){
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
}

app.all('*', ensureSecure);
*/

app.get('/elections/', function (req, res) {
    res.sendFile(__dirname+'/elections.html');
});

function generateFileName(voteId){
    return __dirname + "/votesDatabase/" + voteId + ".txt";
}

function generateVoteResponse(id, username, content){
    return "Your vote id: <code>"+ id + "</code><br/>" +
           "Your Discord username: <code>" + username + "</code><br/>" +
           "Your vote formulary:<br><code>" + content +
           "</code><hr/><p>You may vote again by coming back, doing so will overwrite your last vote. Thank you for participating!</p>";
}

function generateErrorResponse(err){
    return "Your vote could not be computed, contact the administration or try to fix the following error: " + err;
}

app.post('/elections/vote/', function(req, res) {
    if(req.session.usercode == null || sessions[req.session.usercode] == null){
        res.send(generateErrorResponse("Bro/sis, there was an error in validating your session, go back to the election main page and start the authentication proccess again. Sorry!!"));
        return;
    }
    
    if(req.body == null || req.body.candidates == null){
        res.send(generateErrorResponse("No form sent."));
        return;
    }

    if(req.body.candidates.length > 5){
        res.send(generateErrorResponse("You voted for more than 5 candidates, you can only vote 5 or less."));
    }

    var voteFormContentProcessed = JSON.stringify(req.body, null, 4) + "\n" +  JSON.stringify(sessions[req.session.usercode], null, 4);
    console.log(voteFormContentProcessed);
    fs.writeFile(generateFileName(req.session.usercode), voteFormContentProcessed, 'utf8', function(err){
        if(err){
            res.send("Error while storing your vote, contact the administration of the Discourse Discord server!");
            return;
        }else{
            let username = sessions[req.session.usercode].username;
            sessions[req.session.usercode] = null;
            res.send(generateVoteResponse(req.session.usercode, username, voteFormContentProcessed));
            return;
        }
    });
});

app.get('/elections/dash/', function (req, res) {
    if(req.session.usercode == null || sessions[req.session.usercode] == null){
        res.send("Bro/sis, there was an error in validating your session, go back to the election main page and start the authentication proccess again. Sorry!!");
    }else{
        res.sendFile(__dirname+'/elections.dash.html');
    }
});

// https://cdn.discordapp.com/avatars/user_id/user_avatar.png

app.get('/elections/guard/', function (req, res) {
    if(req.query.code == null || req.query.code == '' || req.query.state == null || req.query.state == ''){
        res.sendFile(__dirname+'/elections.html');
    }
    request.post(
        {
            url:'https://discordapp.com/api/oauth2/token',
            form: {client_id:'382330416931143691',
                    client_secret: '_kqTfI3f7iR1eJhWId0AvF_Ac5gy96kq',
                    grant_type: 'authorization_code',
                    code: req.query.code,
                    redirect_uri: 'https://discoursediscord.com/elections/guard/'
            }
        }, function(err,httpResponse,body){
            var bodyParsed = JSON.parse(body);
            request.get(
                {
                    url:'https://discordapp.com/api/users/@me',
                    headers: {
                         'Authorization': 'Bearer ' + bodyParsed.access_token
                    }
                 }, function(err,httpResponse,body){
                         let userInfo = JSON.parse(body);
                         req.session.usercode = userInfo.id + "_" + randomstring.generate(15);
                         sessions[req.session.usercode] = userInfo;
    	                 res.sendFile(__dirname+'/elections.guard.html');
                 });
        });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/landing.html');
});

app.get('/rules', function (req, res) {
    res.sendFile(__dirname+'/rules.html');
});

app.get('/modrules', function (req, res) {
    res.sendFile(__dirname+'/modrules.html');
});

/*
app.get('/.well-known/acme-challenge/JTLck0Y7Lf6eatYo2IfTb9EJhYAcOv2ZY0rGHJHVSN0', function (req, res) {
    res.send('JTLck0Y7Lf6eatYo2IfTb9EJhYAcOv2ZY0rGHJHVSN0.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/Dg5PqicXG0SBvuQuMSqsTUwfh3iv60lNmAygjIUXc34', function (req, res) {
    res.send('Dg5PqicXG0SBvuQuMSqsTUwfh3iv60lNmAygjIUXc34.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/I9YqAL1L90PTeZM2Z9JcAAIS53PM0s_EPgylRVvYI4Y', function (req, res) {
    res.send('I9YqAL1L90PTeZM2Z9JcAAIS53PM0s_EPgylRVvYI4Y.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/d8ekr3soTRezGYALa8t6LA4S0Usvr2UDUua5tWuzTWM', function (req, res) {
    res.send('d8ekr3soTRezGYALa8t6LA4S0Usvr2UDUua5tWuzTWM.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/yDhGk4sofERBBe5sxrU3yJkwDqtd6US8WDq2YFyvLKs', function (req, res) {
    res.send('yDhGk4sofERBBe5sxrU3yJkwDqtd6US8WDq2YFyvLKs.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/zmjFMcaBW_7owKOc_Tn4wJHB-bdJ98AGNzs4pOMk4cM', function (req, res) {
    res.send('zmjFMcaBW_7owKOc_Tn4wJHB-bdJ98AGNzs4pOMk4cM.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/AJiUy96LIEvv8V5S87U0fBmtY7vTfoFrS83mSOIzPHk', function (req, res) {
    res.send('AJiUy96LIEvv8V5S87U0fBmtY7vTfoFrS83mSOIzPHk.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/PwGUSnf2KabA9mPLzSUPfQfqrG0qOmo3GbE9bZUtOtM', function (req, res) {
    res.send('PwGUSnf2KabA9mPLzSUPfQfqrG0qOmo3GbE9bZUtOtM.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/vRSHXnkQPvkXpOL65EwVHwpzXE2GyQZhH0lq46kC3U4', function (req, res) {
    res.send('vRSHXnkQPvkXpOL65EwVHwpzXE2GyQZhH0lq46kC3U4.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});
app.get('/.well-known/acme-challenge/lkjjV2yuJqymbI8AMtqaRsGOSgUt_ALcNYskLDZs9b0', function (req, res) {
    res.send('lkjjV2yuJqymbI8AMtqaRsGOSgUt_ALcNYskLDZs9b0.46QbIVeOSDdIes_Y5TQ82NrPC6Me0i_nsEUDPGjx7K0');
});*/

var credentials = { key: fs.readFileSync('/etc/letsencrypt/live/discoursediscord.com/privkey.pem'),
                    cert: fs.readFileSync('/etc/letsencrypt/live/discoursediscord.com/fullchain.pem') };

https.createServer(credentials, app).listen(443);

app.listen(80, function () {
    console.log('Discourse Discord Election Server listening on port 80 and 443!');
});

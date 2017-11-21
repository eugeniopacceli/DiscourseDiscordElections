// by Eugênio Fonseca
var express = require('express');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
var https = require('https');
var fs = require('fs');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

/*
function ensureSecure(req, res, next){
  if(req.secure){
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
}

app.all('*', ensureSecure);
*/

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
function generateFileName(voteId){
    return __dirname + "/votesDatabase/" + voteId + ".txt";
}

function generateVoteResponse(id, content){
    return "Your vote id: <code>"+ id + "</code><br>Your vote formulary:<br><code>" + content + "</code>";
}

function generateErrorResponse(err){
    return "Your vote could not be computed, contact the administration or try to fix the following error: " + err;
}

app.post('/vote', function(req, res) {
    if(req.body == null || req.body.candidates == null){
        res.send(generateErrorResponse("No form sent."));
        return;
    }
    if(req.body.candidates.length > 5){
        res.send(generateErrorResponse("You voted for more than 5 candidates, you can only vote 5 or less."));
    }

    var voteId = randomstring.generate(5);
    var voteFormContentProcessed = JSON.stringify(req.body, null, 4);
    console.log(voteFormContentProcessed);
    fs.writeFile(generateFileName(voteId), voteFormContentProcessed, 'utf8', function(err){
        if(err){
            res.send("Error, contact the administration of the Discourse Discord server!");
        }else{
            res.send(generateVoteResponse(voteId, voteFormContentProcessed));
        }
    });
});*/

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

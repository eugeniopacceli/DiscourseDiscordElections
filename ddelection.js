// by Eugênio Fonseca
var express = require('express');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
var fs = require('fs');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

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

app.listen(80, function () {
    console.log('Discourse Discord Election Server listening on port 80!');
});
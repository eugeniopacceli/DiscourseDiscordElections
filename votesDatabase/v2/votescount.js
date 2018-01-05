const fs = require('fs');

let votes = [];

fs.readdir('./', (err, files) => {
    files.forEach(file => {
        if (file.split(".")[1] == "txt") {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) throw err;
                let obj = JSON.parse(data);
                votes.push(obj);
            });
        }
    });
});

// Apply this function to the votes array and it returns a map (username => number of votes)
function countVotes(voteArray) {
    let countMem = {};
    voteArray.forEach(i => {
        voteObj = i.votes.candidates;
        if (voteObj instanceof Array) {
            voteObj.forEach(v => {
                if (countMem[v] == null) {
                    countMem[v] = 0;
                }
                countMem[v]++;
            });
        } else if (voteObj instanceof String) {
            if (countMem[voteObj] == null) {
                countMem[voteObj] = 0;
            }
            countMem[voteObj]++;
        }
    });
    return countMem;
}

// Apply this function to a map (username => number of votes) and it returns an sorted array (by vote)
// in which each position contains a {name: string, votes: integer} object, equivalent to a row in the map;
function sortVotes(votesMap) {
    let sortable = [];
    Object.keys(votesMap).forEach(k => {
        sortable.push({
            name: k,
            votes: votesMap[k]
        });
    });
    sortable.sort(function (a, b) {
        return b.votes - a.votes;
    });
    return sortable;
}
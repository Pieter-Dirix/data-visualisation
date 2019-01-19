const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const csv = require("csvtojson");
var jsondata = undefined;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/data', function (req, res) {
    res.send(jsondata);
});

app.get('/settings', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/settings.json'));
});

app.get('/app', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app.js'));
});

function init(){
    csv()
        .fromFile("./data/astronauts.csv")
        .then((parsed) => {
            jsondata = parsed;
            app.listen(port, () => console.log(`Meteorite app listening on port ${port}!`));
        }, (error)=>{
            console.log(error);
        })
};

init();

//cd D:\_GIT\DataViz\vb\"meteor - Copy"\
//
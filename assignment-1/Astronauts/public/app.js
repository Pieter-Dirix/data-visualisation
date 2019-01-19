var nasa = {};
var settings = undefined;
let spacewalk = [];

var settingrequest = new XMLHttpRequest();
settingrequest.open('GET', '/settings', true);
settingrequest.onload = function () {
    settings = JSON.parse(this.response);

    var datarequest = new XMLHttpRequest();
    datarequest.open('GET', '/data', true);
    datarequest.onload = function () {
        //load data
        var data = JSON.parse(this.response);
       // console.log(data);

        nasa.data = data;

        var myp5 = new p5(s, settings.vizid);
    };

    // Send request
    datarequest.send();

};
settingrequest.send();



//start sk
var s = function (sk) {
    let w;

    sk.setup = function () {
        w = window.innerWidth;

        tH = document.getElementById("t");
        h = window.innerHeight - tH.offsetHeight;
        sk.createCanvas(w, h);
        console.log(h);

        for (let index = 0; index < 100; index ++) {
           if(nasa.data[index]["Space Walks (hr)"] != 0) {
               let a = nasa.data[index];
                spacewalk.push(
                    new sk.astronaut(a["Name"], a["Space Walks (hr)"], a["Space Walks"], a["Missions"])
            );
           }
        }

        console.log(sk.random(0, w));
    };

    sk.draw = function () {
       sk.background(settings.secondarycolor);
        sk.fill(settings.primarycolor);
        sk.stroke(settings.primarycolor);
        let w = sk.width;

        sk.drawCircles();
    };

    sk.drawCircles = () =>{
        for(let i = 0; i < spacewalk.length; i++) {
            let a = spacewalk[i];
            a.x += sk.random(-2.5, 2.5);
            a.y += sk.random(-2.5, 2.5);
            a.draw();
        }
    };

    sk.astronaut = function(name, hrs, nr, missions) {
        this.name = name;
        this.hrs = hrs;
        this.nr = nr;
        this.missions = missions;
        this.x = sk.random(100, w);
        this.y = sk.random(100, h);
        this.w = 50;

        this.draw = function() {
            /*this.x = x;
            this.y = y;
            this.w = w;*/
            sk.fill(255);
            sk.ellipse(this.x, this.y, this.w, this.w);
            sk.fill(0);
            sk.textAlign(sk.CENTER);
            sk.text(this.hrs + "h", this.x, this.y);

        }
    };

    sk.mouseClicked = function() {
        let log = document.getElementById("log");
        for(let i = 0; i < spacewalk.length; i++) {

            let a = spacewalk[i];
            let d = sk.dist(sk.mouseX, sk.mouseY, a.x, a.y);
            if(d < a.w) {
                log.innerHTML = a.name + " has done " + a.nr + " space walks for a total of " + a.hrs + " hours of extravehicular activity";

            }
        }

    }
};

function hoursToDegrees(hours) {
    return (hours/24)*360;
}

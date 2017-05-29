'use strict';

var backgrounds = [ 'assets/img/bg1.jpg',
                   'assets/img/bg2.jpg',
                   'assets/img/bg3.jpg',
                   'assets/img/bg4.jpg'
                  ];

var canvas, context, x, y, start;
$(document).ready(function () {
    canvas = document.getElementById('canvas-player');
    context = canvas.getContext('2d');
    context.translate(0.5, 0.5);
    
    x = canvas.width / 2;
    y = canvas.height / 2;
    var radius = 70;
    var startAngle = 0;
    var endAngle = 2*Math.PI;
    var counterClockwise = false;

    context.lineWidth = 1;
    context.strokeStyle = '#F0F0F0';
    context.beginPath();
    context.arc(x, y, 250, startAngle, endAngle, counterClockwise);
    context.closePath();
    context.stroke();
    
    context.lineWidth = 1;
    context.strokeStyle = '#F0F0F0';
    context.beginPath();
    context.arc(x, y, 180, startAngle, endAngle, counterClockwise);
    context.closePath();
    context.stroke();    
});

function animatePlayer (step) {
    context.strokeStyle = '#FFF';
    context.lineWIdth = 3;
    context.beginPath();
    context.arc(x, y, 252, start, start+step, false);
    context.closePath();
    context.stroke();
    //alert(start + ' : ' + start+step);
    start=start+step;
    //animatePlayer(start)
};

function playerStartAnimation(duration) {
    var step = (360/duration)*(Math.PI/180);
    start = 0;
    setInterval(animatePlayer(step), 1000);
};

function setPlayerBackground(id) {
    $('#player').css('background-image', 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + '"' + backgrounds[id] + '")');
};



function play_pause (audio) {
    if(audio.paused) {
        audio.play();
    } else if(audio.ended) {
        audio.load();
    } else {
        audio.pause();
    }
};

function next (audio, id, songs) {
    if(id === songs.length-1) {
        id = 0;
    }
    else {
        id = id+1;
    }
    
    audio.src = songs[id];
    setPlayerBackground(id);
    return id;
};

function previous (audio, id, songs) {
    if(id === 0) {
        id = 3;
    } else {
        id = id-1;
    }
    
    setPlayerBackground(id);
    audio.src = songs[id];
    
    return id;
};
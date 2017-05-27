'use strict';

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

function playerStartAnimation(duration) {
    var step = (360/duration)*(Math.PI/180);
    start = 0;
    setInterval(animatePlayer(step, start), 1000);
};

function animatePlayer (step, start) {
    context.strokeStyle = '#FFF';
    context.lineWIdth = 3;
    context.beginPath();
    context.arc(x, y, 252, start, start+step, false);
    context.closePath();
    context.stroke();
    start=start+step;
}

function play_pause (audio) {
    if(audio.paused) {
        audio.play();
    } else if(audio.ended) {
        audio.load();
    } else {
        audio.pause();
    }
}

function next (audio, id, songs) {
    if(id+1 === songs.length) {
        id = 0;
    }
    else {
        id = id+1;
    }
    
    audio.src = songs[id];
    return id;
}

function previous (audio, id, songs) {
    if(id-1 === -1) {
        id = 3;
    } else {
        id = id-1;
    }
    
    audio.src = songs[id];
    
    return id;
}
'use strict';

var songs = [ 'assets/mp3/chopin-spring.mp3',
    'assets/mp3/chopin-tarantelle-op43.mp3',
    'assets/mp3/chopin-mazurka-in-d-major-b4.mp3',
    'assets/mp3/chopin-mazurka-in-d-major-b71.mp3'
    ];

var audio = new Audio();
audio.src = 'assets/mp3/chopin-spring.mp3';
audio.controls = false;
audio.autoplay = false;

$(document).ready(function () {
    $('#player').append(audio);
    
    $('li').click(function () { 
        audio.src=songs[$(this).data("id")];
    });
});


window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var analyser = context.createAnalyser();

window.addEventListener('load', function(e) {
  // Our <audio> element will be the audio source.
    var source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

}, false);


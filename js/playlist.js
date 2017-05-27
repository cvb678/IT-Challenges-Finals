'use strict';

var songs = [ 'assets/mp3/chopin-spring.mp3',
    'assets/mp3/chopin-tarantelle-op43.mp3',
    'assets/mp3/chopin-mazurka-in-d-major-b4.mp3',
    'assets/mp3/chopin-mazurka-in-d-major-b71.mp3'
    ];

var backgrounds = [ 'assets/img/bg1.jpg',
                   'assets/img/bg2.jpg',
                   'assets/img/bg3.jpg',
                   'assets/img/bg4.jpg'
                  ];

var audio = new Audio();
audio.src = 'assets/mp3/chopin-spring.mp3';
audio.controls = false;
audio.autoplay = false;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var analyser = context.createAnalyser();

window.addEventListener('load', function(e) {
  // Our <audio> element will be the audio source.
    var source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

}, false);

$(document).ready(function () {
    $('#player').append(audio);
    
    $('li').click(function () {
        var id = $(this).data("id");
        audio.src=songs[id];
        $('#player').css('background-image', 'url(' + '"' + backgrounds[id] + '")');
    });
});

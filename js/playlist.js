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

var currID = 0;

var audio = new Audio();
audio.src = 'assets/mp3/chopin-spring.mp3';
audio.controls = false;
audio.autoplay = true;

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
        currID = $(this).data("id");
        audio.src=songs[currID];
        audio.play();
        $('#player').css('background-image', 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + '"' + backgrounds[currID] + '")');
    });

    $('#stop-playback').click(function () {
       audio.pause(); 
    });
    
    $('#player-list').click(function () {
        $('html, body').animate({
        scrollTop: $("#stop-playback").offset().top
    }, 2000);           
    });
    
    $('#player-back').click(function () {
        currID = next(audio, currID, songs);
    });
    
    $('#player-next').click(function () {
        currID = previous(audio, currID, songs);
    });
    
    $('#player-playpause').click(function () {
        play_pause(audio);
    });
    audio.addEventListener("loadeddata", function() {
        playerStartAnimation(audio.duration);
    });
});

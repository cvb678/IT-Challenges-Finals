'use strict';

var songs = [ 'assets/mp3/chopin-spring.mp3',
    'assets/mp3/chopin-tarantelle-op43.mp3',
    'assets/mp3/chopin-mazurka-in-d-major-b4.mp3',
    'assets/mp3/chopin-mazurka-in-d-major-b71.mp3'
    ];


var titles = [ 'Spring', 
                'Tarantelle, Op. 43', 
                'Mazurka in D Major, Op. 4',
                'Mazurka in D Major, Op. 71'
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
        setPlayerBackground(currID);
        
        $('html, body').animate({
        scrollTop: $("#player").offset().top
        }, 1000);
    });

    $('#stop-playback').click(function () {
       audio.pause(); 
    });
    
    $('#player-list').click(function () {
        $('html, body').animate({
        scrollTop: $("#stop-playback").offset().top
        }, 1000);           
    });
    
    $('#player-back').click(function () {
        currID = previous(audio, currID, songs);
    });
    
    $('#player-next').click(function () {
        currID = next(audio, currID, songs);
    });
    
    $('#player-playpause').click(function () {
        play_pause(audio);
    });
    audio.addEventListener("loadeddata", function() {
        playerStartAnimation(audio.duration);
        $('#counter').html('00:00');
        $('#player-title').html(titles[currID]);
    });
    
    audio.addEventListener("timeupdate", function() {
     $('#counter').html(audio.currentTime.toFixed(2).toString());
    });
    
});

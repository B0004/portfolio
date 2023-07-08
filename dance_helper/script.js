
const my_video = document.getElementById("id-video");

const current_time = document.getElementById("id-current-time");

const chorus_start = document.getElementById("id-chorus-start");
const input_chorus_start = document.getElementById("input-chorus-start");
const chorus_start_go = document.getElementById("id-chorus-start-go");

const chorus_end = document.getElementById("id-chorus-end");
const input_chorus_end = document.getElementById("input-chorus-end");
const chorus_end_go = document.getElementById("id-chorus-end-go");

var chorus_start_time = 0;
var chorus_end_time = 0;

if (localStorage.getItem('stored_start_time')){
    chorus_start_time = localStorage.getItem('stored_start_time')
    chorus_start.textContent = chorus_start_time;
}

if (localStorage.getItem('stored_end_time')){
    chorus_end_time = localStorage.getItem('stored_end_time')
    chorus_end.textContent = chorus_end_time;
}

if (localStorage.getItem('stored_volume')){
    my_video.volume = localStorage.getItem('stored_volume')
}

my_video.onvolumechange = function() {
    localStorage.setItem('stored_volume', my_video.volume)
};

/*
setInterval(function() {
    current_time.textContent = my_video.currentTime.toFixed(2);
  }, 50);
*/

chorus_start.addEventListener("click", function(){
    chorus_start_time = my_video.currentTime.toFixed(2)
    chorus_start.textContent = chorus_start_time;
    localStorage.setItem('stored_start_time', chorus_start_time);
});

chorus_start_go.addEventListener("click", function(){
    my_video.currentTime = chorus_start_time;
});

input_chorus_start.addEventListener("change", (event) => {
    chorus_start_time = input_chorus_start.value;
    chorus_start.textContent = chorus_start_time;
    localStorage.setItem('stored_start_time', chorus_start_time);
  });

chorus_end_go.addEventListener("click", function(){
    my_video.currentTime = chorus_end_time;
});

chorus_end.addEventListener("click", function(){
    chorus_end_time = my_video.currentTime.toFixed(2)
    chorus_end.textContent = chorus_end_time;
    localStorage.setItem('stored_end_time', chorus_end_time);
});

input_chorus_end.addEventListener("change", (event) => {
    chorus_end_time = input_chorus_end.value;
    chorus_end.textContent = chorus_end_time;
    localStorage.setItem('stored_end_time', chorus_end_time);
});

/*
function capture() {
    var canvas = document.getElementById('frame_1');     
    var video = my_video;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
    canvas.toBlob() = (blob) => {
        const img = new Image();
        img.src = window.URL.createObjectUrl(blob);
    };
}

function create() {
    var chorus_duration = chorus_end_time - chorus_start_time;
    var beat_duration = chorus_duration / 32;
    for (i = 0; i < frames.length; i++){
        my_video.currentTime = parseFloat(chorus_start_time) + parseFloat(beat_duration * i);
        console.log(my_video.currentTime);
        console.log(i);
        canvas = frames[i];
        canvas.width = frame_width;
        canvas.height = frame_height; 
        canvas.getContext('2d').drawImage(my_video, 0, 0, frame_width, frame_height);  
        canvas.toBlob((blob) => {
            const img = new Image();
            img.src = window.URL.createObjectURL(blob);
        });
    }
}

*/

var frame_width = 160 * 4;
var frame_height = 90 * 4;
const frames_container = document.querySelector('.frames-container');

var beat_count = 1;
function draw(){
    let canvas = document.createElement('canvas');

    let canvas_frame = document.createElement('div');
    canvas_frame.className = "canvas-frame";
    let label = document.createElement('div');
    label.className = "labels";
    let frame = document.createElement('div');
    frame.className = "frames";

    canvas.setAttribute('class', 'frames');
    canvas.setAttribute('width', frame_width);
    canvas.setAttribute('height', frame_height);
    console.log(my_video.currentTime);
    // draw
    canvas.getContext('2d').drawImage(my_video, 0, 0, frame_width, frame_height);  
    canvas.toBlob((blob) => {
        const img = new Image();
        img.src = window.URL.createObjectURL(blob);
    });

    label.textContent = beat_count;
    beat_count++;
    if (beat_count > 8){
        beat_count = 1;
    }
    
    // Append the canvas element to a container or perform any desired operations
    canvas_frame.appendChild(canvas);
    frame.appendChild(canvas_frame);
    frame.appendChild(label);
    frames_container.appendChild(frame);
}    

function loop_create(){
    var chorus_duration = chorus_end_time - chorus_start_time;
    var beat_duration = chorus_duration / 32;
    var x = 32;
    var interval = 1000 * beat_duration;
    
    my_video.play();
    for (var i = 0; i < x; i++) {
        setTimeout(function () {
            draw();
        }, i * interval)
    }
}

function start_create(){
    
    my_video.currentTime = chorus_start_time;
    setTimeout(loop_create, 1000);
}


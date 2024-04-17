
var startTime = 0;
var endTime = 0;

timestamp.addEventListener("change", move);
timestamp.addEventListener("submit", move);
timestamp.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      move();
    }
  });
startBtn.addEventListener("click", getStartTime);
endBtn.addEventListener("click", getEndTime);
changeTimeBtn.addEventListener('click', changeTime)
jumpStart.addEventListener('click', jumpToStart);
jumpEnd.addEventListener('click', jumpToEnd);

function move(){
    console.log(timestamp.value);
    video.currentTime=timestamp.value;
}

function getStartTime(){
    startTime = video.currentTime;
    startBtn.textContent = 'start: ' + startTime;
}

function getEndTime(){
    endTime = video.currentTime;
    endBtn.textContent = 'end: ' + endTime;
}

function changeTime(){
    timestamp.value = video.currentTime;
}

function jumpToStart(){
    video.currentTime = startTime;
}

function jumpToEnd(){
    video.currentTime = endTime;
}
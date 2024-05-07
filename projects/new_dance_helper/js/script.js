const video = document.getElementById('selected-video');
const right = document.getElementById('right');
const startTimeInput = document.getElementById('start-time-input');
const endTimeInput = document.getElementById('end-time-input');
const beatNumberInput = document.getElementById('beat-number-input');
const createMapButton = document.getElementById('create-map-button');
const control = document.getElementById("control");
const left = document.getElementById("left");
const map = document.getElementById('map');
const alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
const moveDisplay = document.getElementById('move-display')

// create panel
for (let index = 0; index <= 512; index+=8) {
    if (index % 32 != 0){
        right.innerHTML += `<div class="sig-time"><div class="time-dif"></div>${index}<div class="timestamp"></div></div>`;
    }
    else {
        right.innerHTML += `<div class="sig-time thirty-two"><div class="time-dif"></div>${index}<div class="timestamp"></div></div>`;
    }
}

//get info from local storage if applicable
if (localStorage.startTime){
    var startTime = localStorage.getItem('startTime');
    startTimeInput.value = startTime;
    video.currentTime = startTime;
}
else {
    var startTime = 0;
}

if (localStorage.endTime){
    var endTime = localStorage.getItem('endTime');
    endTimeInput.value = endTime;
}
else {
    var endTime = 0;
}

if (localStorage.beatNumber){
    var beatNumber = localStorage.getItem('beatNumber');
    beatNumberInput.value = beatNumber
}
else {
    var beatNumber = 0;
}

if (localStorage.mapContent){
    map.innerHTML = localStorage.mapContent;
}

if (localStorage.moveBank){
    var moveBank = JSON.parse(localStorage.getItem("moveBank"));
    console.log(moveBank);
    console.log(typeof moveBank);
}
else {
    var moveBank = [];
}

//adjust start time
startTimeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        startTime = startTimeInput.value;
        video.currentTime = startTime;
        localStorage.setItem('startTime', startTime);
    }
});

//adjust end time
endTimeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        endTime = endTimeInput.value;
        video.currentTime = endTime;
        localStorage.setItem('endTime', endTime);
    }
});

//adjust beat number
beatNumberInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        beatNumber = beatNumberInput.value;
        localStorage.setItem('beatNumber', beatNumber);
    }
});


//create right bar
right.addEventListener("click", (event) => {
    if(event.target.classList.contains('sig-time')) {
        if(event.target.classList.contains('is-clicked')){
            event.target.classList.remove('is-clicked');
            event.target.children[0].textContent = '';
            event.target.children[1].textContent = '';

        }

        else if (event.target.textContent != 0){
            event.target.classList.add("is-clicked");
            event.target.children[0].textContent = (video.currentTime - event.target.previousSibling.children[1].textContent).toFixed(2);
            event.target.children[1].textContent = video.currentTime.toFixed(2);
        }
    }
})

//create map
createMapButton.addEventListener('click', createMap);

var beatDuration =  0;
//function to actually create map
function createMap(){
    console.log('cleared');
    //delete current map
    //map.innerHTML = "";

    startTime = parseFloat(startTime);
    endTime = parseFloat(endTime);
    beatNumber = parseFloat(beatNumber);

    var songLength = endTime - startTime;
    beatDuration = (songLength)/(beatNumber);

    var bpm = 60/beatDuration;
    var letterLength = beatNumber/32;
console.log(beatNumber);
    //create each letter box
    for (let i = 0, index = 0; i < letterLength; i++) {
        let letter = alphabet[i];
        let curSection = createSection(letter);
        curSection.children[0].textContent = letter;

        //create 4 rows in curSection
        for (let j = 0; j < 4; j++) {

            let curBar = createBar(letter, j+1);
            //create 8 beats
            for (let k = 0; k < 8; k++, index++) {
                curBeat = createBeat(letter, j+1, k+1, index, beatDuration);
                curBar.appendChild(curBeat);
            }
            curSection.children[1].appendChild(curBar);
        }  

        //append each section to map
        map.append(curSection);
    }

    localStorage.setItem("mapContent", map.innerHTML);
}


function createSection(letter){
    let newSection = document.createElement("div");
    newSection.classList.add("section");
    newSection.id = `section-${letter}`;
    
    let newSectionLetter = document.createElement("div");
    newSectionLetter.classList.add("section-letter");
    newSectionLetter.textContent = letter;
    
    let newSectionContent = document.createElement("div")
    newSectionContent.classList.add("section-content");
    
    newSection.appendChild(newSectionLetter);
    newSection.appendChild(newSectionContent);
    return newSection;
}


function createBar(letter, bar){
    let newBar = document.createElement("div");
    newBar.classList.add("bar", ("bar-" + bar));
    newBar.id = `bar-${letter}-${bar}`;
    return newBar;  
}

function createBeat(letter, bar, beat, index, beatDuration){
    let newBeat = document.createElement("div");
    newBeat.classList.add("beat");
    newBeat.id = `beat-${letter}-${bar}-${beat}`;
    newBeat.textContent = `${letter}-${bar}-${beat}`;
    beatStartTime = startTime + (index * beatDuration);
    beatEndTime = startTime + ((index+1) * beatDuration);
    newBeat.dataset.beatStartTime = beatStartTime;
    newBeat.dataset.beatEndTime = beatEndTime;
    return newBeat; 
}

//when click on beat
map.addEventListener("click", (event) => {
    if(event.target.classList.contains("beat")) {
        let clickedBeat = event.target;

        //jump to time
        video.currentTime = clickedBeat.dataset.beatStartTime;

        //put bar in control
        control.innerHTML = "";
        control.appendChild(clickedBeat.parentElement.cloneNode(true));
    }
})

control.addEventListener("click", (event) => {
    if(event.target.classList.contains("beat")) {
        let clickedBeat = event.target;

        //jump to time
        video.currentTime = clickedBeat.dataset.beatStartTime;
    }
})

left.addEventListener("click", (event) => {
    // if(event.target.classList.contains("beat")) {
    //     let clickedBeat = event.target;

    //     //jump to time
    //     video.currentTime = clickedBeat.dataset.beatStartTime;
    // }
    portionStart = 0;
    portionEnd = 300;
})

//inside control
$( function() {
    $("#control").selectable();
} );

var portionStart = 0;
var portionEnd = 300;
var sel = false;
//check for when control's children's class changes
const mutationObserver = new MutationObserver(entries => {
    if (control.children[0]){
        var selected = control.children[0].querySelectorAll(".ui-selected");
        if (selected.length > 0){
            sel = true;
            //set start and end time when selected changes as the first child with the selected tag
            portionStart = selected[0].dataset.beatStartTime;
            portionEnd = selected[selected.length - 1].dataset.beatEndTime;
            video.currentTime = portionStart;
        }
        else{
            sel = false;
            portionStart = 0;
            portionEnd = 300;
        }
    }
    else{
        portionStart = 0;
        portionEnd = 300;
    }
})

var curMove = "";
mutationObserver.observe(control, {childList: true, subtree: true, attributeFilter: ['class']})

video.addEventListener('timeupdate', function () {
    if (video.currentTime >= portionEnd) {
        video.currentTime = portionStart;
    }
    //check if move is in bank
    inBank(video.currentTime);

    //calculate current index
});

function getIndex(){
    (video.currentTime - startTime)
}

//check if current time is in bank
function inBank(ct){
    for (move of moveBank) {
        if ((ct > move.startTime)&&(ct < move.endTime)){
            //display move
            moveDisplay.textContent = move.text;
            return;
        }
        else{
            moveDisplay.textContent = "";
        }
    }
}

//make moves

function createMove(txt){
    let newMove = {
        startTime: portionStart,
        endTime: portionEnd,
        text: txt
    }
    //if overlap, delete old move

    for (let i = 0; i < moveBank.length; i++) {
        if(!(newMove.endTime <= moveBank[i].startTime || moveBank[i].endTime <= newMove.startTime)){
            //overlap, replace
            moveBank[i]= newMove;
            localStorage.setItem("moveBank", JSON.stringify(moveBank));
            return;
        }
    }
    moveBank.push(newMove);
    console.log(newMove.text);
    localStorage.setItem("moveBank", JSON.stringify(moveBank));
}

document.addEventListener('keydown', (event) => {
    //if something is currently selected, record input until escape or enter
    if(sel){
        var x = event.key;

        if(x == "Enter"){
            createMove(curMove);
            curMove = "";
            sel = false;
        }
        else if (x == "Escape"){
            curMove = "";
            sel = false;
        }
        else if (event.keyCode === 32){
            event.preventDefault();
            curMove += x;
            moveDisplay.textContent = curMove;

        }
        else{
            curMove += x;
            moveDisplay.textContent = curMove;
        }
    }
});


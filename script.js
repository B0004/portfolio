const fish_container = document.querySelector(".fish_container");
const chat_container = document.querySelector('.chat_container');
const parentElement = document.querySelector('.page_container');
const chatTextArray = [
  "a fortune telling web app featuring an astrology love compatibility calculator, a fortune cookie simulator, and a palm reading fortune teller",
  "a google chrome extension made for competitive pokemon battles on pokemon showdown, provides trainers with the latest meta sets of moves, abilities, items, and EV (Effort Value) spreads and makes teams automatically",
  "a web app designed to help dancers learn difficult choreographies by marking a video with a screen capture on every beat count to break down the choreography",
  "a google chrome extension that enables users to rate songs in a YouTube Music playlist by dynamically creating dropdown menus next to each song and provide users to select a rating from 'S' to 'F'",
  "where i went to school!",
  "my past positions and experiences!",
  "my hobbies and who i am!"
];

const pop = new Audio("bubble_pop.mp3");
const pufferfish = new Audio("pufferfish_longer.mp3");


var i = 0;
var chat_text = ''; /* The text */
var speed = 1; /* The speed/duration of the effect in milliseconds */

// Add event listener to the parent element
parentElement.addEventListener('mouseover', event => {
  if (event.target.classList.contains('chat_buttons')) {
    fish_container.style.top = "500px";
    pop.currentTime = 0;
    pop.play();
    chat_container.innerHTML = "";
    i = 0;
    chat_text = chatTextArray[event.target.id]
    fish_container.classList.add("is_bouncing");
    typeWriter();
  }
});

parentElement.addEventListener('mouseout', event => {
  if (event.target.classList.contains('chat_buttons')) {
    //display description
    chat_container.innerHTML = "";
    i = 0;
    chat_text = "hi! welcome to my portfolio! my name is brandon and i'm a front-end web developer. check out some of my projects and know more about me!"
    fish_container.classList.add("is_bouncing");
    typeWriter();
  }
});

function typeWriter() {
  if (i < chat_text.length) {
    chat_container.innerHTML += chat_text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  else{
    fish_container.classList.remove("is_bouncing");
  }
}

fish_container.addEventListener('click', function() {
  // Play the audio
  pufferfish.play();
});

const body = document.querySelector("body");
const hard = [
    "What is the most valuable life lesson you've learned so far?",
    "If you could change one decision from your past, what would it be and why?",
    "What does happiness mean to you?",
    "What's something you're passionate about and why?",
    "How do you handle difficult emotions or challenges?",
    "What's a fear you're currently trying to overcome?",
    "Describe a moment that made you feel truly alive.",
    "What's your biggest dream, and what steps are you taking to achieve it?",
    "Do you believe in fate or do you think we create our own destiny?",
    "What's something that always brings a smile to your face?",
    "How do you define success for yourself?",
    "What's a book, movie, or song that has deeply influenced you?",
    "What's the best piece of advice you've ever received?",
    "If you could have a conversation with your younger self, what would you say?",
    "What's the most significant change you've undergone in the last year?",
    "Do you think vulnerability is a strength or a weakness?",
    "What's a relationship (family, friend, romantic) that has shaped you the most?",
    "How do you want to be remembered by others?",
    "What's a societal issue that you're passionate about and why?",
    "How do you find balance between online life and real life?",
    "What's a moment that made you reconsider your beliefs or perspectives?",
    "How do you think technology has impacted human connections?",
    "What's something you're grateful for, even during tough times?",
    "Do you believe in the concept of a soulmate?",
    "What's your favorite way to practice self-care?",
    "How do you cope with feelings of loneliness?",
    "What's a memory that still makes you emotional?",
    "How do you think your upbringing has influenced the way you view the world?",
    "What's a lesson you've learned from a past relationship?",
    "Do you think it's more important to follow your heart or your head?",
    "What's a quality you admire in others and wish to develop in yourself?",
    "How do you envision your life 10 years from now?",
    "What's the most beautiful place you've ever been to, and why was it memorable?",
    "How do you define love?",
    "What's the most challenging aspect of being your authentic self?",
    "What's a belief or value you hold that some might find unconventional?",
    "What's an activity that always brings you a sense of peace?",
    "How do you think societal norms influence the way we live and make decisions?",
    "What's a lesson you've learned from a failure or mistake?",
    "Do you think it's possible to have true work-life balance?",
    "What's a small act of kindness you'll never forget?",
    "How do you think your generation will impact the world?",
    "What's something you'd like to change about the world?",
    "What's the most important lesson you want to teach your future children?",
    "How do you stay true to your values in the face of peer pressure?",
    "What's a topic you could talk about for hours without getting bored?",
    "How do you think social media has altered the way we perceive ourselves?",
    "What's the most profound question you've ever been asked?",
    "What's a dream you've had that you'll never forget?",
    "How do you handle disagreements or conflicts in your relationships?",
    "What's a moment when you felt a strong connection with a stranger?",
    "How do you want to impact the lives of others?"
];

const easy = [
    "If you could only eat one food for the rest of your life, what would it be?",
    "What's the most unusual talent you have?",
    "If you were a superhero, what would your superpower be and what would you call yourself?",
    "What's the funniest movie you've ever seen?",
    "If you could switch lives with any fictional character, who would it be and why?",
    "What's your go-to karaoke song?",
    "If you could instantly master any skill, what would it be?",
    "What's the weirdest food combination you secretly enjoy?",
    "If you could time travel, would you go to the past or the future?",
    "What's the most hilarious YouTube video you've ever watched?",
    "If animals could talk, which one would be the funniest to converse with?",
    "What's the best joke you know?",
    "If you could have any animal as a pet, mythical creatures included, what would you choose?",
    "What's your most embarrassing childhood memory?",
    "If you could be a character in a video game, which game would you choose?",
    "What's the most ridiculous fashion trend you've ever tried?",
    "If you were stranded on a deserted island, what three items would you bring?",
    "What's your guilty pleasure TV show or movie?",
    "If your life was a sitcom, what would its title be?",
    "If you could instantly learn any language, which one would it be and why?",
    "What's the most unusual thing you've ever eaten?",
    "If you had to trade lives with someone for a day, who would it be?",
    "What's the silliest fear you have?",
    "If you could invent a new holiday, what would it celebrate?",
    "What's the most amusing YouTube channel you follow?",
    "If you were a character in a comedy movie, what role would you play?",
    "What's your go-to dance move when no one's watching?",
    "If you were to start a podcast, what would it be about?",
    "What's the most ridiculous rumor you've heard about yourself?",
    "If you were a meme, which one would you be?",
    "What's the funniest prank you've pulled off or been a victim of?",
    "If you could be a contestant on any game show, which one would you choose?",
    "What's the weirdest piece of advice you've ever received?",
    "If you had a time machine, what advice would you give your past self?",
    "What's the most bizarre dream you've ever had?",
    "If you were a character in a cartoon, which show would you belong to?",
    "What's the strangest app you have on your phone?",
    "If you could instantly become an expert in something, what would it be?",
    "What's the funniest Wi-Fi name you've ever come across?",
    "If you could have dinner with any historical figure, who would it be and what would you ask them?",
    "What's the quirkiest hobby you've ever tried?",
    "If you could have any animal sound as your laugh, which one would you choose?",
    "What's the most hilarious pickup line you've heard or used?",
    "If you could switch lives with a cartoon character for a day, who would it be?",
    "What's the silliest thing you've done while no one was watching?",
    "If you could be a contestant on any reality show, which one would it be?",
    "What's the most unusual item in your room right now?",
    "If your life had a theme song, what would it be?"
];

const mid = [
    "What's a moment that made you proud of yourself?",
    "If you could travel anywhere right now, where would you go and why?",
    "What's a childhood memory that never fails to make you smile?",
    "If you could have a superpower for a day, what would you do with it?",
    "What's something you've always wanted to learn but haven't had the chance to?",
    "What's a book that has had a significant impact on your life?",
    "If you could relive any year of your life, which one would it be and why?",
    "What's a small act of kindness you've experienced that you'll never forget?",
    "What's a goal you're currently working towards?",
    "If you had a free day with no responsibilities, how would you spend it?",
    "What's a lesson you learned from a difficult experience?",
    "If you could have a conversation with anyone, living or dead, who would it be?",
    "What's a place that holds special meaning for you?",
    "What's your favorite way to unwind and relax?",
    "If you could have dinner with any fictional character, who would it be and why?",
    "What's a quality you admire in others and wish to develop in yourself?",
    "What's something you've recently achieved that you're proud of?",
    "What's a song that always brings back memories for you?",
    "If you could give your younger self one piece of advice, what would it be?",
    "What's a hobby or interest you have that not many people know about?",
    "What's a moment when you felt truly connected to nature?",
    "What's something you've been curious about lately?",
    "If you could have a long conversation with a family member, who would it be and what would you discuss?",
    "What's the best piece of advice you've received from a friend?",
    "What's a fear you've overcome or are working to overcome?",
    "What's a movie that always makes you feel better no matter what?",
    "What's a trait you value most in a friend?",
    "If you could donate a million dollars to any cause, which one would you choose?",
    "What's a change you'd like to see in the world?",
    "What's a moment when you felt truly supported by someone?",
    "What's a lesson you've learned from a mistake you've made?",
    "What's a quote that resonates with you deeply?",
    "What's a place you've never been to but would love to visit?",
    "What's an accomplishment that might seem small to others but is a big deal to you?",
    "If you could spend a day in someone else's shoes, who would it be and why?",
    "What's a challenge you're currently facing?",
    "What's something that always brings a smile to your face?",
    "If you could time travel to any era, where would you go and what would you do?",
    "What's a dream you've had that you've never shared with anyone?",
    "What's a moment when you felt completely understood by someone?",
    "What's something you're thankful for in your life right now?",
    "If you could ask your future self one question, what would it be?",
    "What's a creative project or idea you've been excited about?",
    "What's a decision you made that turned out better than you expected?",
    "What's something you'd like to achieve in the next year?",
    "What's a tradition or ritual that's important to you?",
    "If you could have a heart-to-heart conversation with your pet, what would you say?"
];
var count = 0;

document.addEventListener("click", (event)=>{
    const chosen = event.target.closest('.card')
    if(chosen.classList.contains("card")){

        //if deck, display
        if(chosen.classList.contains("deck")){
            //if already a display, history it
            var cur = document.querySelector(".display");
            if(cur){
                cur.classList.remove("display");
                cur.classList.add("history");
                cur.querySelector('.front').textContent="history";
            }
            chosen.classList.remove("deck");
            chosen.classList.add("display");
        }
        //if display, history
        else if(chosen.classList.contains("display")){
            chosen.classList.remove("display");
            chosen.classList.add("history");
            chosen.querySelector('.front').textContent="history";
        }
        //if history, display
        // else if(chosen.classList.contains("history")){
        //     var recent = document.getElementById(count);
        //     recent.classList.remove("history");
        //     recent.classList.add("display");
        // }
    }
})


shuffle(easy);
for (question of easy) {
    body.innerHTML += 
`<div class="t1 card deck">
    <div class="front">who</div>
    <div class="back">
        <h2>${question}</h2>
    </div>
</div>`
}

shuffle(mid);
for (question of mid) {
    body.innerHTML += 
`<div class="t2 card deck">
    <div class="front">meaningful</div>
    <div class="back">
        <h2>${question}</h2>
    </div>
</div>`
}

shuffle(hard);
for (question of hard) {
    body.innerHTML += 
`<div class="t3 card deck">
    <div class="front">super deep</div>
    <div class="back">
        <h2>${question}</h2>
    </div>
</div>`
}

//fisher-yates shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
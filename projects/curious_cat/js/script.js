const body = document.querySelector("body");

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
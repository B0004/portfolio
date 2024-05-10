var bw = false;
const pokemonName = document.getElementById('name');
const pokemonImg = document.getElementById('pokemon-img');
const submit = document.getElementById('submit');
const skip = document.getElementById('skip');

var currentDexNum = 0;
var currentName = '';
const buttons = document.querySelectorAll('.type-button');
let chosenButtons = [];
function getImgLink(x){
    if (bw){
        return `https://img.pokemondb.net/sprites/black-white/anim/normal/${currentName.toLowerCase()}.gif`;
    }
    else{
        return `https://img.pokemondb.net/artwork/${currentName.toLowerCase()}.jpg`;
    }
}

function newMon() {
    //Genesect is 649
    currentDexNum = Math.floor((Math.random() * 649)+1);
    currentName = pokedex[currentDexNum-1].name;
    pokemonName.innerText = currentName
    pokemonImg.src = getImgLink(currentName);
}

//add event listner to buttons
buttons.forEach(button => {
    button.addEventListener('click', function () {
        if (!this.classList.contains('chosen')) {
            if (chosenButtons.length < 2) {
                this.classList.add('chosen');
                chosenButtons.push(this);
            }
        } else {
            //already chosen, removes it
            this.classList.remove('chosen');
            chosenButtons = chosenButtons.filter(btn => btn !== this);
        }
        // Log current chosen buttons
    });
});


function haveSameTypes(types1, types2) {
    // Sort both arrays and convert to string for easy comparison
    const sortedTypes1 = types1.sort();
    const sortedTypes2 = types2.sort();

    return sortedTypes1.toString() === sortedTypes2.toString();
}

function resetButtons() {
    chosenButtons.forEach(button => {
        button.classList.remove('chosen');
    });
    chosenButtons = [];  // Clear the array of chosen buttons
}

submit.addEventListener('click', function () {
    
    //checks for correctness
    let a = (chosenButtons.map(btn => btn.value));
    let b = (pokedex[currentDexNum-1].types);
    if (haveSameTypes(a, b)){
        console.log('newmon');
        newMon();
    }

    //resets buttons
    resetButtons();
});

skip.addEventListener('click', function () {
    newMon();
    resetButtons();
});

newMon();



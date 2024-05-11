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
    //if more than 1 generation chosen
    currentDexNum = Math.floor((Math.random() * 151)+1);
    currentName = pokedex[currentDexNum-1].name;
    pokemonName.innerText = currentName
    pokemonImg.src = getImgLink(currentName);
}

//remove types
function removeBtnDisplay(button){
    button.classList.remove('chosen');
    chosenButtons = chosenButtons.filter(btn => btn !== button);
    document.getElementsByClassName(`${button.value}`)[0].classList.toggle('disappear');
}
//add event listner to buttons
buttons.forEach(button => {
    button.addEventListener('click', function () {
        //unchosen button
        if (!this.classList.contains('chosen')) {
            //if <2, valid choice, add to it
            if (chosenButtons.length < 2) {
                this.classList.add('chosen');
                chosenButtons.push(this);

                //add button to the row
                document.getElementsByClassName(`disappear ${this.value}`)[0].classList.toggle('disappear');
            }
            //if =>2, invalid, nothing happens
        } else {
            //already chosen, removes it
            removeBtnDisplay(this);
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
        removeBtnDisplay(button)
        button.classList.remove('chosen');
    });

    chosenButtons = [];  // Clear the array of chosen buttons
}

submit.addEventListener('click', function () {
    //checks for correctness
    let a = (chosenButtons.map(btn => btn.value));
    let b = (pokedex[currentDexNum-1].types);

    if (haveSameTypes(a, b)){
        newMon();
    }

    //resets buttons
    resetButtons();
});

skip.addEventListener('click', function () {
    resetButtons();
    let correctTypes = pokedex[currentDexNum-1].types;

    document.getElementById('')
    document.getElementById('')

    for (let type of correctTypes){
        document.getElementById(type).click();

    }
    //newMon();
});

newMon();


var modal = document.getElementById('popup');
var btn = document.getElementById('openBtn');
var closeBtn = document.querySelector('.close');
var form = modal.querySelector('form');

btn.addEventListener('click', function() {
  modal.showModal();
});

closeBtn.addEventListener('click', function() {
  modal.close();
});

// Close the dialog if clicking outside of it
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.close();
  }
});

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the form from submitting in the traditional way

  // Log the value of the selected radio button
  var chosenOption = form.querySelector('input[name="choice"]:checked');
  console.log("chosen option: ", chosenOption.value);
  bw = (chosenOption.value === "true");
  
  pokemonImg.src = getImgLink(currentName);


  // Log the values of the checked checkboxes
  var interests = [];
  var checkedBoxes = form.querySelectorAll('input[name="interest"]:checked');
  checkedBoxes.forEach(function(box) {
    interests.push(box.value);
  });
  //console.log('Selected interests:', interests.length > 0 ? interests : 'None');

  modal.close(); // Close the dialog after logging the values
});

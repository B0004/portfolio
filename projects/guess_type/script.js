var bw = false;
var selectedGens = [1];

const pokemonName = document.getElementById('name');
const pokemonImg = document.getElementById('pokemon-img');
const submit = document.getElementById('submit');
const skip = document.getElementById('skip');
const settingsForm = document.getElementById('settings-form');

var currentDexNum = 0;
var currentName = '';
const buttons = document.querySelectorAll('.type-button');
let chosenButtons = [];
//localStorage.clear();
const storedSettings = localStorage.getItem('settingsData');

settingsForm.addEventListener('submit', function(event) {
    console.log('submitted');
  event.preventDefault();  // Prevent the form from submitting in the traditional way  
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="interest"]:checked');
  // Check at least one checkbox is chosen
  if (checkboxes.length === 0) {
    alert("Please select at least one generation.");
    return false;
    }
    
    // Handle Image Styles
    var chosenOption = settingsForm.querySelector('input[name="choice"]:checked');
    bw = (chosenOption.value === "true");
    localStorage.setItem("bw", bw);
    
    pokemonImg.src = getImgLink(specialForms(currentName));

    
  // Handle Genereations
  var interests = [];
  checkboxes.forEach(function(box) {
      interests.push(box.value);  
    });  
    selectedGens = interests;

    //local storate
    let formData = {
        choice: bw,
        interests: interests
    };
    localStorage.setItem('settingsData', JSON.stringify(formData));


  modal.close(); // Close the dialog after logging the values
});  



if (storedSettings) {
    console.log('yes');
    const settingsData = JSON.parse(storedSettings);

    // Set the radio button
    if (settingsData.choice) {
        document.querySelector(`input[name="choice"][value="${settingsData.choice}"]`).checked = true;
    }

    // Check the appropriate checkboxes
    if (settingsData.interests.length > 0) {
        settingsData.interests.forEach(function(value) {
            document.querySelector(`input[name="interest"][value="${value}"]`).checked = true;
        });
    }
    settingsForm.submit();
}


function getImgLink(name){
    console.log(name);
    if (bw){
        return `https://img.pokemondb.net/sprites/black-white/anim/normal/${name.toLowerCase()}.gif`;
    }
    else{

        return `https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`;
    }
}

const dexRatio = {
    1: 151,
    2: 100,
    3: 135,
    4: 107,
    5: 156
};

const genInterval = [
    [1, 151],
    [152, 251],
    [252, 386],
    [387, 493],
    [494, 649]
]
function getGenFromChosen(interestList){
    var sum = 0;
    console.log(interestList);
    
    for (let gen of interestList){
        console.log(gen);
        sum += dexRatio[gen];
    }
    //generate number from 1 to sum
    var rng  = Math.floor((Math.random() * sum)+1);
    console.log('interestList: ', interestList);
    
    var genSum = dexRatio[interestList[0]];
    console.log(rng, sum, genSum);

    for (let gen of interestList){
        // try a gen
        //next gen
        if (rng > genSum){
            genSum += dexRatio[gen];
        }
        else {
            return gen;
        }
    }
    console.log('went wrong');
    return interestList[0];
}    


function getRNGFromInterest(interstGen){
    let gen = getGenFromChosen(interstGen);
    let min = genInterval[gen-1][0];
    let max = genInterval[gen-1][1];
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function formatName(name) {
    return name.replace('Farfetchâ€™d', 'Farfetchd')
}

function specialForms(name){
    if (name == 'Mr. Mime'){
        return 'Mr-Mime';
    }
    else if (name == 'Mime Jr.'){
        return 'mime-jr';
    }
    else{
        return name;
    }

}

const body = document.querySelector('body');
function newMon() {
    //Genesect is 649
    //if more than 1 generation chosen
    currentDexNum = getRNGFromInterest(selectedGens);
   // currentDexNum = 439;
    currentName = formatName(pokedex[currentDexNum-1].name);
    console.log('current name: ', currentName);
    pokemonName.innerText = currentName;
    pokemonImg.src = getImgLink(specialForms(currentName));

    body.classList.add('animate-background');
    body.addEventListener('animationend', () => {
        body.classList.remove('animate-background');
    });
    // Optionally remove the class after the animation completes to reset state

}

function removeBtnDisplay(button){
//remove types
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
    else{
        //wrong guess
        body.classList.add('wrong-background');
        body.addEventListener('animationend', () => {
            body.classList.remove('wrong-background');
        });
    }

    //resets buttons
    resetButtons();
});    

skip.addEventListener('click', function () {
    resetButtons();
    let correctTypes = pokedex[currentDexNum-1].types;

    

    for (let type of correctTypes){
        document.getElementById(type).click();

    }    
    //newMon();
    body.classList.add('red-background');
    body.addEventListener('animationend', () => {
        body.classList.remove('red-background');
    });
});    

newMon();


var modal = document.getElementById('popup');
var btn = document.getElementById('openBtn');
var closeBtn = document.querySelector('.close');

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

//get from local storage



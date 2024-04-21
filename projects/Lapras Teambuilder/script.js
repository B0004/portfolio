function getImgLink(type, str){
    if (type === "item"){
        return "https://www.serebii.net/itemdex/sprites/" + str.replace(/ /g, '').toLowerCase() + ".png";
    }


}

function formatEVs(ev){
    let str = '';
    if (ev){
        for (stat in ev){
            if (stat == 'hp'){
                str = str + ev.hp + ' HP / '
            }
            else if (stat == 'at'){
                str = str + ev.at + ' Atk / '
            }
            else if (stat == 'df'){
                str = str + ev.df + ' Def / '
            }
            else if (stat == 'sa'){
                str = str + ev.sa + ' SpA / '
            }
            else if (stat == 'sd'){
                str = str + ev.sd + ' SpD / '
            }
            else if (stat == 'sp'){
                str = str + ev.sp + ' Spe / '
            }
        }
        return (str.slice(0,-3));
    }
    else{
        return '';
    }
}


function multiplyValues(obj1, obj2) {
    let result = {};
    for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
        result[key] = obj1[key] * obj2[key];
        }
    }
    return result;
}
  
function lookUpWeakness(pokemon){
    console.log('pokemon: ' + pokemon);
    console.log('pokedex: ' + pokedex);
    console.log('pokedex[]: ' + pokedex[pokemon]);
    var pokemonTypes = pokedex[pokemon].types;
    if (pokemonTypes.length == 1){
        let type = pokemonTypes[0].toLowerCase();
        return weaknessChart[type];
    }
    else if (pokemonTypes.length == 2){
        let type1 = pokemonTypes[0].toLowerCase();
        let type2 = pokemonTypes[1].toLowerCase();
        return multiplyValues(weaknessChart[type1], weaknessChart[type2]);
    }
}

function createCard(name, title, item, ability, nature, evs, ivs, teraType, move1, move2, move3, move4){
    if (!teraType){
        teraType = '';
    }
    let card = document.createElement("OL");
    card.classList.add('card')
    //create cards
    let cardContent =
        `<li class="title">${title}</li>
        <hr>
        <li class="item top"><span class="field-title">Item: </span><img src="${getImgLink("item", item)}" alt="item picture"><span>${item}</span></li>
        <li class="ability top"><span class="field-title">Ability: </span>${ability}</li>
        <li class="nature top"><span class="field-title">Nature: </span>${nature}</li>
        <li class="ev top"><span class="field-title">EVs: </span><small class="evs">${evs}</small></li>
        <li class="tera top"><span class="field-title">Tera Type: </span> <img src="https://play.pokemonshowdown.com/sprites/types/${teraType}.png" alt="${teraType}"></li>
        <li class="move"><img src="https://play.pokemonshowdown.com/sprites/types/${moveDex[move1].type}.png" alt="move icon"> <span>${move1}</span></li>
        <li class="move-detail"><img src="https://play.pokemonshowdown.com/sprites/categories/${moveDex[move1].category}.png" alt="type icon"><span><small>Power</small><small>${moveDex[move1].power || '-'}</small></span><span><small>Accuracy</small><small>${moveDex[move1].accuracy}</small></span></li>
        <li class="move"><img src="https://play.pokemonshowdown.com/sprites/types/${moveDex[move2].type}.png" alt="move icon"> <span>${move2}</span></li>
        <li class="move-detail"><img src="https://play.pokemonshowdown.com/sprites/categories/${moveDex[move2].category}.png" alt="type icon"><span><small>Power</small><small>${moveDex[move2].power || '-'}</small></span><span><small>Accuracy</small><small>${moveDex[move2].accuracy}</small></span></li>
        <li class="move"><img src="https://play.pokemonshowdown.com/sprites/types/${moveDex[move3].type}.png" alt="move icon"> <span>${move3}</span></li>
        <li class="move-detail"><img src="https://play.pokemonshowdown.com/sprites/categories/${moveDex[move3].category}.png" alt="type icon"><span><small>Power</small><small>${moveDex[move3].power || '-'}</small></span><span><small>Accuracy</small><small>${moveDex[move3].accuracy}</small></span></li>
        <li class="move"><img src="https://play.pokemonshowdown.com/sprites/types/${moveDex[move4].type}.png" alt="move icon"> <span>${move4}</span></li>
        <li class="move-detail"><img src="https://play.pokemonshowdown.com/sprites/categories/${moveDex[move4].category}.png" alt="type icon"><span><small>Power</small><small>${moveDex[move4].power || '-'}</small></span><span><small>Accuracy</small><small>${moveDex[move4].accuracy}</small></span></li>`
    card.innerHTML=cardContent;

    //create data
    let strExport = 
        `${name} @ ${item}
        Ability: ${ability}
        Tera Type: ${teraType}
        EVs: ${evs}
        IVs: ${ivs}
        ${nature} Nature
        - ${move1}
        - ${move2}
        - ${move3}
        - ${move4}`;
    //add data
    card.dataset.export = strExport;
    return card;
}

function updateTypeTable(teamList){
    typeAside.style.display = "block";

    var weaknessCount = {
        "normal": 0,
        "fire": 0,
        "water": 0,
        "electric": 0,
        "grass": 0,
        "ice": 0,
        "fighting": 0,
        "poison": 0,
        "ground": 0,
        "flying": 0,
        "psychic": 0,
        "bug": 0,
        "rock": 0,
        "ghost": 0,
        "dragon": 0,
        "dark": 0,
        "steel": 0,
        "fairy": 0
      }
      var resistCount = {
        "normal": 0,
        "fire": 0,
        "water": 0,
        "electric": 0,
        "grass": 0,
        "ice": 0,
        "fighting": 0,
        "poison": 0,
        "ground": 0,
        "flying": 0,
        "psychic": 0,
        "bug": 0,
        "rock": 0,
        "ghost": 0,
        "dragon": 0,
        "dark": 0,
        "steel": 0,
        "fairy": 0
      }
    
  // loop over pokemon
  for (let member of teamList){
    let weak = (lookUpWeakness(member));
    // loop over each type
    for (let i in weak){
      if (weak[i] < 1){
        resistCount[i]++;
      }
      else if (weak[i] > 1){
        weaknessCount[i]++;
      }
    }
  }

  const resistedTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(2) span');
    const weakToTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(3) span');

  var rkeys = Object.keys(resistCount);
  rkeys.forEach((type, i) => {
    resistedTypes[i].textContent = resistCount[type];
    resistedTypes[i].parentElement.style.backgroundColor = greenGradient[resistCount[type]];
  });
  
  var wkeys = Object.keys(weaknessCount);
  wkeys.forEach((type, i) => {
    weakToTypes[i].textContent = weaknessCount[type];
    weakToTypes[i].parentElement.style.backgroundColor = redGradient[weaknessCount[type]];
  });
  
}

// Function to be called when mutations are observed
function newPokemonChosen(pokemonName){

    cardPad.innerHTML = '';
    var setList = SETDEX_SV[pokemonName];
    if (setList === undefined) {
        poopMon();
    }
    else{
        for (setName in setList){
            let setObject = setList[setName];
            let setItem = setObject.item;
            let setAbility = setObject.ability;
            let setNature = setObject.nature;
            let setEVs = formatEVs(setObject.evs);
            let setIVs = formatEVs(setObject.ivs);
            let setTeraType = setObject.teraType;
            let setMove1 = setObject.moves[0];
            let setMove2 = setObject.moves[1];
            let setMove3 = setObject.moves[2];
            let setMove4 = setObject.moves[3];

            cardPad.appendChild(createCard(pokemonName, setName, setItem, setAbility, setNature, setEVs, setIVs, setTeraType, setMove1, setMove2, setMove3, setMove4));
        }
    }

    var pokemonElements = document.querySelectorAll('.pokemon');
    var pokemonArray = [];
    pokemonElements.forEach(element => {
        pokemonArray.push(element.textContent.toLowerCase().replace(/[\s-]/g, ''))
    });
    updateTypeTable(pokemonArray);
}

function landingPage(){
    cardPad.innerHTML = 
    `<div class="extension-landing">
        <h1>Lapras Team Builder</h1>
        <h2>Loaded!</h2>
        <a href="https://pokemondb.net/pokedex/lapras"><img src="https://img.pokemondb.net/sprites/black-white/anim/normal/lapras.gif" alt="Lapras"></a>
        <ol>
            <li><b>Proceed</b> to the teambuilder section</li>
            <li><b>Select</b> a pokemon to see its competitive sets</li>
            <li><b>Click</b> on a card to auto-fill!</li>
        </ol>
    </div>`

    typeAside.innerHTML = typeTableTemplate;
    typeAside.style.display = "none";
}

function poopMon(){
    cardPad.innerHTML = 
    `<div class="extension-landing">
        <h1>No Competitive Sets Were Found</h1>
        <h2>Sorry!</h2>
        <a href="https://pokemondb.net/pokedex/magikarp"><img src="https://img.pokemondb.net/sprites/black-white/anim/normal/magikarp.gif" alt="Magikarp"></a>
        <h2>This might be because</h2>
        <ol>
            <li>This pokemon was newly introduced and our data isn't updated yet</li>
            <li>This pokemon is not competively relavent</li>
        </ol>
    </div>`
}



// Starting function
var currentPokemon = "";
const outerPad = document.querySelector("#room-rooms");

const innerPad = document.createElement('div');
const cardPad = document.createElement("div");
const typeAside = document.createElement("aside");

cardPad.setAttribute('id', 'card-pad');
innerPad.setAttribute('id', 'inner-pad');
typeAside.setAttribute('id', 'type-weakness-tab');
typeAside.innerHTML = typeTableTemplate;

const greenGradient = ['#FFFFFF', '#E6F9E6', '#CCF3CC', '#B3EDB3', '#99E699', '#80E080', '#00CC00'];
const redGradient = ['#FFFFFF', '#FFE6E6', '#FFCCCC', '#FFB3B3', '#FF9999', '#FF8080', '#FF0000'];

outerPad.innerHTML = '';
innerPad.appendChild(cardPad);
innerPad.appendChild(typeAside);
outerPad.appendChild(innerPad);

landingPage();
const callback = function(mutationsList, observer) {
    if (mutationsList.some(mutation => mutation.target.id === 'card-pad' && mutation.type === 'childList')) {
        console.log('Ignored mutation in card-pad');
        return; // Do nothing if card-pad is the source of mutations
    }
    const pokemonNameInputBox = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input");
    if ((pokemonNameInputBox != null) && (document.querySelector('a.roomtab[href="/teambuilder"]').classList.contains('cur'))){
        if (currentPokemon != pokemonNameInputBox.value){
            currentPokemon = pokemonNameInputBox.value;
            console.log('update sets');
            newPokemonChosen(currentPokemon);
        }
        else{
            console.log('chosen pokemon did not change');
            if (!(document.querySelector('a.roomtab[href="/teambuilder"]').classList.contains('cur'))) {
                //moved away from tab
                landingPage();
                currentPokemon = '';
                console.log('moved away from tab');
            } 
        }
    }
    else{
        landingPage();
        currentPokemon = '';
        console.log('none chosen');
    }
};

// Create a MutationObserver instance and pass the callback function
const observer = new MutationObserver(callback);
// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };
// Select the element to observe
const targetNode = document.body; // or any other element you want to observe
// Start observing the target element with the configured options
observer.observe(targetNode, config);

cardPad.addEventListener("click", (event) => {
    let clickedCard = event.target.closest('.card');
    
    if(clickedCard){
        document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setmenu > button:nth-child(2)").click();
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > textarea").value = clickedCard.dataset.export;
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > div.pokemonedit-buttons > button:nth-child(2)").click();
    }
})


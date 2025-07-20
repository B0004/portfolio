

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

//typestrngths is the original table of multipliers, multiplers is like [fire, 0]
// function applyMultipliers(typeStrengths, multipliers) {
//     multipliers.forEach(([type, multiplier]) => {
//         if (typeStrengths[type] !== undefined) {
//             typeStrengths[type] *= multiplier;
//         }
//     });
//     return typeStrengths;
// }
function applyMultipliers(typeStrengths, multipliers) {
    // Create a shallow copy of typeStrengths to avoid modifying the original table
    const modifiedTypeStrengths = { ...typeStrengths };

    // Apply multipliers to the copied object
    multipliers.forEach(([type, multiplier]) => {
        if (modifiedTypeStrengths[type] !== undefined) {
            modifiedTypeStrengths[type] *= multiplier;
        }
    });

    // Return the modified copy
    return modifiedTypeStrengths;
}
function checkAbilityWeakness(ability){
    if (ability){
        var normalized = ability.toLowerCase().replace(/\s+/g, '');
        if (normalized in abilityModifierTable) {
            return abilityModifierTable[normalized];
        }
    }
}

function getPokemonAbilityBySlot(x) {
    if (!x){
        return;
    }
    const team = allTeams[currentTeam].teamMembers;  // Use currentTeam to find the correct team
    // If the team is found, search for the Pokémon by slot
    if (team) {
        const pokemon = team[x];

        // If the Pokémon is found, return its ability
        if (pokemon) {
            return pokemon.ability;
        } else {
            return null;  // Return null if the Pokémon is not found
        }
    } else {
        return null;  // Return null if the team is not found
    }
}
  
function lookUpWeakness(x){

    var pokemonTypes = pokedex[allTeams[currentTeam].teamMembers[x].pokemonName].types;
    var multiplyer = checkAbilityWeakness(getPokemonAbilityBySlot(x));

    if (multiplyer){ 
            if (pokemonTypes.length == 1){
            let type = pokemonTypes[0].toLowerCase();
            return applyMultipliers(weaknessChart[type], multiplyer);
        }
        else if (pokemonTypes.length == 2){
            let type1 = pokemonTypes[0].toLowerCase();
            let type2 = pokemonTypes[1].toLowerCase();
            return applyMultipliers(multiplyValues(weaknessChart[type1], weaknessChart[type2]), multiplyer);
        }
    }
    else{
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
}

function createCard(name, title, item, ability, nature, evs, ivs, teraType, move1, move2, move3, move4){
    if (!teraType){
        teraType = 'None';
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
        ${teraType !== 'None' ? `<li class="tera top"><span class="field-title">Tera Type: </span>
            <img src="https://play.pokemonshowdown.com/sprites/types/${teraType}.png" alt="${teraType}">
        </li>` : `<li class="tera top"><span class="field-title">Tera Type: </span> </li>`}  
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

function updateTypeTable(){

    //instead of of this, we're gonna
        if (!lookUpCurrentTeam()) {
            typeAside.style.display = "none";
            return;
        }

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
    
      // new loop

    var team = allTeams[currentTeam]?.teamMembers;

    if (!team || team.length === 0) {
        console.log('return here');
        return; // If team is null, undefined, or empty, return early
    }

    for (const curMember of team) {

        if (!curMember || !curMember.pokemonName){
                    console.log('return here');
                    console.log(team);

            continue;
        }
        else{
            var curName = curMember.pokemonName;
        }
        if (curName){
    
            var pokemonTypes = pokedex[curName].types;
            var multiplyer = checkAbilityWeakness(curMember.ability);
    
            let weak;
    
            if (multiplyer){ 
                if (pokemonTypes.length == 1){
                let type = pokemonTypes[0].toLowerCase();
                weak = applyMultipliers(weaknessChart[type], multiplyer);
                }
                else if (pokemonTypes.length == 2){
                    let type1 = pokemonTypes[0].toLowerCase();
                    let type2 = pokemonTypes[1].toLowerCase();
                    weak = applyMultipliers(multiplyValues(weaknessChart[type1], weaknessChart[type2]), multiplyer);
                }
            }
            else{
                if (pokemonTypes.length == 1){
                    let type = pokemonTypes[0].toLowerCase();
                    weak = weaknessChart[type];
                }
                else if (pokemonTypes.length == 2){
                    let type1 = pokemonTypes[0].toLowerCase();
                    let type2 = pokemonTypes[1].toLowerCase();
                    weak = multiplyValues(weaknessChart[type1], weaknessChart[type2]);
                }
            }
            for (let i in weak){
                if (weak[i] < 1){
                resistCount[i]++;
                }
                else if (weak[i] > 1){
                weaknessCount[i]++;
                }
            }
        }
        else {
                    console.log('return here');

            console.log(curMember, curName);
        }

    }



    const resistedTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(2) span');
    const weakToTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(3) span');

    isDarkMode = document.documentElement.classList.contains('dark');
    green = isDarkMode ? darkGreenGradient : greenGradient;
    red = isDarkMode ? darkRedGradient : redGradient;

    var rkeys = Object.keys(resistCount);
    rkeys.forEach((type, i) => {
        resistedTypes[i].textContent = resistCount[type];
        resistedTypes[i].parentElement.style.backgroundColor = green[resistCount[type]];
    });
    
    var wkeys = Object.keys(weaknessCount);
    wkeys.forEach((type, i) => {
        weakToTypes[i].textContent = weaknessCount[type];
        weakToTypes[i].parentElement.style.backgroundColor = red[weaknessCount[type]];
    });
  
}

// Function to be called when mutations are observed
function newPokemonChosen(pokemonName){

    cardPad.innerHTML = '';
    var setList = SETDEX_SV[pokemonName];
    if (setList === undefined) {
        if (pokemonName){
            poopMon();
        }
        else{
            landingPage();
        }
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
        if (currentTeam){
        updateTeams();
    }


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
    updateTypeTable();
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
var currentTeam = "";

const innerPad = document.createElement('div');
const cardPad = document.createElement("div");
const typeAside = document.createElement("aside");

cardPad.setAttribute('id', 'card-pad');
innerPad.setAttribute('id', 'inner-pad');
typeAside.setAttribute('id', 'type-weakness-tab');
typeAside.innerHTML = typeTableTemplate;

const greenGradient = ['#FFFFFF', '#E6F9E6', '#CCF3CC', '#B3EDB3', '#99E699', '#80E080', '#00CC00'];
const redGradient = ['#FFFFFF', '#FFE6E6', '#FFCCCC', '#FFB3B3', '#FF9999', '#FF8080', '#FF0000'];
const darkGreenGradient = ['#1A1A1A', '#4D6B4D', '#3B8F3B', '#2E6F2E', '#228922', '#1A7B1A', '#006600'];
const darkRedGradient = ['#1A1A1A', '#6B4D4D', '#8F3B3B', '#6F2E2E', '#922222', '#7B1A1A', '#660000'];

var isDarkMode = document.documentElement.classList.contains('dark');
var green = isDarkMode ? darkGreenGradient : greenGradient;
var red = isDarkMode ? darkRedGradient : redGradient;

var allTeams = [];
var strAllTeams = "";

outerPad.innerHTML = '';
innerPad.appendChild(cardPad);
innerPad.appendChild(typeAside);
outerPad.appendChild(innerPad);

function processTeamsWithNames(teamsArray) {
    return teamsArray.reduce((acc, teamString) => {
        // Split the team string by "]" character
        const parts = teamString.split(']');

        // Extract the team format (the first part of the array)
        const teamFormat = parts[0];

        // Process the remaining parts (team data) by splitting each Pokémon's details by "|"
        let nameOfTeam = ''; 
        const teamMembers = parts.slice(1).map((team, index) => {
            const pokemonDetails = team.split('|').map(pokemonDetail => pokemonDetail.trim());

            if (index === 0) {
                // Extract the team name from the first Pokémon (pokemonDetails[0])
                nameOfTeam = pokemonDetails[0]; // This is the team name for the first Pokémon
                pokemonDetails.shift(); // Remove the team name from the first Pokémon's details
            }
            if (pokemonDetails.length < 12){
                return null;
            }

            // Map the separated Pokémon details to the appropriate fields (12 fields)
            const teamMember = {
                nickname: pokemonDetails[0] || '',
                pokemonName: pokemonDetails[1].toLowerCase().replace(/[\s-]/g, '') || pokemonDetails[0].toLowerCase().replace(/[\s-]/g, '' || ''),
                item: pokemonDetails[2] || '',
                ability: pokemonDetails[3] || '',
                moveset: pokemonDetails[4] || '',
                nature: pokemonDetails[5] || '',
                evSpread: pokemonDetails[6] || '',
                gender: pokemonDetails[7] || '',
                ivSpread: pokemonDetails[8] || '', // IV spread
                shiny: pokemonDetails[9] || '',
                level: pokemonDetails[10] || '',
                teraType: pokemonDetails[11] || ''
            };

            return teamMember;
        });

        // Set the team name correctly from the first Pokémon and add the team to the accumulator
        acc[nameOfTeam || ''] = {
            teamFormat: teamFormat,
            teamMembers: teamMembers
        };

        return acc;
    }, {}); // Initialize the accumulator as an empty object
}




function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
// Function to retrieve and update team data
function updateTeams() {
    // Get the showdown_teams from localStorage
    const showdown_teams = localStorage.getItem('showdown_teams');
    // Check if showdown_teams exists in localStorage
    if (!showdown_teams) {
        return;
    }
    else if (showdown_teams === strAllTeams){
        return;
    }
    else {
        strAllTeams = showdown_teams;
        // Split the showdown_teams string into individual team lines
        const teamsArray = strAllTeams.split('\n');
        allTeams = processTeamsWithNames(teamsArray);
    
        if (lookUpCurrentTeam()){
            updateTypeTable();
        }
    }

}


function lookUpCurrentTeam(){
    if (document.querySelector('button[name="back"]')){
        return currentTeam;
    }
    else {
        return null;
    }
}



landingPage();
const callback = function(mutationsList, observer) {
    //something happened here
    
    //check if any changes have been made to the current team


    //check if new team
    var teamNameVariable = document.querySelector("#room-teambuilder > div > div > input");
    if (teamNameVariable){
        currentTeam = teamNameVariable.value
    }

    updateTeams();

    if (mutationsList.some(mutation => mutation.target.id === 'card-pad' && mutation.type === 'childList')) {
        return; // Do nothing if card-pad is the source of mutations
    }
    
    if (mutationsList.some(mutation => mutation.target.id === 'typeAside' && mutation.type === 'childList')) {
        return; // Do nothing if card-pad is the source of mutations
    }    

    
    const pokemonNameInputBox = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input");


    if ((pokemonNameInputBox != null) && (document.querySelector('a.roomtab[href="/teambuilder"]').classList.contains('cur'))){
        if (currentPokemon != pokemonNameInputBox.value){
            currentPokemon = pokemonNameInputBox.value;
            newPokemonChosen(currentPokemon);
        }
        else{
            if (!(document.querySelector('a.roomtab[href="/teambuilder"]').classList.contains('cur'))) {
                //moved away from tab
                landingPage();
                currentPokemon = '';
            } 
        }
    }
    else{
        landingPage();
        currentPokemon = '';
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
    
    if(clickedCard){ //paste in the info

        document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setmenu > button:nth-child(2)").click();
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > textarea").value = clickedCard.dataset.export;
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > div.pokemonedit-buttons > button:nth-child(2)").click();
        //again
        document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setmenu > button:nth-child(2)").click();
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > textarea").value = clickedCard.dataset.export;
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > div.pokemonedit-buttons > button:nth-child(2)").click();
    }
})



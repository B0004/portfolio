





// Gather Variables--------------------------------------


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




// Function to be called when mutations are observed

function newPokemonChosen(pokemonName){
    innerPad.innerHTML = '';
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

            innerPad.appendChild(createCard(pokemonName, setName, setItem, setAbility, setNature, setEVs, setIVs, setTeraType, setMove1, setMove2, setMove3, setMove4));
        }
    }
}

function landingPage(){
    innerPad.innerHTML = 
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
}

function poopMon(){
    innerPad.innerHTML = 
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


// Function to be called when mutations are observed (works!!!)
var currentPokemon = "";
const outerPad = document.querySelector("#room-rooms");
const innerPad = document.createElement("div");
innerPad.setAttribute('id', 'inner-pad');

outerPad.innerHTML = '';
outerPad.appendChild(innerPad);

landingPage();
const callback = function(mutationsList, observer) {
    if (mutationsList.some(mutation => mutation.target.id === 'inner-pad' && mutation.type === 'childList')) {
        console.log('Ignored mutation in inner-pad');
        return; // Do nothing if inner-pad is the source of mutations
    }
    const pokemonNameInputBox = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input");
    if ((pokemonNameInputBox != null) && (document.querySelector('a.roomtab[href="/teambuilder"]').classList.contains('cur'))){
        console.log(pokemonNameInputBox.value);
        if (currentPokemon != pokemonNameInputBox.value){
            currentPokemon = pokemonNameInputBox.value;
            console.log('update sets');
            newPokemonChosen(currentPokemon);
        }
        else{
            console.log('chosen pokemon did not change');
            console.log(document.querySelector('a.roomtab[href="/teambuilder"]'));
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

innerPad.addEventListener("click", (event) => {
    let clickedCard = event.target.closest('.card');
    
    if(clickedCard){
        document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setmenu > button:nth-child(2)").click();
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > textarea").value = clickedCard.dataset.export;
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > div.pokemonedit-buttons > button:nth-child(2)").click();
    }
})


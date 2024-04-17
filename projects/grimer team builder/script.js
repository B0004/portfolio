





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
}






function createCard(title, item, ability, nature, evs, teraType, move1, move2, move3, move4){
    if (!teraType){
        teraType = '';
    }
    let card = document.createElement("OL");
    card.classList.add('card')
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
    return card;
}




// Function to be called when mutations are observed

function newPokemonChosen(pokemonName){
    var setList = SETDEX_SV[pokemonName];
    for (setName in setList){
        let setObject = setList[setName];
        let setItem = setObject.item;
        let setItemImgLink = getImgLink("item", setItem);
        let setAbility = setObject.ability;
        let setNature = setObject.nature;
        let setEVs = formatEVs(setObject.evs);
        let setTeraType = setObject.teraType;
        let setMove1 = setObject.moves[0];
        let setMove2 = setObject.moves[1];
        let setMove3 = setObject.moves[2];
        let setMove4 = setObject.moves[3];
   
   
        console.log(moveDex[setMove1].accuracy);
   
        console.log('---');
   
        pad.appendChild(createCard(setName, setItem, setAbility, setNature, setEVs, setTeraType, setMove1, setMove2, setMove3, setMove4));
    }
   
}


// Function to be called when mutations are observed (works!!!)
var currentPokemon = "";
const pad = document.querySelector("#room-rooms");

function newPokemonChosen(pokemonName){
    pad.textContent = '';
    var setList = SETDEX_SV[pokemonName];
    for (setName in setList){
        let setObject = setList[setName];
        let setItem = setObject.item;
        let setItemImgLink = getImgLink("item", setItem);
        let setAbility = setObject.ability;
        let setNature = setObject.nature;
        let setEVs = formatEVs(setObject.evs);
        let setTeraType = setObject.teraType;
        let setMove1 = setObject.moves[0];
        let setMove2 = setObject.moves[1];
        let setMove3 = setObject.moves[2];
        let setMove4 = setObject.moves[3];
   
   
        console.log(moveDex[setMove1].accuracy);
   
        console.log('---');
   
        pad.appendChild(createCard(setName, setItem, setAbility, setNature, setEVs, setTeraType, setMove1, setMove2, setMove3, setMove4));
    }
}

const callback = function(mutationsList, observer) {
    const pokemonNameInputBox = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input");
    if (pokemonNameInputBox != null){
        console.log(pokemonNameInputBox.value);
        if (currentPokemon != pokemonNameInputBox.value){
            currentPokemon = pokemonNameInputBox.value;
            console.log('update sets');
            newPokemonChosen(currentPokemon);
        }
        else{
            console.log('chosen pokemon did not change');
        }
    }
    else{
        pad.textContent = 'none chosen';
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


// Gather Variables--------------------------------------


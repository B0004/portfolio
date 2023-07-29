var pokemon_name = "no pokemon selected";
const room = document.querySelector("#room-teambuilder")

//get usage

//replace chatroom with table and make header
document.querySelector("#room-rooms > div").innerHTML = 
`
<div class="my-body" id="my-body">
    <div class="header" id="my-header">
    </div>
    <div class="table" id="card-table">
    </div>
    </div>
    `
    const table = document.getElementById("card-table");
    const my_header = document.getElementById("my-header");
    function get_set(){
        table.innerHTML = "";
        
        //if selected, fill table
        if (document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input")){
            fill_table();
            //get_header();
        }
    }
    
    //{"level":100,"ability":"Sturdy","item":"Choice Band","nature":"Adamant","evs":{"hp":4,"at":252,"df":252},"moves":["Avalanche","Body Press","Heavy Slam","Earthquake"]},
    
    function fill_table(){
        pokemon_name = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input").value;
        var set_col = dex[pokemon_name];
        
        //clear table, loop through each set in mon
        for (set in set_col){
            info = dex[pokemon_name][set];

            var export_template = "";
            if (info.teraType){
                export_template = 
                `
                ${pokemon_name} @ ${info.item}
                Ability: ${info.ability}
                Tera Type: ${info.teraType}
                EVs: ${evs_value}
                IVs: ${ivs_value}
                ${info.nature} Nature
                - ${info.moves[0]}
                - ${info.moves[1]}
                - ${info.moves[2]}
                - ${info.moves[3]}
                `;
            }
            else {
                export_template = 
                `
                ${pokemon_name} @ ${info.item}
                Ability: ${info.ability}
                EVs: ${evs_value}
                IVs: ${ivs_value}
                ${info.nature} Nature
                - ${info.moves[0]}
                - ${info.moves[1]}
                - ${info.moves[2]}
                - ${info.moves[3]}
                `;
            }

            //check for evs and ivs
            var evs_value = "0 HP / 0 Atk / 0 Def / 0 SpA / 0 SpD / 0 Spe";
            var ivs_value = "31 HP / 31 Atk / 31 Def / 31 SpA / 31 SpD / 31 Spe";
            if ("evs" in info){
                if ("hp" in info.evs){
                    evs_value = evs_value.replace("0 HP", info.evs.hp+" HP");
                }
                if ("at" in info.evs){
                    evs_value = evs_value.replace("0 Atk", info.evs.at+" Atk");
                }
                if ("df" in info.evs){
                    evs_value = evs_value.replace("0 Def", info.evs.df+" Def");
                }
                if ("sa" in info.evs){
                    evs_value = evs_value.replace("0 SpA", info.evs.sa+" SpA");
                }
                if ("sd" in info.evs){
                    evs_value = evs_value.replace("0 SpD", info.evs.sd+" SpD");
                }
                if ("sp" in info.evs){
                    evs_value = evs_value.replace("0 Spe", info.evs.sp+" Spe");
                }
            }
            
            if ("ivs" in info){
            if ("hp" in info.ivs){
                ivs_value = ivs_value.replace("0 HP", info.ivs.hp+" HP");
            }
            if ("at" in info.ivs){
                ivs_value = ivs_value.replace("0 Atk", info.ivs.at+" Atk");
            }
            if ("df" in info.ivs){
                ivs_value = ivs_value.replace("0 Def", info.ivs.df+" Def");
            }
            if ("sa" in info.ivs){
                ivs_value = ivs_value.replace("0 SpA", info.ivs.sa+" SpA");
            }
            if ("sd" in info.ivs){
                ivs_value = ivs_value.replace("0 SpD", info.ivs.sd+" SpD");
            }
            if ("sp" in info.ivs){
                ivs_value = ivs_value.replace("0 Spe", info.ivs.sp+" Spe");
            }
        }
        

        let tier = "tier-" + set.split(' ')[0].toLowerCase();

        let card_template = `
        <div class="card ${tier}">
            <div class="set-name">
                ${set}
            </div>
            <div class="set-container">
                <div class="top-half-container">
                    <div class="top-left-container">
                        <div class="top-left">item: ${info.item}</div>
                        <div class="top-left">ability: ${info.ability}</div>
                        <div class="top-left">nature: ${info.nature}</div>
                        <div class="top-left">tera type: ${info.teraType}</div>
                    </div>
                    <div class="top-right-container">
                        
                    </div>
                </div>
                <div class="moves-container">
                    <div class="move">${info.moves[0]}</div>
                    <div class="move">${info.moves[1]}</div>
                    <div class="move">${info.moves[2]}</div>
                    <div class="move">${info.moves[3]}</div>

                </div>
<p class = "export-container">
${export_template}
</p>
            </div>
        </div>
        `.replace('<div class="top-left">tera type: undefined</div>', '');

        table.innerHTML += card_template;
        console.log(export_template);
    };
}



function get_header(){
    //click the box to get the bar to show up
    document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input").click();
    
    const their_bar = document.querySelector("#room-teambuilder > div > div.teambuilder-results > ul > li:nth-child(2)");
    if (their_bar.innerHTML.includes("data-entry=\"pokemon")){
        my_header.innerHTML = their_bar.innerHTML;
        console.log(my_header);
    }
}

// if click on set, fill set
table.addEventListener("click", (event) => {
    const parent = event.target.closest('.set-container');
    if(parent){
        const to_export = parent.querySelector('.export-container').textContent;
        const import_button = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setmenu > button:nth-child(2)");
        import_button.click();
        const input_box = document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > textarea");
        input_box.value = to_export;
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > div.pokemonedit-buttons > button:nth-child(2)").click();
    }
})

const team_wrapper = document.querySelector("#room-teambuilder");

const mutationObserver = new MutationObserver(entries => {
    console.log(entries);
    //check for pokemon selection box, if can find box, fill table
    get_set();
})

mutationObserver.observe(team_wrapper, {childList: true, subtree: true})

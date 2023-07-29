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

            var mon_ev = {
                "hp": 0,
                "atk": 0,
                "def": 0,
                "spa": 0,
                "spd": 0,
                "spe": 0,
            };

            var mon_iv = {
                "hp": 31,
                "atk": 31,
                "def": 31,
                "spa": 31,
                "spd": 31,
                "spe": 31,
            };

            
            //check for evs and ivs
            var evs_value = "0 HP / 0 Atk / 0 Def / 0 SpA / 0 SpD / 0 Spe";
            var ivs_value = "31 HP / 31 Atk / 31 Def / 31 SpA / 31 SpD / 31 Spe";
            if ("evs" in info){
                if ("hp" in info.evs){
                    evs_value = evs_value.replace("0 HP", info.evs.hp+" HP");
                    mon_ev.hp = info.evs.hp;
                }
                if ("at" in info.evs){
                    evs_value = evs_value.replace("0 Atk", info.evs.at+" Atk");
                    mon_ev.atk = info.evs.at;
                }
                if ("df" in info.evs){
                    evs_value = evs_value.replace("0 Def", info.evs.df+" Def");
                    mon_ev.def = info.evs.df;
                }
                if ("sa" in info.evs){
                    evs_value = evs_value.replace("0 SpA", info.evs.sa+" SpA");
                    mon_ev.spa = info.evs.sa;
                }
                if ("sd" in info.evs){
                    evs_value = evs_value.replace("0 SpD", info.evs.sd+" SpD");
                    mon_ev.spd = info.evs.sd;
                }
                if ("sp" in info.evs){
                    evs_value = evs_value.replace("0 Spe", info.evs.sp+" Spe");
                    mon_ev.spe = info.evs.sp;
                }
            }
            
            if ("ivs" in info){
                if ("hp" in info.ivs){
                    ivs_value = ivs_value.replace("0 HP", info.ivs.hp+" HP");
                    mon_iv.hp = info.ivs.hp;
                }
                if ("at" in info.ivs){
                    ivs_value = ivs_value.replace("0 Atk", info.ivs.at+" Atk");
                    mon_iv.atk = info.ivs.at;
                }
                if ("df" in info.ivs){
                    ivs_value = ivs_value.replace("0 Def", info.ivs.df+" Def");
                    mon_iv.def = info.ivs.df;

                }
                if ("sa" in info.ivs){
                    ivs_value = ivs_value.replace("0 SpA", info.ivs.sa+" SpA");
                    mon_iv.spa = info.ivs.sa;
                }
                if ("sd" in info.ivs){
                    ivs_value = ivs_value.replace("0 SpD", info.ivs.sd+" SpD");
                    mon_iv.spd = info.ivs.sd;
                }
                if ("sp" in info.ivs){
                    ivs_value = ivs_value.replace("0 Spe", info.ivs.sp+" Spe");
                    mon_iv.spe = info.ivs.sp;
                }
            }
            //get stats
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

            var bs = pokedex[pokemon_name]["baseStats"];
            
            var calculatedStats = calculateStats(bs, mon_ev, mon_iv, 100, info.nature);
            console.log(calculatedStats);
            
            let tier = "tier-" + set.split(' ')[0].toLowerCase();
        
        let card_template = `
        <div class="${tier} card-container">
            <div class="field div1 set-name">
                ${set}
            </div>
            <div class="field div2 topb">
                <div class="build-name">item:</div>
                <div class="build">${info.item}</div>
            </div>
            <div class="field div3 topb">
                <div class="build-name">ability:</div>
                <div class="build">${info.ability}</div>
            </div>
            <div class="field div4 topb">
                <div class="build-name">nature</div>
                <div class="build">${info.nature}</div>
            </div>
            <div class="field div5 topb">
                <div class="build-name">tera type</div>
                <div class="build">${info.teraType}</div>
            </div>
            <div class="field div6 numbers">
                <div class="stat">
                    HP: ${mon_ev.hp}
                </div>
                <div class="stat">
                    Attack: ${mon_ev.atk}
                </div>
                <div class="stat">
                    Defense: ${mon_ev.def}
                </div>
                <div class="stat">
                    Sp.Atk: ${mon_ev.spa}
                </div>
                <div class="stat">
                    Sp.Def: ${mon_ev.spd}
                </div>
                <div class="stat">
                    Speed: ${mon_ev.spe}
                </div>
            </div>
            <div class="field div7">
                <div class="stat">
                    hp: ${calculatedStats.hp}
                </div>
                <div class="stat">
                    atk: ${calculatedStats.atk}
                </div>
                <div class="stat">
                    def: ${calculatedStats.def}
                </div>
                <div class="stat">
                    spa: ${calculatedStats.spa}
                </div>
                <div class="stat">
                spd: ${calculatedStats.spd}
                </div>
                <div class="stat">
                spe: ${calculatedStats.spe}
                </div>

            </div>
            <div class="field div8">
                ${info.moves[0]}
            </div>
            <div class="field div9">
                ${info.moves[1]}
            </div>
            <div class="field div10">
                ${info.moves[2]}
            </div>
            <div class="field div11">
                ${info.moves[3]}
            </div>
            <p class = "export-container">
                ${export_template}
            </p>
        </div>
        `.replace(`
            <div class="field div5 topb">
                <div class="build-name">tera type</div>
                <div class="build">undefined</div>
            </div>`, '');

        table.innerHTML += card_template;
    };
}



function get_header(){
    //click the box to get the bar to show up
    document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input").click();
    
    const their_bar = document.querySelector("#room-teambuilder > div > div.teambuilder-results > ul > li:nth-child(2)");
    if (their_bar.innerHTML.includes("data-entry=\"pokemon")){
        my_header.innerHTML = their_bar.innerHTML;
    }
}

// if click on set, fill set
table.addEventListener("click", (event) => {
    const parent = event.target.closest('.card-container');
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
    //check for pokemon selection box, if can find box, fill table
    get_set();
})

mutationObserver.observe(team_wrapper, {childList: true, subtree: true})

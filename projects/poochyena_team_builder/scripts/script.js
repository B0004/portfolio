var pokemon_name = "no pokemon selected";

const room = document.querySelector("#room-teambuilder");
const graph_labels = [
    'HP',
    'Attack',
    'Defense',
    'Speed',
    'Sp.Def',
    'Sp.Atk',
  ]
var usage_html = ""

var card_count = 0;

//replace chatroom with table and make header
document.querySelector("#room-rooms > div").innerHTML = 
`
<div class="my-body" id="my-body">

    <div class="scene" id="scene">
        <div class="table" id="card-table">
        </div>
    </div>

    <div class="my-header" id="my-header">   
                
        <div class="header-top">
            <div class="mon-name">
                ${pokemon_name}
            </div>
            <div class="usage">

            </div>
        </div>
        <div class="header-mid">

        </div>

        <div class="header-bot">
            <div class="set-list" id="set-list">
    
            </div>
        </div>
    </div>

    <div class="my-settings">
        <input type="checkbox" id="darkmode-toggle"/>
        <label for="darkmode-toggle">
    </div>

</div>
`
    var cur_mon = "";
    const table = document.getElementById("card-table");
    const my_header = document.getElementById("my-header");
    const set_list = document.getElementById("set-list");

    function clearBody(){
        table.innerHTML = "";
        set_list.innerHTML = "";
    }

    function get_set(){
        
        //if new mon selected, fill table
        if (document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input")){
            new_mon = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input").value;
            if (cur_mon != new_mon){
                fill_table();
                changeCarousel();
            }
        }
        else{
            cur_mon = "";
            clearBody();
            if (document.querySelector("#card-table")){
                document.querySelector("#card-table").innerHTML = ""
            }
            if (document.querySelector(".mon-name")){
                document.querySelector(".mon-name").innerHTML = "no pokemon selected"
            }
            if (document.querySelector(".usage")){
                document.querySelector(".usage").innerHTML = ""
            }

            card_count = 0;
        }
    }
    
    //{"level":100,"ability":"Sturdy","item":"Choice Band","nature":"Adamant","evs":{"hp":4,"at":252,"df":252},"moves":["Avalanche","Body Press","Heavy Slam","Earthquake"]},
    
    function fill_table(){

        card_count = 0;
        table.innerHTML = "";
        set_list.innerHTML = "";
        pokemon_name = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input").value;

        cur_mon = pokemon_name;
        document.querySelector(".usage").style.display = "block";
        if (ou_usage[pokemon_name]){
            usage_html = `OU usage rate: <span class=to-bold ou-stat>${ou_usage[pokemon_name][1]}%</span>, rank <span class=to-bold ou-stat>${ou_usage[pokemon_name][0]}`;
        }
        else if (uu_usage[pokemon_name]){
            usage_html = `UU usage rate: <span class=to-bold uu-stat>${uu_usage[pokemon_name][1]}%</span>, rank <span class=to-bold uu-stat>${uu_usage[pokemon_name][0]}`;
        }
        else if (ru_usage[pokemon_name]){
            usage_html = `RU usage rate: <span class=to-bold ru-stat>${ru_usage[pokemon_name][1]}%</span>, rank <span class=to-bold ru-stat>${ru_usage[pokemon_name][0]}`;
        }
        else{
            usage_html = "";
            document.querySelector(".usage").style.display = "none";
        }

        document.querySelector(".mon-name").textContent = pokemon_name;
        document.querySelector(".usage").innerHTML = usage_html;


        var set_col = dex[pokemon_name];

        var store_id = [];
        var store_config = [];
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

            var no_ev = {
                "hp": 0,
                "atk": 0,
                "def": 0,
                "spa": 0,
                "spd": 0,
                "spe": 0,
            };

            var max_iv = {
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
            var calculatedBase = calculateStats(bs, no_ev, max_iv, 100, "Docile");

            var radar_id = (pokemon_name + "-" + set).replaceAll(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').toLowerCase().replaceAll(' ','-');
            let tier = "tier-" + set.split(' ')[0].toLowerCase();

            // add set name to header
            set_list.innerHTML += `
            <div class="set-list-name ${tier}" id="set-${card_count}">
                ${set}
            </div>
            `;


            var check = ("teraType" in info);
        
        
            let card_template = `
            <div class="${tier} card" id="card-${card_count}">
                    <div class="set-name title field">
                        ${set}
                    </div>
                    <div class="item field">
                        <div class="subtitle">
                            Item: 
                        </div>
                        <div class="content">
                            ${info.item}
                        </div>
                    </div>
                    <div class="ability field">
                        <div class="subtitle">
                            Ability:
                        </div>
                        <div class="content">
                            ${info.ability}
                        </div>
                    </div>
                    <div class="tera field ${check}">
                        <div class="subtitle">
                            Tera Type:
                        </div>
                        <div class="content">
                            ${info.teraType}
                        </div>
                    </div>
                    <div class="nature field">
                        <div class="subtitle">
                            Nature:
                        </div>
                        <div class="content">
                            ${info.nature}
                        </div>
                    </div>
                    <div class="ev-col field">
                        <div class="subtitle ev-subtitle">
                            EVs:
                        </div>
                        <div class="content ev-content">
                            <div class="ev">HP: ${mon_ev.hp}</div>
                            <div class="ev">Attack: ${mon_ev.atk}</div>
                            <div class="ev">Defense: ${mon_ev.def}</div>
                            <div class="ev">Sp.Atk: ${mon_ev.spa}</div>
                            <div class="ev">Sp.Def: ${mon_ev.spd}</div>
                            <div class="ev">Speed: ${mon_ev.spe}</div>
                        </div>
                    </div>
                    <div class="radar field">
                        <canvas class="stat-radar" id="${radar_id}"></canvas>
                    </div>
                    <div class="move field move1">
                        <div class="subtitle">
        
                        </div>
                        <div class="content">
                            ${info.moves[0]}
                        </div>
                    </div>
                    <div class="move field move2">
                        <div class="subtitle">
        
                        </div>
                        <div class="content">
                            ${info.moves[1]}
                        </div>
                    </div>
                    <div class="move field move3">
                        <div class="subtitle">
        
                        </div>
                        <div class="content">
                            ${info.moves[2]}
                        </div>
                    </div>
                    <div class="move field move4">
                        <div class="subtitle">
        
                        </div>
                        <div class="content">
                            ${info.moves[3]}
                        </div>
                    </div>
                    <p class = "export-container">
                        ${export_template}
                    </p>
                </div>
            `

            table.innerHTML += card_template;

            // make chart
            let graph_base = [calculatedBase.hp, calculatedBase.atk, calculatedBase.def, calculatedBase.spe, calculatedBase.spd, calculatedBase.spa];

            let graph_build = [calculatedStats.hp, calculatedStats.atk, calculatedStats.def, calculatedStats.spe, calculatedStats.spd, calculatedStats.spa];

            let stat_data = {
                labels: graph_labels,
                datasets: [{
                label: 'Base Stats',
                data: graph_base,
                fill: true,
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                borderColor: 'rgb(255, 0, 0, 0.5)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                label: 'Set Stats',
                data: graph_build,
                fill: true,
                backgroundColor:'rgba(0, 0, 255, 0.3)',
                borderColor: 'rgb(0, 0, 255, 0.5)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                }]
              };
            

            let config = {
                type: 'radar',
                data: stat_data,
                options: {
                    layout: {
                        padding: 2
                    },
                    plugins:{
                        legend: {
                         display: true,
                        }
                       },
                    elements: {
                        line: {
                            borderWidth: 3
                        },
                        point:{
                            radius: 3,
                            pointHitRadius: 10,
                            hoverRadius: 7
                        }
                },
                scales: {
                    r: {
                        display: true,
                        angleLines: {
                            display: true
                        },
                        beginAtZero: true,
                        max: 400,
                        min: 0,
                        ticks: {
                            
                            stepSize: 100,
                            backdropColor: 'rgba(255, 255, 255, 0)', // Change the background color here for tick labels
                            beginAtZero: true
                        },
                        pointLabels:{
                            display: true
                        }
                    }
                }
                }
              };
              

            store_id.push(radar_id);
            store_config.push(config);
            card_count++;

        };
        // once every mon
        if (card_count < 3){
            table.innerHTML += `
            <div class="card false">
            </div>
            `
        }
        
        onOrientationChange();
        
        store_id.forEach((id, index) => {
            new Chart(document.getElementById(id), store_config[index]);
        });

        store_id.forEach((id, index) => {
            document.getElementById(id).style.width = "100%";
            document.getElementById(id).style.height = "100%";
        });

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
    const parent = event.target.closest('.card');
    if(parent){
        const to_export = parent.querySelector('.export-container').textContent;
        const import_button = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setmenu > button:nth-child(2)");
        import_button.click();
        const input_box = document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > textarea");
        input_box.value = to_export;
        document.querySelector("#room-teambuilder > div > div.teambuilder-pokemon-import > div.pokemonedit-buttons > button:nth-child(2)").click();
    }

})

my_header.addEventListener("click", (event) => {
    const p2 = event.target.closest('.set-list-name')
    if(p2){
        selectedIndex = parseInt(p2.id.replace('set-',''));
        rotateCarousel();
    }
})

document.getElementById("darkmode-toggle").addEventListener("click", function(){
    document.getElementById("my-body").classList.toggle("is-dark");
    console.log(document.getElementById("my-body").classList);
});


const team_wrapper = document.querySelector("#room-teambuilder");

const mutationObserver = new MutationObserver(entries => {
    //check for pokemon selection box, if can find box, fill table
    get_set();
})

mutationObserver.observe(team_wrapper, {childList: true, subtree: true})



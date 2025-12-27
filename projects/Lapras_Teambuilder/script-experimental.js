

function getImgLink(type, str){
    if (type === "item"){
        return "https://www.serebii.net/itemdex/sprites/" + str.replace(/ /g, '').toLowerCase() + ".png";
    }


}

function formatEVs(ev){
    if (!ev) return '';
    const statNames = { hp: 'HP', at: 'Atk', df: 'Def', sa: 'SpA', sd: 'SpD', sp: 'Spe' };
    return Object.entries(ev)
        .filter(([_, val]) => val > 0)
        .map(([stat, val]) => `${val} ${statNames[stat]}`)
        .join(' / ');
}

function getPokemonAbilityBySlot(x) {
    if (!x){
        return;
    }
    const team = allTeams[currentTeam]?.teamMembers;
    if (team) {
        const pokemon = team[x];
        if (pokemon) {
            return pokemon.ability;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

// Helper to compare two objects deeply
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Check if an ability modifies type weaknesses
function checkAbilityWeakness(ability) {
    if (!ability) return null;
    const abilityLower = ability.toLowerCase();
    return abilityModifierTable[abilityLower] ? Object.fromEntries(abilityModifierTable[abilityLower]) : null;
}

// Multiply two weakness objects together (for dual types)
function multiplyValues(obj1, obj2) {
    const result = {};
    for (const key in obj1) {
        result[key] = obj1[key] * obj2[key];
    }
    return result;
}

// Apply ability multipliers to weakness chart
function applyMultipliers(weakness, multiplier) {
    const result = { ...weakness };
    for (const [type, mult] of Object.entries(multiplier)) {
        result[type] = weakness[type] * mult;
    }
    return result;
}
  
function getTypeWeakness(types, abilityMultiplier = null){
    const normalizedTypes = types.map(t => t.toLowerCase());
    let weakness = normalizedTypes.length === 1 
        ? weaknessChart[normalizedTypes[0]]
        : multiplyValues(weaknessChart[normalizedTypes[0]], weaknessChart[normalizedTypes[1]]);
    return abilityMultiplier ? applyMultipliers(weakness, abilityMultiplier) : weakness;
}

function lookUpWeakness(x) {
    const pokemon = allTeams[currentTeam]?.teamMembers[x];
    if (!pokemon) return null; // safe guard
    const types = pokedex[pokemon.pokemonName]?.types;
    if (!types) return null; // safe guard
    const multiplier = checkAbilityWeakness(pokemon.ability);
    return getTypeWeakness(types, multiplier);
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
        ${teraType !== '' ? `<li class="tera top"><span class="field-title">Tera Type: </span>
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
function updateTypeTable(force = false) {
    const team = allTeams[currentTeam]?.teamMembers;
    if (!team || team.length === 0) {
        typeAside.style.display = 'none';
        return;
    }

    typeAside.style.display = 'block';

    const weaknessCount = {};
    const resistCount = {};
    const typesList = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"];

    typesList.forEach(type => {
        weaknessCount[type] = 0;
        resistCount[type] = 0;
    });

    for (const member of team) {
        if (!member || !member.pokemonName) continue;

        const pokemonData = pokedex[member.pokemonName];
        if (!pokemonData) continue;

        const types = pokemonData.types || [];
        const multiplier = checkAbilityWeakness(member.ability);

        let weak;
        if (types.length === 1) weak = multiplier ? applyMultipliers(weaknessChart[types[0].toLowerCase()], multiplier) : weaknessChart[types[0].toLowerCase()];
        else if (types.length === 2) {
            const t1 = types[0].toLowerCase();
            const t2 = types[1].toLowerCase();
            weak = multiplier ? applyMultipliers(multiplyValues(weaknessChart[t1], weaknessChart[t2]), multiplier) : multiplyValues(weaknessChart[t1], weaknessChart[t2]);
        } else continue;

        for (const type of typesList) {
            if (weak[type] < 1) resistCount[type]++;
            else if (weak[type] > 1) weaknessCount[type]++;
        }
    }

    const green = getGradient('green');
    const red = getGradient('red');

    const resistedTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(2) span');
    const weakToTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(3) span');

    typesList.forEach((type, i) => {
        resistedTypes[i].textContent = resistCount[type];
        resistedTypes[i].parentElement.style.backgroundColor = green[resistCount[type]];
        weakToTypes[i].textContent = weaknessCount[type];
        weakToTypes[i].parentElement.style.backgroundColor = red[weaknessCount[type]];
    });
}


// helper to compare two set objects
function setObjectsEqual(a, b) {
    //limit to ZA OU for now
    if (!a || !b) return false;
    if ((a.item || '') !== (b.item || '')) return false;
    if ((a.nature || '') !== (b.nature || '')) return false;
    if (JSON.stringify(a.evs || {}) !== JSON.stringify(b.evs || {})) return false;
    if (JSON.stringify(a.ivs || {}) !== JSON.stringify(b.ivs || {})) return false;
    const ma = a.moves || [];
    const mb = b.moves || [];
    if (ma.length !== mb.length) return false;
    for (let i = 0; i < ma.length; i++) {
        if (ma[i] !== mb[i]) return false;
    }
    return true;
}

// Function to be called when mutations are observed
function newPokemonChosen(pokemonName){

    cardPad.innerHTML = '';

        var setList = SETDEX_SV[pokemonName];

        // If the Pokemon has Mega forms, prepend any Mega-only sets that are not
        // present in the base form. Comparison checks all relevant fields (moves,
        // item, ability, nature, evs, ivs, teraType) so sets with same name but
        // different contents are treated as distinct.
        if (setList) {
            // work with an entries array so we can prepend
            let entries = Object.entries(setList);

            // check known mega suffixes; order here determines the relative order of prepended sets
            const megaSuffixes = ['-Mega', '-Mega-X', '-Mega-Y', '-Mega-Z'];
            const toPrepend = [];

            for (const sfx of megaSuffixes) {
                const megaKey = pokemonName + sfx;
                const megaObj = SETDEX_SV[megaKey];
                if (!megaObj) continue;
                for (const [mName, mObj] of Object.entries(megaObj)) {
                    // if this mega set doesn't match any existing base set, prepend it
                    const exists = entries.some(([_n, obj]) => setObjectsEqual(obj, mObj));
                    if (!exists) {
                        toPrepend.push([mName, mObj]);
                        // console.log(mName, mObj);
                    }
                }
            }

            if (toPrepend.length) {
                // Prepend mega-only sets. Convert back to an object but ensure
                // duplicate display names don't overwrite earlier entries by
                // appending numeric suffixes (" (2)", " (3)") when needed.
                entries = [...toPrepend, ...entries];
                const used = new Set();
                const obj = {};
                for (const [name, o] of entries) {
                    let key = name || '';
                    if (used.has(key)) {
                        let i = 2;
                        let candidate = `${key} (${i})`;
                        while (used.has(candidate)) {
                            i++;
                            candidate = `${key} (${i})`;
                        }
                        key = candidate;
                    }
                    used.add(key);
                    obj[key] = o;
                }
                setList = obj;
            }
        }
    
    if (setList === undefined) {
        if (pokemonName){
            poopMon();
        }
        else{
            landingPage();
        }
    }


    else{
        // Group sets by tier and render each tier as a red bordered row.
        // Tier detection is based on the beginning of the set name (case-insensitive).
        const tierOrder = [
            'Legends Z-A OU','Ubers','Anything Goes','Ubers UU','OU','UU','RU','NU','PU','ZU','LC','LC UU',
            'Monotype','National Dex','CAP','BSS','VGC','Doubles','NFE','1v1','Almost Any Ability','Balanced Hackmons'
        ];

        // Build entries array from setList preserving order
        const entries = Object.entries(setList || {});

        // Prepare buckets
        const buckets = {};
        for (const t of tierOrder) buckets[t] = [];
        const other = [];

        for (const entry of entries) {
            const sName = (entry[0] || '').toString();
            const low = sName.toLowerCase();
            let matched = false;

            for (const t of tierOrder) {
                const tl = t.toLowerCase();
                if (low.startsWith(tl)) {
                    buckets[t].push(entry);
                    matched = true;
                    break;
                }
            }

            if (!matched) other.push(entry);
        }

        // Clear current cards
        cardPad.innerHTML = '';

        // Load persisted collapsed state from chrome.storage.local
        let collapsedState = {};
        chrome.storage.local.get('tierCollapsed', (result) => {
            if (result.tierCollapsed) {
                collapsedState = result.tierCollapsed;
            }
        });

        // Helper to render a row for a tier (uses CSS classes and collapse control)
        function renderRow(label, rows) {
            const row = document.createElement('div');
            row.className = 'tier-row';

            const header = document.createElement('div');
            header.className = 'tier-row-header';

            const labelSpan = document.createElement('span');
            labelSpan.className = 'tier-label';
            labelSpan.textContent = `${label} (${rows.length})`;

            const collapseBtn = document.createElement('button');
            collapseBtn.className = 'tier-collapse-btn';
            collapseBtn.setAttribute('aria-expanded', 'true');
            collapseBtn.style.marginLeft = '8px';

            header.appendChild(labelSpan);
            // place collapse button immediately after the label on the left
            header.appendChild(collapseBtn);
            row.appendChild(header);

            const container = document.createElement('div');
            container.className = 'tier-row-container';

            for (const e of rows) {
                const name = e[0];
                const o = e[1];
                const setItem = o.item;
                const setAbility = o.ability;
                const setNature = o.nature;
                const setEVs = formatEVs(o.evs);
                const setIVs = formatEVs(o.ivs);
                const setTeraType = o.teraType;
                const setMove1 = o.moves ? o.moves[0] : undefined;
                const setMove2 = o.moves ? o.moves[1] : undefined;
                const setMove3 = o.moves ? o.moves[2] : undefined;
                const setMove4 = o.moves ? o.moves[3] : undefined;

                const card = createCard(pokemonName, name, setItem, setAbility, setNature, setEVs, setIVs, setTeraType, setMove1, setMove2, setMove3, setMove4);
                container.appendChild(card);
            }

            row.appendChild(container);

            // Apply persisted collapsed state if present
            const saved = !!collapsedState[label];
            if (saved) {
                row.classList.add('collapsed');
                collapseBtn.setAttribute('aria-expanded', 'false');
            }

            // Toggle collapse on click
            collapseBtn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const isCollapsed = row.classList.toggle('collapsed');
                collapseBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
                collapsedState[label] = isCollapsed;
                chrome.storage.local.set({ tierCollapsed: collapsedState });
            });

            // Clicking anywhere in the tier row (except a card) should toggle collapse
            row.addEventListener('click', (e) => {
                // If click originated inside a card, don't toggle collapse
                if (e.target.closest('.card')) return;
                // If the click was on the collapse button, let its handler manage it (it stops propagation)
                collapseBtn.click();
            });

            cardPad.appendChild(row);
        }

        // Render tiers in order
        for (const t of tierOrder) {
            if (buckets[t] && buckets[t].length) renderRow(t, buckets[t]);
        }

        // Render others
        if (other.length) renderRow('Other', other);
    }
        if (currentTeam){
        updateTeams();
    }


}

function updateTypeAsideVisibility() {
    const teambuilderTab = document.querySelector('a.roomtab[href="/teambuilder"]');
    const teamNameInput = document.querySelector(POKESHOWDOWN_SELECTORS.teamInput);
    const pokemonEditButton = document.querySelector('#room-teambuilder > div > div.pad > button');

    if (!teambuilderTab?.classList.contains('cur') || (!teamNameInput && !pokemonEditButton)) {
        // Not on teambuilder tab, or on page 1 (no team selected)
        typeAside.style.display = "none";
    } else {
        // On page 2 or page 3
        typeAside.style.display = "block";
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
    updateTypeAsideVisibility();
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
const outerPad = document.querySelector("#room-rooms");
const POKESHOWDOWN_SELECTORS = {
    teamInput: "#room-teambuilder > div > div > input",
    pokemonInput: "#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-icon > div.setcell.setcell-pokemon > input",
    editBtn: "#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setmenu > button:nth-child(2)",
    importTextarea: "#room-teambuilder > div > div.teambuilder-pokemon-import > textarea",
    importBtn: "#room-teambuilder > div > div.teambuilder-pokemon-import > div.pokemonedit-buttons > button:nth-child(2)"
};

POKESHOWDOWN_SELECTORS.tab = 'a.roomtab[href="/teambuilder"]';

let currentPokemon = "";
let currentTeam = "";

const innerPad = document.createElement('div');
const cardPad = document.createElement("div");
const typeAside = document.createElement("aside");

cardPad.setAttribute('id', 'card-pad');
innerPad.setAttribute('id', 'inner-pad');
typeAside.setAttribute('id', 'type-weakness-tab');
typeAside.innerHTML = typeTableTemplate;

const GRADIENT_COLORS = {
    green: ['#FFFFFF', '#E6F9E6', '#CCF3CC', '#B3EDB3', '#99E699', '#80E080', '#00CC00'],
    red: ['#FFFFFF', '#FFE6E6', '#FFCCCC', '#FFB3B3', '#FF9999', '#FF8080', '#FF0000'],
    darkGreen: ['#1A1A1A', '#4D6B4D', '#3B8F3B', '#2E6F2E', '#228922', '#1A7B1A', '#006600'],
    darkRed: ['#1A1A1A', '#6B4D4D', '#8F3B3B', '#6F2E2E', '#922222', '#7B1A1A', '#660000']
};

const isDarkMode = () => document.documentElement.classList.contains('dark');
const getGradient = (color) => isDarkMode() ? GRADIENT_COLORS[`dark${color.charAt(0).toUpperCase() + color.slice(1)}`] : GRADIENT_COLORS[color];

var allTeams = [];
var strAllTeams = "";

outerPad.innerHTML = '';
// innerPad.appendChild(cardPad);
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





// Function to find which team was modified by comparing old and new team data
function findModifiedTeam(oldTeams, newTeams) {
    for (const teamName in newTeams) {
        const oldTeam = oldTeams[teamName];
        const newTeam = newTeams[teamName];
        
        // Team is new or has been modified
        if (!oldTeam || !deepEqual(oldTeam, newTeam)) {
            return teamName;
        }
    }
    return null;
}

// Function to retrieve and update team data
function updateTeams() {
    const showdown_teams = localStorage.getItem('showdown_teams');
    if (!showdown_teams || showdown_teams === strAllTeams) return;

    const oldTeams = allTeams;
    strAllTeams = showdown_teams;
    allTeams = processTeamsWithNames(strAllTeams.split('\n'));

    // Find which team was modified
    const modifiedTeam = findModifiedTeam(oldTeams, allTeams);
    if (modifiedTeam) {
        currentTeam = modifiedTeam; // Set BEFORE updating type table
        updateTypeAsideVisibility(); // make sure tab hides/shows correctly
        updateTypeTable(true);
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

// Listen for localStorage changes (from Pokémon Showdown)
window.addEventListener('storage', (e) => {
    if (e.key === 'showdown_teams' && e.newValue && e.newValue !== strAllTeams) {
        // Update teams using updateTeams which finds modified team
        updateTeams();
    }
});

// Replace polling with delegated UI listeners + debounce to catch same-window
// updates (storage events only fire across windows). This listens for
// relevant interactions inside the teambuilder area and triggers a
// debounced updateTeams(), which will diff teams and force-update the
// type table when needed.
let _debounceTimer = null;
function debouncedUpdateTeams(delay = 150){
    if (_debounceTimer) clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(() => {
        try { updateTeams(); } catch (err) { /* swallow */ }
    }, delay);
}

// Delegated listeners on the document body scoped to the teambuilder node.
// We check `closest('#room-teambuilder')` so we only react to relevant UI.
document.body.addEventListener('input', (ev) => {
    if (!ev.target.closest('#room-teambuilder')) return;
    debouncedUpdateTeams();
}, { capture: true });

document.body.addEventListener('change', (ev) => {
    if (!ev.target.closest('#room-teambuilder')) return;
    debouncedUpdateTeams();
}, { capture: true });

document.body.addEventListener('click', (ev) => {
    if (!ev.target.closest('#room-teambuilder')) return;
    // Only trigger on clicks likely to mutate teams: edit/import/add buttons
    const relevant = ev.target.closest(POKESHOWDOWN_SELECTORS.editBtn)
        || ev.target.closest(POKESHOWDOWN_SELECTORS.importBtn)
        || ev.target.closest(POKESHOWDOWN_SELECTORS.importTextarea)
        || ev.target.closest('#room-teambuilder .teambuilder-add');
    if (relevant) debouncedUpdateTeams();
}, { capture: true });

// MutationObserver management: only observe the teambuilder subtree when present.
// This reduces work compared to observing the entire document body.
// --- TEAMBUIDER OBSERVER --- //

// 1️⃣ Define handleTeambuilderMutations first
function handleTeambuilderMutations() {
    const teambuilderTab = document.querySelector('a.roomtab[href="/teambuilder"]');
    const teamNameInput = document.querySelector(POKESHOWDOWN_SELECTORS.teamInput);
    const page3Button = document.querySelector('#room-teambuilder > div > div.pad > button');
    
    // Teambuilder tab NOT active → Home page
    if (!teambuilderTab || !teambuilderTab.classList.contains('cur')) {
        currentTeam = '';
        currentPokemon = '';
        cardPad.innerHTML = '';
        landingPage();
        typeAside.style.display = 'none';
        cardPad.style.display = 'block';
        return;
    }

    // Page 3 → Pokemon edit (show cards + type table)
    if (page3Button) {
        typeAside.style.display = 'block';
        cardPad.style.display = 'block';
        const pokemonInput = document.querySelector(POKESHOWDOWN_SELECTORS.pokemonInput);
        if (pokemonInput && currentPokemon !== pokemonInput.value) {
            currentPokemon = pokemonInput.value;
            newPokemonChosen(currentPokemon); // fill cardPad
        }
        return;
    }

    // Page 1 or 2 → landing page + type table if page 2
    currentPokemon = '';  // reset pokemon selection
    cardPad.innerHTML = '';
    landingPage();
    cardPad.style.display = 'block';

    if (teamNameInput) {
        // Page 2: team edit → show type table for current team
        currentTeam = teamNameInput.value;
        typeAside.style.display = 'block';
        updateTypeTable(); // refresh type chart with current team
    } else {
        // Page 1: team list → hide type table
        typeAside.style.display = 'none';
        currentTeam = '';
    }
}



// 2️⃣ Then attach your observers (as in previous code)

let teambuilderObserver = null;

function attachTeambuilderObserver(node) {
    if (teambuilderObserver) return;

    teambuilderObserver = new MutationObserver(() => {
        handleTeambuilderMutations();
    });

    // Observe subtree changes: child additions, removals, attribute changes
    teambuilderObserver.observe(node, { childList: true, subtree: true, attributes: true });
}

function detachTeambuilderObserver() {
    if (!teambuilderObserver) return;
    try { teambuilderObserver.disconnect(); } catch (e) { }
    teambuilderObserver = null;
}

// Observe document.body for insertion/removal of the teambuilder tab
const tabObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
        for (const n of m.addedNodes || []) {
            if (!(n instanceof HTMLElement)) continue;
            if (n.id === 'room-teambuilder' || n.querySelector?.('#room-teambuilder')) {
                const tbNode = n.id === 'room-teambuilder' ? n : n.querySelector('#room-teambuilder');
                attachTeambuilderObserver(tbNode);
                handleTeambuilderMutations(); // initial pass
            }
        }
        for (const n of m.removedNodes || []) {
            if (!(n instanceof HTMLElement)) continue;
            if (n.id === 'room-teambuilder' || n.querySelector?.('#room-teambuilder')) {
                detachTeambuilderObserver();
                currentPokemon = '';
                currentTeam = '';
                landingPage(); // fallback to home
            }
        }
    }
});

// Start observing body for teambuilder insertion/removal
tabObserver.observe(document.body, { childList: true, subtree: true });

// If teambuilder already exists on load, attach immediately
const existingTB = document.querySelector('#room-teambuilder');
if (existingTB) attachTeambuilderObserver(existingTB);


cardPad.addEventListener("click", (event) => {
    const clickedCard = event.target.closest('.card');
    if (!clickedCard) return;
    
    const fillPokemon = () => {
        const editBtn = document.querySelector(POKESHOWDOWN_SELECTORS.editBtn);
        const textarea = document.querySelector(POKESHOWDOWN_SELECTORS.importTextarea);
        const importBtn = document.querySelector(POKESHOWDOWN_SELECTORS.importBtn);
        
        if (!editBtn || !textarea || !importBtn) return;
        editBtn.click();
        textarea.value = clickedCard.dataset.export;
        importBtn.click();
    };
    
    // Run twice to ensure it sticks (Showdown behavior)
    fillPokemon();
    setTimeout(fillPokemon, 100);
})



const weaknessChart = {
    "normal": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 2,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 0,
      "dragon": 1,
      "dark": 1,
      "steel": 1,
      "fairy": 1
    },
    "fire": {
      "normal": 1,
      "fire": 0.5,
      "water": 2,
      "electric": 1,
      "grass": 0.5,
      "ice": 0.5,
      "fighting": 1,
      "poison": 1,
      "ground": 2,
      "flying": 1,
      "psychic": 1,
      "bug": 0.5,
      "rock": 2,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 0.5,
      "fairy": 0.5
    },
    "water": {
      "normal": 1,
      "fire": 0.5,
      "water": 0.5,
      "electric": 2,
      "grass": 2,
      "ice": 0.5,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 0.5,
      "fairy": 1
    },
    "electric": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 0.5,
      "grass": 1,
      "ice": 1,
      "fighting": 1,
      "poison": 1,
      "ground": 2,
      "flying": 0.5,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 0.5,
      "fairy": 1
    },
    "grass": {
      "normal": 1,
      "fire": 2,
      "water": 0.5,
      "electric": 0.5,
      "grass": 0.5,
      "ice": 2,
      "fighting": 1,
      "poison": 2,
      "ground": 0.5,
      "flying": 2,
      "psychic": 1,
      "bug": 2,
      "rock": 1,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 1,
      "fairy": 1
    },
    "ice": {
      "normal": 1,
      "fire": 2,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 0.5,
      "fighting": 2,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 2,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 2,
      "fairy": 1
    },
    "fighting": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 2,
      "psychic": 2,
      "bug": 0.5,
      "rock": 0.5,
      "ghost": 1,
      "dragon": 1,
      "dark": 0.5,
      "steel": 1,
      "fairy": 2
    },
    "poison": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 0.5,
      "ice": 1,
      "fighting": 0.5,
      "poison": 0.5,
      "ground": 2,
      "flying": 1,
      "psychic": 2,
      "bug": 0.5,
      "rock": 1,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 1,
      "fairy": 0.5
    },
    "ground": {
      "normal": 1,
      "fire": 1,
      "water": 2,
      "electric": 0,
      "grass": 2,
      "ice": 2,
      "fighting": 1,
      "poison": 0.5,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 0.5,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 1,
      "fairy": 1
    },
    "flying": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 2,
      "grass": 0.5,
      "ice": 2,
      "fighting": 0.5,
      "poison": 1,
      "ground": 0,
      "flying": 1,
      "psychic": 1,
      "bug": 0.5,
      "rock": 2,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 1,
      "fairy": 1
    },
    "psychic": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 0.5,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 0.5,
      "bug": 2,
      "rock": 1,
      "ghost": 2,
      "dragon": 1,
      "dark": 2,
      "steel": 1,
      "fairy": 1
    },
    "bug": {
      "normal": 1,
      "fire": 2,
      "water": 1,
      "electric": 1,
      "grass": 0.5,
      "ice": 1,
      "fighting": 0.5,
      "poison": 1,
      "ground": 0.5,
      "flying": 2,
      "psychic": 1,
      "bug": 1,
      "rock": 2,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 1,
      "fairy": 1
    },
    "rock": {
      "normal": 0.5,
      "fire": 0.5,
      "water": 2,
      "electric": 1,
      "grass": 2,
      "ice": 1,
      "fighting": 2,
      "poison": 0.5,
      "ground": 2,
      "flying": 0.5,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 2,
      "fairy": 1
    },
    "ghost": {
      "normal": 0,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 0,
      "poison": 0.5,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 0.5,
      "rock": 1,
      "ghost": 2,
      "dragon": 1,
      "dark": 2,
      "steel": 1,
      "fairy": 1
    },
    "dragon": {
      "normal": 1,
      "fire": 0.5,
      "water": 0.5,
      "electric": 0.5,
      "grass": 0.5,
      "ice": 2,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 2,
      "dark": 1,
      "steel": 1,
      "fairy": 2
    },
    "dark": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 2,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 0,
      "bug": 2,
      "rock": 1,
      "ghost": 0.5,
      "dragon": 1,
      "dark": 0.5,
      "steel": 1,
      "fairy": 2
    },
    "steel": {
      "normal": 0.5,
      "fire": 2,
      "water": 1,
      "electric": 1,
      "grass": 0.5,
      "ice": 0.5,
      "fighting": 2,
      "poison": 0,
      "ground": 2,
      "flying": 0.5,
      "psychic": 0.5,
      "bug": 0.5,
      "rock": 0.5,
      "ghost": 1,
      "dragon": 0.5,
      "dark": 1,
      "steel": 0.5,
      "fairy": 0.5
    },
    "fairy": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 0.5,
      "poison": 2,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 0.5,
      "rock": 1,
      "ghost": 1,
      "dragon": 0,
      "dark": 0.5,
      "steel": 2,
      "fairy": 1
    }
  }

const typeTableTemplate = 
`<table id="resistance-weakness-table">
    <tr>
        <th>Type</th>
        <th>Resisted</th>
        <th>Weakness</th>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Normal.png" alt="Normal"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Fire.png" alt="Fire"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Water.png" alt="Water"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Electric.png" alt="Electric"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Grass.png" alt="Grass"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Ice.png" alt="Ice"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Fighting.png" alt="Fighting"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Poison.png" alt="Poison"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Ground.png" alt="Ground"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Flying.png" alt="Flying"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Psychic.png" alt="Psychic"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Bug.png" alt="Bug"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Rock.png" alt="Rock"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Ghost.png" alt="Ghost"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Dragon.png" alt="Dragon"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Dark.png" alt="Dark"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Steel.png" alt="Steel"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
    <tr>
        <td><img src="https://play.pokemonshowdown.com/sprites/types/Fairy.png" alt="Fairy"></td>
        <td><span>0</span></td>
        <td><span>0</span></td>
    </tr>
</table>`
// function multiplyValues(obj1, obj2) {
//   let result = {};
//   for (let key in obj1) {
//     if (obj2.hasOwnProperty(key)) {
//       result[key] = obj1[key] * obj2[key];
//     }
//   }
//   return result;
// }

// function lookUpWeakness(pokemon){
//   var pokemonTypes = pokedex[pokemon].types;
//   if (pokemonTypes.length == 1){
//     let type = pokemonTypes[0].toLowerCase();
//     return weaknessChart[type];
//   }
//   else if (pokemonTypes.length == 2){
//     let type1 = pokemonTypes[0].toLowerCase();
//     let type2 = pokemonTypes[1].toLowerCase();
//     return multiplyValues(weaknessChart[type1], weaknessChart[type2]);
//   }
// }

// var weaknessCount = {
//   "normal": 0,
//   "fire": 0,
//   "water": 0,
//   "electric": 0,
//   "grass": 0,
//   "ice": 0,
//   "fighting": 0,
//   "poison": 0,
//   "ground": 0,
//   "flying": 0,
//   "psychic": 0,
//   "bug": 0,
//   "rock": 0,
//   "ghost": 0,
//   "dragon": 0,
//   "dark": 0,
//   "steel": 0,
//   "fairy": 0
// }
// var resistCount = {
//   "normal": 0,
//   "fire": 0,
//   "water": 0,
//   "electric": 0,
//   "grass": 0,
//   "ice": 0,
//   "fighting": 0,
//   "poison": 0,
//   "ground": 0,
//   "flying": 0,
//   "psychic": 0,
//   "bug": 0,
//   "rock": 0,
//   "ghost": 0,
//   "dragon": 0,
//   "dark": 0,
//   "steel": 0,
//   "fairy": 0
// }
// // loop over pokemon
// for (let member of teamList){
//   let weak = (lookUpWeakness(member));
//   // loop over each type
//   for (let i in weak){
//     console.log(i);
//     if (weak[i] < 1){
//       resistCount[i]++;
//     }
//     else if (weak[i] > 1){
//       weaknessCount[i]++;
//     }
//   }
// }



// const resistedTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(2) span');
// const weakToTypes = document.querySelectorAll('#resistance-weakness-table tr td:nth-child(3) span');
// const greenGradient = ['#FFFFFF', '#E6F9E6', '#CCF3CC', '#B3EDB3', '#99E699', '#80E080', '#00CC00'];
// const redGradient = ['#FFFFFF', '#FFE6E6', '#FFCCCC', '#FFB3B3', '#FF9999', '#FF8080', '#FF0000'];


// var rkeys = Object.keys(resistCount);
// rkeys.forEach((type, i) => {
//   resistedTypes[i].textContent = resistCount[type];
//   resistedTypes[i].parentElement.style.backgroundColor = greenGradient[resistCount[type]];
// });

// var wkeys = Object.keys(weaknessCount);
// wkeys.forEach((type, i) => {
//   weakToTypes[i].textContent = weaknessCount[type];
//   weakToTypes[i].parentElement.style.backgroundColor = redGradient[weaknessCount[type]];
// });



// // console.log(types);
// // console.log(types[6].textContent);
// // console.log(weaknessCount[6]);
// // for (let i in types){
// //   console.log(weaknessCount[i]);
// //   types[i].textContent = weaknessCount[i];
// // }
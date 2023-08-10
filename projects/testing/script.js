function txtDataToObject(txtData) {
    // Split the txt data into lines to process each entry
    const lines = txtData.trim().split("\n");
    
    // Initialize an empty object to store the result
    const result = {};
  
    // Process each line and create an object entry for each Pokémon
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].split("|").map((item) => item.trim());
      if (line.length === 5) {
        const name = line[2];
        const rank = line[1];
        const percentage = parseFloat(line[3].slice(0, -1));
        result[name] = [rank, percentage];
      }
    }
  
    return result;
  }
  
  // Sample txt data
  const txtData = `
  | 1    | Great Tusk         | 46.949% |
  | 2    | Kingambit          | 46.043% |
  | 3    | Iron Valiant       | 29.995% |
  | 4    | Gholdengo          | 27.577% |
  | 5    | Samurott-Hisui     | 24.687% |
  | 6    | Dragapult          | 22.004% |
  | 7    | Baxcalibur         | 21.538% |
  | 8    | Slowking-Galar     | 20.748% |
  | 9    | Zapdos             | 18.674% |
  | 10   | Enamorus           | 18.187% |
  | 11   | Cinderace          | 14.795% |
  | 12   | Ting-Lu            | 13.447% |
  | 13   | Landorus-Therian   | 11.952% |
  | 14   | Sneasler           | 11.490% |
  | 15   | Dragonite          | 11.458% |
  | 16   | Walking Wake       | 11.349% |
  | 17   | Zamazenta          | 10.024% |
  | 18   | Garganacl          |  9.641% |
  | 19   | Amoonguss          |  9.544% |
  | 20   | Corviknight        |  8.985% |
  | 21   | Dondozo            |  8.605% |
  | 22   | Hatterene          |  8.142% |
  | 23   | Greninja           |  7.891% |
  | 24   | Sandy Shocks       |  7.532% |
  | 25   | Toxapex            |  7.359% |
  | 26   | Heatran            |  7.188% |
  | 27   | Glimmora           |  6.841% |
  | 28   | Rotom-Wash         |  6.353% |
  | 29   | Ursaluna           |  5.936% |
  | 30   | Iron Moth          |  5.855% |
  | 31   | Cresselia          |  5.822% |
  | 32   | Pelipper           |  5.819% |
  | 33   | Azumarill          |  5.801% |
  | 34   | Meowscarada        |  5.476% |
  | 35   | Clodsire           |  5.369% |
  | 36   | Roaring Moon       |  5.364% |
  | 37   | Moltres            |  5.351% |
  | 38   | Garchomp           |  4.992% |
  | 39   | Hoopa-Unbound      |  4.546% |
  | 40   | Iron Treads        |  4.224% |
  | 41   | Basculegion        |  3.867% |
  | 42   | Volcanion          |  3.440% |
  | 43   | Scizor             |  3.317% |
  | 44   | Blissey            |  3.192% |
  | 45   | Rillaboom          |  3.049% |
  | 46   | Enamorus-Therian   |  2.961% |
  | 47   | Torkoal            |  2.895% |
  | 48   | Alomomola          |  2.770% |
  | 49   | Skeledirge         |  2.551% |
  | 50   | Maushold           |  2.333% |
  | 51   | Iron Hands         |  2.188% |
  | 52   | Grimmsnarl         |  2.159% |
  | 53   | Ceruledge          |  1.914% |
  | 54   | Lilligant-Hisui    |  1.878% |
  | 55   | Muk-Alola          |  1.806% |
  | 56   | Tornadus-Therian   |  1.798% |
  | 57   | Breloom            |  1.781% |
  | 58   | Armarouge          |  1.641% |
  | 59   | Slowking           |  1.448% |
  | 60   | Quaquaval          |  1.369% |
  | 61   | Moltres-Galar      |  1.364% |
  | 62   | Scream Tail        |  1.329% |
  | 63   | Cyclizar           |  1.325% |
  | 64   | Hydreigon          |  1.290% |
  | 65   | Thundurus-Therian  |  1.165% |
  | 66   | Ditto              |  1.070% |
  | 67   | Masquerain         |  1.018% |
  | 68   | Pawmot             |  0.942% |
  | 69   | Hawlucha           |  0.942% |
  | 70   | Polteageist        |  0.936% |
  | 71   | Indeedee           |  0.880% |
  | 72   | Basculegion-F      |  0.870% |
  | 73   | Slowbro-Galar      |  0.864% |
  | 74   | Arcanine-Hisui     |  0.851% |
  | 75   | Zoroark-Hisui      |  0.798% |
  | 76   | Goodra-Hisui       |  0.756% |
  | 77   | Mew                |  0.641% |
  | 78   | Floatzel           |  0.631% |
  | 79   | Typhlosion-Hisui   |  0.612% |
  | 80   | Abomasnow          |  0.542% |
  | 81   | Frosmoth           |  0.532% |
  | 82   | Kleavor            |  0.518% |
  | 83   | Azelf              |  0.515% |
  | 84   | Braviary-Hisui     |  0.496% |
  | 85   | Magnezone          |  0.481% |
  | 86   | Overqwil           |  0.480% |
  | 87   | Mimikyu            |  0.459% |
  | 88   | Thundurus          |  0.412% |
  | 89   | Tyranitar          |  0.411% |
  | 90   | Zapdos-Galar       |  0.407% |
  | 91   | Wo-Chien           |  0.389% |
  | 92   | Iron Jugulis       |  0.388% |
  | 93   | Articuno-Galar     |  0.385% |
  | 94   | Gastrodon          |  0.375% |
  | 95   | Regidrago          |  0.355% |
  | 96   | Houndstone         |  0.353% |
  | 97   | Talonflame         |  0.346% |
  | 98   | Tinkaton           |  0.338% |
  | 99   | Decidueye-Hisui    |  0.336% |
  | 100  | Weavile            |  0.329% |
  | 101  | Uxie               |  0.305% |
  | 102  | Drifblim           |  0.303% |
  | 103  | Meloetta           |  0.299% |
  | 104  | Chesnaught         |  0.291% |
  | 105  | Toedscruel         |  0.287% |
  | 106  | Arboliva           |  0.266% |
  | 107  | Tauros-Paldea-Aqua |  0.262% |
  | 108  | Gengar             |  0.247% |
  | 109  | Slowbro            |  0.240% |
  | 110  | Tornadus           |  0.216% |
  | 111  | Iron Leaves        |  0.211% |
  | 112  | Pincurchin         |  0.210% |
  | 113  | Bronzong           |  0.208% |
  | 114  | Rotom-Heat         |  0.196% |
  | 115  | Klefki             |  0.193% |
  | 116  | Spidops            |  0.193% |
  | 117  | Slither Wing       |  0.184% |
  | 118  | Electrode-Hisui    |  0.177% |
  | 119  | Dudunsparce        |  0.175% |
  | 120  | Tauros-Paldea-Blaze |  0.172% |
  | 121  | Brambleghast       |  0.170% |
  | 122  | Orthworm           |  0.168% |
  | 123  | Gyarados           |  0.163% |
  | 124  | Barraskewda        |  0.160% |
  | 125  | Sylveon            |  0.145% |
  | 126  | Forretress         |  0.140% |
  | 127  | Lycanroc-Dusk      |  0.140% |
  | 128  | Lokix              |  0.138% |
  | 129  | Gardevoir          |  0.138% |
  | 130  | Haxorus            |  0.137% |
  | 131  | Cetitan            |  0.135% |
  | 132  | Cloyster           |  0.132% |
  | 133  | Delphox            |  0.131% |
  | 134  | Rabsca             |  0.130% |
  | 135  | Mismagius          |  0.129% |
  | 136  | Flamigo            |  0.126% |
  | 137  | Gallade            |  0.125% |
  | 138  | Brute Bonnet       |  0.125% |
  | 139  | Golduck            |  0.118% |
  | 140  | Zarude             |  0.113% |
  | 141  | Glastrier          |  0.109% |
  | 142  | Umbreon            |  0.105% |
  | 143  | Toxtricity         |  0.102% |
  | 144  | Staraptor          |  0.102% |
   `;
  
  // Call the function with the sample data
  const resultObject = txtDataToObject(txtData);
  console.log(resultObject);
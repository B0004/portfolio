const natureModifiers = {
    Hardy: { attack: 1.0, defense: 1.0, specialAttack: 1.0, specialDefense: 1.0, speed: 1.0 },
    Lonely: { attack: 1.1, defense: 0.9, specialAttack: 1.0, specialDefense: 1.0, speed: 1.0 },
    Brave: { attack: 1.1, defense: 1.0, specialAttack: 1.0, specialDefense: 1.0, speed: 0.9 },
    Adamant: { attack: 1.1, defense: 1.0, specialAttack: 0.9, specialDefense: 1.0, speed: 1.0 },
    Naughty: { attack: 1.1, defense: 1.0, specialAttack: 1.0, specialDefense: 0.9, speed: 1.0 },
    Bold: { attack: 0.9, defense: 1.1, specialAttack: 1.0, specialDefense: 1.0, speed: 1.0 },
    Docile: { attack: 1.0, defense: 1.0, specialAttack: 1.0, specialDefense: 1.0, speed: 1.0 },
    Relaxed: { attack: 1.0, defense: 1.1, specialAttack: 1.0, specialDefense: 1.0, speed: 0.9 },
    Impish: { attack: 1.0, defense: 1.1, specialAttack: 0.9, specialDefense: 1.0, speed: 1.0 },
    Lax: { attack: 1.0, defense: 1.1, specialAttack: 1.0, specialDefense: 0.9, speed: 1.0 },
    Timid: { attack: 0.9, defense: 1.0, specialAttack: 1.0, specialDefense: 1.0, speed: 1.1 },
    Hasty: { attack: 1.0, defense: 0.9, specialAttack: 1.0, specialDefense: 1.0, speed: 1.1 },
    Serious: { attack: 1.0, defense: 1.0, specialAttack: 1.0, specialDefense: 1.0, speed: 1.0 },
    Jolly: { attack: 1.0, defense: 1.0, specialAttack: 0.9, specialDefense: 1.0, speed: 1.1 },
    Naive: { attack: 1.0, defense: 1.0, specialAttack: 1.0, specialDefense: 0.9, speed: 1.1 },
    Modest: { attack: 0.9, defense: 1.0, specialAttack: 1.1, specialDefense: 1.0, speed: 1.0 },
    Mild: { attack: 1.0, defense: 0.9, specialAttack: 1.1, specialDefense: 1.0, speed: 1.0 },
    Quiet: { attack: 1.0, defense: 1.0, specialAttack: 1.1, specialDefense: 1.0, speed: 0.9 },
    Bashful: { attack: 1.0, defense: 1.0, specialAttack: 1.0, specialDefense: 1.0, speed: 1.0 },
    Rash: { attack: 1.0, defense: 1.0, specialAttack: 1.1, specialDefense: 0.9, speed: 1.0 },
    Calm: { attack: 0.9, defense: 1.0, specialAttack: 1.0, specialDefense: 1.1, speed: 1.0 },
    Gentle: { attack: 1.0, defense: 0.9, specialAttack: 1.0, specialDefense: 1.1, speed: 1.0 },
    Sassy: { attack: 1.0, defense: 1.0, specialAttack: 1.0, specialDefense: 1.1, speed: 0.9 },
    Careful: { attack: 1.0, defense: 1.0, specialAttack: 0.9, specialDefense: 1.1, speed: 1.0 },
    Quirky: { attack: 1.0, defense: 1.0, specialAttack: 1.0, specialDefense: 1.0, speed: 1.0 },
};

function calculateStats(baseStats, evs, ivs, level, nature) {
    const stats = {};
  
    // HP stat calculation
    const baseHP = baseStats.HP;
    const evHP = evs.HP || 0;
    const ivHP = ivs.HP || 0;
    const natureHPModifier = natureModifiers[nature].HP || 1.0;
    const calculatedHP = Math.floor(((2 * baseHP + ivHP + Math.floor(evHP / 4)) * level) / 100 + level + 10);
    const finalHP = Math.floor(calculatedHP * natureHPModifier);
    stats.HP = finalHP;
  
    // Other stats calculation
    Object.keys(baseStats).forEach((stat) => {
      if (stat === 'HP') return; // Skip HP stat, as it was calculated separately
  
      const baseStat = baseStats[stat];
      const ev = evs[stat] || 0;
      const iv = ivs[stat] || 0;
      const natureModifier = natureModifiers[nature][stat] || 1.0;
  
      // Calculate the stat value using the formula:
      // ((2 * baseStat + iv + (ev / 4)) * level / 100 + 5) * natureModifier
      const calculatedStat = Math.floor(
        ((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100 + 5
      );
      const finalStat = Math.floor(calculatedStat * natureModifier);
  
      stats[stat] = finalStat;
    });
  
    return stats;
  }
  
  const baseStats = {
    HP: 98,
    attack: 87,
    defense: 105,
    specialAttack: 53,
    specialDefense: 85,
    speed: 67,
  };
  
  const evs = {
    HP: 252,
    attack: 252,
    defense: 4,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };
  
  const ivs = {
    HP: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31,
  };
  
  const level = 100;
  const nature = 'Adamant';
  
  const calculatedStats = calculateStats(baseStats, evs, ivs, level, nature);
  console.log(calculatedStats);
  
  
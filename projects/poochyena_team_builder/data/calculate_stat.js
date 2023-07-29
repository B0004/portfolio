const natureModifiers = {
    Hardy: { atk: 1.0, def: 1.0, spa: 1.0, spd: 1.0, spe: 1.0 },
    Lonely: { atk: 1.1, def: 0.9, spa: 1.0, spd: 1.0, spe: 1.0 },
    Brave: { atk: 1.1, def: 1.0, spa: 1.0, spd: 1.0, spe: 0.9 },
    Adamant: { atk: 1.1, def: 1.0, spa: 0.9, spd: 1.0, spe: 1.0 },
    Naughty: { atk: 1.1, def: 1.0, spa: 1.0, spd: 0.9, spe: 1.0 },
    Bold: { atk: 0.9, def: 1.1, spa: 1.0, spd: 1.0, spe: 1.0 },
    Docile: { atk: 1.0, def: 1.0, spa: 1.0, spd: 1.0, spe: 1.0 },
    Relaxed: { atk: 1.0, def: 1.1, spa: 1.0, spd: 1.0, spe: 0.9 },
    Impish: { atk: 1.0, def: 1.1, spa: 0.9, spd: 1.0, spe: 1.0 },
    Lax: { atk: 1.0, def: 1.1, spa: 1.0, spd: 0.9, spe: 1.0 },
    Timid: { atk: 0.9, def: 1.0, spa: 1.0, spd: 1.0, spe: 1.1 },
    Hasty: { atk: 1.0, def: 0.9, spa: 1.0, spd: 1.0, spe: 1.1 },
    Serious: { atk: 1.0, def: 1.0, spa: 1.0, spd: 1.0, spe: 1.0 },
    Jolly: { atk: 1.0, def: 1.0, spa: 0.9, spd: 1.0, spe: 1.1 },
    Naive: { atk: 1.0, def: 1.0, spa: 1.0, spd: 0.9, spe: 1.1 },
    Modest: { atk: 0.9, def: 1.0, spa: 1.1, spd: 1.0, spe: 1.0 },
    Mild: { atk: 1.0, def: 0.9, spa: 1.1, spd: 1.0, spe: 1.0 },
    Quiet: { atk: 1.0, def: 1.0, spa: 1.1, spd: 1.0, spe: 0.9 },
    Bashful: { atk: 1.0, def: 1.0, spa: 1.0, spd: 1.0, spe: 1.0 },
    Rash: { atk: 1.0, def: 1.0, spa: 1.1, spd: 0.9, spe: 1.0 },
    Calm: { atk: 0.9, def: 1.0, spa: 1.0, spd: 1.1, spe: 1.0 },
    Gentle: { atk: 1.0, def: 0.9, spa: 1.0, spd: 1.1, spe: 1.0 },
    Sassy: { atk: 1.0, def: 1.0, spa: 1.0, spd: 1.1, spe: 0.9 },
    Careful: { atk: 1.0, def: 1.0, spa: 0.9, spd: 1.1, spe: 1.0 },
    Quirky: { atk: 1.0, def: 1.0, spa: 1.0, spd: 1.0, spe: 1.0 }
};

function calculateStats(baseStats, evs, ivs, level, nature) {
    var stats = {};
  
    // HP stat calculation
    var baseHP = baseStats.hp;
    var evHP = evs.hp || 0;
    var ivHP = ivs.hp || 31;
    stats.hp = Math.floor(((2 * baseHP + ivHP + Math.floor(evHP / 4)) * level) / 100 + level + 10);

  
    // Other stats calculation
    Object.keys(baseStats).forEach((stat) => {
      if (stat === 'hp') return; // Skip HP stat, as it was calculated separately
  
      var baseStat = baseStats[stat];
      var ev = evs[stat] || 0;
      var iv = ivs[stat] || 31;
      var natureModifier = natureModifiers[nature][stat] || 1.0;
  
      // Calculate the stat value using the formula:
      // ((2 * baseStat + iv + (ev / 4)) * level / 100 + 5) * natureModifier
      var calculatedStat = Math.floor(
        ((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100 + 5
      );
      var finalStat = Math.floor(calculatedStat * natureModifier);
  
      stats[stat] = finalStat;
    });
  
    return stats;
  }
  

  
  
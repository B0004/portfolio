// Load abbreviations and provide a function to abbreviate input text.

async function loadAbbreviations() {
  const resp = await fetch('abbreviations.json');
  if (!resp.ok) throw new Error('Could not load abbreviations.json');
  return resp.json();
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function preserveCapitalization(original, replacement) {
  // If original is all caps -> make replacement all caps
  if (original.toUpperCase() === original) return replacement.toUpperCase();
  // If original starts with a capital -> capitalize replacement
  if (original[0] === original[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

function buildReplacers(map) {
  // map: phrase -> abbr
  // Sort by phrase length desc so longer matches happen first
  const entries = Object.entries(map).sort((a,b)=>b[0].length - a[0].length);
  const replacers = entries.map(([phrase,abbr]) => {
    const pattern = new RegExp('\\b' + escapeRegex(phrase) + '\\b', 'gi');
    return { pattern, phrase, abbr };
  });
  return replacers;
}

function abbreviateText(text, replacers) {
  return replacers.reduce((acc, r) => {
    return acc.replace(r.pattern, (match) => preserveCapitalization(match, r.abbr));
  }, text);
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildHighlightPattern(keys) {
  // create a pattern that finds any occurrence of any key inside words or across them
  // we'll join keys with alternation and match case-insensitive
  const parts = keys.map(k => escapeRegex(k));
  // match those parts anywhere (no word boundaries) so substrings count
  return new RegExp('(' + parts.join('|') + ')', 'gi');
}

function renderPreview(original, keys) {
  if (!keys || keys.length === 0) return escapeHtml(original);
  const pat = buildHighlightPattern(keys);
  // escape html then replace matches
  const escaped = escapeHtml(original);
  // because we escaped, matching on escaped text could break; instead, do replacement on original and escape non-matches
  let lastIndex = 0;
  const fragments = [];
  original.replace(pat, (match, g1, offset) => {
    // push text before
    const before = original.slice(lastIndex, offset);
    if (before) fragments.push(escapeHtml(before));
    fragments.push('<mark>' + escapeHtml(match) + '</mark>');
    lastIndex = offset + match.length;
    return match;
  });
  const tail = original.slice(lastIndex);
  if (tail) fragments.push(escapeHtml(tail));
  return fragments.join('');
}

// Wire up UI
let replacers = null;
loadAbbreviations().then(map => {
  replacers = buildReplacers(map);
  // ready for live updates
}).catch(err => {
  console.error(err);
  // if load fails, disable updates by clearing replacers
  replacers = [];
});

// Single input handler: update preview and abbreviated output live
document.getElementById('input').addEventListener('input', () => {
  const input = document.getElementById('input').value;
  const out = abbreviateText(input, replacers || []);
  document.getElementById('output').value = out;
  const keys = Object.keys(replacers ? Object.fromEntries(replacers.map(r=>[r.phrase,r.abbr])) : {});
  document.getElementById('preview').innerHTML = renderPreview(input, keys);
});

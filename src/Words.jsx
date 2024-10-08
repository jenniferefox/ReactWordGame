// Gets the word of the day. Caluclated by taking the modulus of
// # days since an arbitrary point in time (unix epoch) over # words in the
// words list to ensure words are rotated each day.

export {wordOfTheDay, congrats}

function wordOfTheDay() {
  const now = new Date();
  const millisec_in_one_day = 8.64e7
  const fullDaysSinceEpoch = Math.floor(now/millisec_in_one_day);
  return words[fullDaysSinceEpoch % words.length];
  }

function congrats() {
  return congrats_synonyms[(Math.floor(Math.random() * congrats_synonyms.length))]
  };

//List of the most common 5 letter words, obtained using claude.ai.

const words = [
    "which", "there", "their", "about", "would", "these", "other", "words", "could", "write",
    "first", "water", "after", "where", "right", "think", "three", "years", "place", "sound",
    "great", "again", "still", "every", "small", "found", "those", "never", "under", "might",
    "while", "house", "world", "below", "asked", "going", "large", "until", "along", "shall",
    "being", "often", "earth", "began", "since", "study", "night", "light", "above", "paper",
    "parts", "young", "story", "point", "times", "heard", "whole", "white", "given", "means",
    "music", "miles", "thing", "today", "later", "using", "money", "lines", "order", "group",
    "among", "learn", "known", "space", "table", "early", "trees", "short", "hands", "state",
    "black", "shown", "stood", "front", "voice", "kinds", "makes", "comes", "close", "power",
    "lived", "vowel", "taken", "built", "heart", "ready", "quite", "class", "bring", "round",
    "horse", "shows", "piece", "green", "stand", "birds", "start", "river", "tried", "least",
    "field", "whose", "girls", "leave", "added", "color", "third", "hours", "moved", "plant",
    "doing", "names", "forms", "heavy", "ideas", "cried", "check", "floor", "begin", "woman",
    "alone", "plane", "spell", "watch", "carry", "wrote", "clear", "named", "books", "child",
    "glass", "human", "takes", "party", "build", "seems", "blood", "sides", "seven", "mouth",
    "solve", "north", "value", "death", "maybe", "happy", "tells", "gives", "looks", "shape",
    "lives", "steps", "areas", "sense", "speak", "force", "ocean", "speed", "women", "metal",
    "south", "grass", "scale", "cells", "lower", "sleep", "wrong", "pages", "ships", "needs",
    "rocks", "eight", "major", "level", "total", "ahead", "reach", "stars", "store", "sight",
    "terms", "catch", "works", "board", "cover", "songs", "equal", "stone", "waves", "guess",
    "dance", "spoke", "break", "cause", "radio", "weeks", "lands", "basic", "liked", "trade",
    "fresh", "final", "fight", "meant", "drive", "spent", "local", "waxes", "knows", "train",
    "bread", "homes", "teeth", "coast", "thick", "brown", "clean", "quiet", "sugar", "facts",
    "steel", "forth", "rules", "notes", "units", "peace", "month", "verbs", "seeds", "helps",
    "sharp", "visit", "woods", "chief", "walls", "cross", "wings", "grown", "cases", "foods",
    "crops", "fruit", "stick", "wants", "stage", "sheep", "nouns", "plain", "drink", "bones",
    "apart", "turns", "moves", "touch", "angle", "based", "range", "marks", "tired", "older",
    "farms", "spend", "shoes", "goods", "chair", "twice", "cents", "empty", "alike", "style",
    "broke", "pairs", "count", "enjoy", "score", "shore", "roots", "paint", "heads", "shook",
    "serve", "angry", "crowd", "wheel", "quick", "dress", "share", "alive", "noise", "solid",
    "cloth", "signs", "hills", "types", "drawn", "worth", "truck", "piano", "upper", "loved",
    "usual", "faces", "drove", "cabin", "boats", "towns", "proud", "court", "model", "prime",
    "fifty", "plans", "yards", "prove", "tools", "price", "sheet", "smell", "boxes", "raise",
    "match", "truth", "roads", "threw", "enemy", "lunch", "chart", "scene", "graph", "doubt",
    "guide", "winds", "block", "grain", "smoke", "mixed", "games", "wagon", "sweet", "topic",
    "extra", "plate", "title", "knife", "fence", "falls", "cloud", "wheat", "plays", "enter",
    "broad", "steam", "atoms", "press", "lying"];

    const congrats_synonyms = [
      "Amazing",
      "Excellent",
      "Exceptional",
      "Extraordinary",
      "Fabulous",
      "Great",
      "Incredible",
      "Marvelous",
      "Outstanding",
      "Phenomenal",
      "Splendid",
      "Superb",
      "Terrific",
      "Wonderful",
      "Brilliant",
      "Impressive",
      "Remarkable",
      "Stellar",
      "Sublime",
      "Top-notch"
    ];

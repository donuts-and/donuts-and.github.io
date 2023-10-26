let layerBase = [
  ["Q" , "W" , "F" , "P"    , "B"      , null   , null , "J"      , "L"    , "U" , "Y" , "'"],
  ["A" , "R" , "S" , "T:H"  , "G"      , null   , null , "M"      , "N:H"  , "E" , "I" , "O"],
  ["Z" , "X" , "C" , "D"    , "V"      , null   , null , "K"      , "H"    , "," , "." , "/"],
  [null, null, null, "NAV:M", "shift:M", "tab:M", ";:M", "space:M", "SYM:M", null, null, null]
]

let layerNav = [
  ["esc"  , "enter", " "      , " "     , " " , null, null, "pgup", "home"  , "up"  , "end"  , "del"],
  ["alt"  , "gui"  , "shift"  , "ctrl:H", " " , null, null, "pgdn", "left:H", "down", "right", "bksp"],
  ["alt:S", "gui:S", "shift:S", "ctrl:S", " " , null, null, " "   , "S-tab" , "tab" , " "    , " "],
  [null   , null   , null     , "NAV:M" , ":M", ":M", ":M", ":M"  , ":M"    , null  , null   , null]
]

let layerSym = [
  ["!" , "@" , "#" , "$"  , "%" , null, null, "^" , "&"    , "*" , "-" , "="],
  ["1" , "2" , "3" , "4:H", "5" , null, null, "6" , "7:H"  , "8" , "9" , "0"],
  ["[" , "]" , "{" , "}"  , "`" , null, null, "\\", "("    , ")" , "." , "/"],
  [null, null, null, ":M" , ":M", ":M", ":M", ":M", "SYM:M", null, null, null]
]

let layerFun = [
  ["rgb\nsp+", "rgb\nhu+", "rgb\nsa+", "rgb\nva+"  , "rgb\nmod" , null, null, " "   , "F1"   , "F2" , "F3" , "F4"],
  ["rgb\nsp-", "rgb\nhu-", "rgb\nsa-", "rgb\nva-:H", "rgb\nrmod", null, null, "caps", "F5:H" , "F6" , "F7" , "F8"],
  ["alt:S"   , "gui:S"   , "shift:S" , "ctrl:S"    , "rgb\ntog" , null, null, "ins" , "F9"   , "F10", "F11", "F12"],
  [null      , null      , null      , "EXT:M"     , ":M"       , ":M", ":M", ":M"  , "SYM:M", null , null , null]
]

let comboLayer = "base";
let combos = [
  {
    "input": ["D", "H"],
    "output": "ENTER"
  },
  {
    "input": ["W", "F", ",", "."],
    "output": "!"
  },
  {
    "input": ["P", "L"],
    "output": "?"
  },
  {
    "input": [",", "."],
    "output": "-"
  },
  {
    "input": ["H", ","],
    "output": "_"
  },
  {
    "input": [".", "/"],
    "output": "="
  },
  {
    "input": ["Z", "X"],
    "output": "UNDO"
  },
  {
    "input": ["X", "C"],
    "output": "CUT"
  },
  {
    "input": ["C", "D"],
    "output": "COPY"
  },
  {
    "input": ["X", "C", "D"],
    "output": "PASTE"
  },
]

let colClassLeft = ["col-pinky", "col-ring", "col-middle", "col-index", "col-inner", "col-thumb"]
let colClassRight = ["col-thumb", "col-inner", "col-index", "col-middle", "col-ring", "col-pinky"]
let colClass = colClassLeft.concat(colClassRight)
let colHand = ["left", "left", "left", "left", "left", "left", "right", "right", "right", "right", "right", "right"]

let tippyPlacements = ["top", "left", "right", "bottom"]

function getCombos(layer, keyLabel) {
  if (layer !== comboLayer) {
    return []
  }
  let c = [];
  for (let combo of combos) {
    if (combo.input.includes(keyLabel)) {
      c.push(combo)
    }
  }
  return c;
}

function renderLayout(layer, keys) {
  for (let col = 0; col < keys[0].length; col++) {
    let handElement = document.getElementById("layer-" + layer + "-" + colHand[col])
    let colElement = document.createElement("div")
    colElement.className = "col " + colClass[col]
    handElement.append(colElement)
    for (let row = 0; row < keys.length; row++) {
      let key = keys[row][col];
      if (!key) {
        continue
      }
      let tokens = key.split(":")
      let keyLabel = tokens[0]
      let keyMod = tokens[1] || ""
      let keyElement = document.createElement("span")
      keyElement.classList.add("key")
      let key_combos = getCombos(layer, keyLabel);
      if (key_combos.length > 0) {
        keyElement.classList.add("combo")
        for (let i = 0; i < key_combos.length; i++){
          let combo = key_combos[i];
          tippy(keyElement, {
            content: `${combo.input.join("")} combo: ${combo.output}`,
            placement: tippyPlacements[i]
          })
        }
      }
      if (keyMod) {
        keyElement.classList.add(keyMod)
      }
      keyElement.innerText = keyLabel
      colElement.append(keyElement)
    }
  }
}

renderLayout("base", layerBase);
renderLayout("nav", layerNav);
renderLayout("sym", layerSym);
renderLayout("fun", layerFun);

tippy(".S", {
  content: "sticky",
  placement: "bottom"
})


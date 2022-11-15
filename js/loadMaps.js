let modsLoadMappoolView
let beatmapsLoadMappoolView
let allBeatmaps = []
let allBeatmapsDisplay

function loadMaps() {
    let modOrderRequest = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET",`http://localhost:24050${window.location.pathname}modOrder.json`, false);
        xhr.onload = async function xhrLoad()  {
            if (this.status == 200) modsLoadMappoolView = JSON.parse(this.responseText)
            else if (this.status == 404) return
        }
        xhr.send();
        resolve(modsLoadMappoolView);
    })
    modOrderRequest.then((modsLoadMappoolView) => {
        var beatmapRequest = new XMLHttpRequest();
        beatmapRequest.open("GET",`http://localhost:24050${window.location.pathname}beatmaps.json`, false);
        beatmapRequest.onload = function() {
            if (this.status == 404) return;
            beatmapsLoadMappoolView = JSON.parse(this.responseText);
            configureMaps(modsLoadMappoolView, beatmapsLoadMappoolView);
        }
        beatmapRequest.send();
    })
    return;
}

loadMaps()

function configureMaps(mods, beatmaps) {
    // get all maps 
    let filteredBeatmaps = [];
    for (var i = 0; i < beatmaps.length; i++) {
        if (beatmaps[i] && Object.keys(beatmaps[i]).length == 0 && Object.getPrototypeOf(beatmaps[i]) == Object.prototype) continue
        filteredBeatmaps.push(beatmaps[i]);
    }

    for (var i = 0; i < mods.length; i++) allBeatmaps[i] = filteredBeatmaps.filter(x => x.mod.toLowerCase() == mods[i].toLowerCase())
    
    // sort maps by order
    for (var i = 0; i < allBeatmaps.length; i++) allBeatmaps[i].sort((map1, map2) => map1.order - map2.order)

    allBeatmapsDisplay = deepCopy(allBeatmaps);
}

// GET BEATMAPS
var getAllBeatmaps = () => allBeatmapsDisplay

// Sourced From https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e
const deepCopy = (arr) => {
    let copy = [];
    arr.forEach(elem => {
        if (Array.isArray(elem)) copy.push(deepCopy(elem))    
        else {
            if (typeof elem === 'object') copy.push(deepCopyObject(elem))
            else copy.push(elem)
        }
    })
    return copy;
}
// Helper function to deal with Objects
const deepCopyObject = (obj) => {
    let tempObj = {};
    for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) tempObj[key] = deepCopy(value);
        else {
            if (typeof value === 'object') tempObj[key] = deepCopyObject(value);
            else tempObj[key] = value
        }
    }
    return tempObj;
}
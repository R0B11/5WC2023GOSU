let modsLoadMappoolView
let beatmapsLoadMappoolView
let allBeatmaps

function loadMaps() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET",`http://localhost:24050${window.location.pathname}modOrder.json`,true);
    xhr.onload = () => {
        if (this.status == 404) return
        else if (this.status == 200) modsLoadMappoolView = JSON.parse(this.responseText)
    }
    xhr.send();
    let beatmapRequest = new XMLHttpRequest();
    beatmapRequest.open("GET",`http://localhost:24050${window.location.pathname}beatmaps.json`, true);
    beatmapRequest.onload = () => {
        if (this.status == 404) return
        else if (this.status == 200) beatmapsLoadMappoolView = JSON.parse(this.responseText);
    }
    beatmapRequest.send();
    configureMaps(modsLoadMappoolView, beatmapsLoadMappoolView)
}

loadMaps()

function configureMaps(mods, beatmaps) {
    // FILTER MAPS
    let filteredBeatmaps = [];
    for (var i = 0; i < beatmaps.length; i++) {
        if (beatmaps[i] && Object.keys(beatmaps[i]).length == 0 && Object.getPrototypeOf(beatmaps[i]) == Object.prototype) continue
        filteredBeatmaps.push(beatmaps[i]);
    }

    // MAKE MUTLI-DIMENSIONAL ARRAY FOR MODS
    for (var i = 0; i < mods.length; i++) allBeatmaps[i] = filteredBeatmaps.filter(x => x.mod.toLowerCase() == mods[i].toLowerCase())

    // SET MAPS BY ORDER
    for (var i = 0; i < allBeatmaps.length; i++) allBeatmaps[i].sort((map1, map2) => map1.order - map2.order)
}

// GET BEATMAPS
let getAllBeatmaps = () => allBeatmaps

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
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
}
socket.onerror = error => console.log("Socket Error: ", error)

let nowPlayingContainer = document.getElementById("nowPlayingContainer")
let mapTitle = document.getElementById("mapTitle")
let mapDifficulty = document.getElementById("mapDifficulty")

let currentMapWheel = document.getElementById("currentMapWheel");
let mapID;
let currImg;

let currSR;
let currCS;
let currAR;
let currOD;
let currLENms
let currLENs
let tempLENms;
let tempLENs;
let currBPM;
let mapIds;

let mapStatsCS = document.getElementById("mapStatsCSnum");
let mapStatsAR = document.getElementById("mapStatsARnum");
let mapStatsOD = document.getElementById("mapStatsODnum");
let mapStatsLEN = document.getElementById("mapStatsLENnum");
let mapStatsSR = document.getElementById("mapStatsSRnum");
let mapStatsBPM = document.getElementById("mapStatsBPMnum");

let srBar = document.getElementById("mapStatsSRbar");
let arBar = document.getElementById("mapStatsARbar");
let csBar = document.getElementById("mapStatsCSbar");
let odBar = document.getElementById("mapStatsODbar");

let srbarPercent;
let srbarPix;
let arbarPercent;
let arbarPix;
let odbarPercent;
let odbarPix;
let csbarPercent;
let csbarPix;

let allMapSlots = document.getElementsByClassName("mapSlot");
let currentMapSlot = 0;
let mapSlotDifference;
let toMapSlot = 0;
let animTime;
const delay = ms => new Promise(res => setTimeout(res, ms));

let getMaps = new Promise(async (resolve, reject) => {
    let allMaps = getAllBeatmaps();
    console.log(getAllBeatmaps())
    resolve(allMaps); 
})
getMaps.then(allMaps => {
    for (var i = 0; i < allMaps.length; i++) {
        for (var j = 0; j < allMaps[i].length; j++) {
            let newMapTitle = document.createElement("div")
            newMapTitle.setAttribute("id", allMaps[i][j].beatmapID)
            newMapTitle.innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
            
            if (i == 0 && j == 0) newMapTitle.classList.add("current")
            else if (i == 0 && j == 1) newMapTitle.classList.add("below")
            else newMapTitle.classList.add("belowAll")

            currentMapWheel.append(newMapTitle)
        }
    }
})

socket.onmessage = async event => {
    let data = JSON.parse(event.data);
    console.log(data)

    // Now Playing Container Data
    if (mapID !== data.menu.bm.id) {
        mapID = data.menu.bm.id;
        // Map Image
        currImg = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/');
        nowPlayingContainer.style.backgroundImage = `url('http://` + location.host + `/Songs/${currImg}?a=${Math.random(10000)}')`
        // Map Title
        mapTitle.innerText = data.menu.bm.metadata.title;
        if (mapTitle.getBoundingClientRect().width > 324) mapTitle.classList.add("mapInfoWrap")
        else mapTitle.classList.remove("mapInfoWrap")
        // Map Difficulty
        mapDifficulty.innerText = `[ ${data.menu.bm.metadata.difficulty} ]`;
        if (mapDifficulty.getBoundingClientRect().width > 324) mapDifficulty.classList.add("mapInfoWrap")
        else mapDifficulty.classList.remove("mapInfoWrap")

        // Map Slot Scrolling
        // Calculate toMapSlot
        for (var i = 0; i < allMapSlots.length; i++) {
            if (allMapSlots[i].id == mapID) {
                toMapSlot = i;
                break;
            }
        }
        // Calculate difference in number of slots
        mapSlotDifference = Math.abs(currentMapSlot - toMapSlot)
        // Remove All Animation Classes
        function removeAnimationClasses() {
            new Promise((res) => {
                for (var j = 0; j < allMapSlots.length; j++) {
                    allMapSlots[j].classList.remove("fromAboveAllToAbove");
                    allMapSlots[j].classList.remove("fromAboveToCurrent");
                    allMapSlots[j].classList.remove("fromCurrentToBelow");
                    allMapSlots[j].classList.remove("fromBelowToBelowAll");
                    allMapSlots[j].classList.remove("fromBelowAllToBelow");
                    allMapSlots[j].classList.remove("fromBelowToCurrent");
                    allMapSlots[j].classList.remove("fromCurrentToAbove");
                    allMapSlots[j].classList.remove("fromAboveToAboveAll");
                }
                res(allMapSlots)
            })
        }
        // Going Down
        if (currentMapSlot < toMapSlot) {
        
            for (var i = 0; i < mapSlotDifference; i++) {
                await removeAnimationClasses();
                animTime = Math.round(1000 / Math.abs(currentMapSlot - toMapSlot))
                if (document.body.contains(allMapSlots[currentMapSlot - 1])) {
                    allMapSlots[currentMapSlot - 1].classList.remove("above")
                    allMapSlots[currentMapSlot - 1].classList.add("fromAboveToAboveAll")
                    allMapSlots[currentMapSlot - 1].classList.add("aboveAll")
                    allMapSlots[currentMapSlot - 1].style.animationDuration = `${animTime}ms`
                }

                allMapSlots[currentMapSlot].classList.remove("current")
                allMapSlots[currentMapSlot].classList.add("fromCurrentToAbove")
                allMapSlots[currentMapSlot].classList.add("above")
                allMapSlots[currentMapSlot].style.animationDuration = `${animTime}ms`

                if (document.body.contains(allMapSlots[currentMapSlot + 1])) {
                    allMapSlots[currentMapSlot + 1].classList.remove("below")
                    allMapSlots[currentMapSlot + 1].classList.add("fromBelowToCurrent")
                    allMapSlots[currentMapSlot + 1].classList.add("current")
                    allMapSlots[currentMapSlot + 1].style.animationDuration = `${animTime}ms`
                }

                if (document.body.contains(allMapSlots[currentMapSlot + 2])) {
                    allMapSlots[currentMapSlot + 2].classList.remove("belowAll")
                    allMapSlots[currentMapSlot + 2].classList.add("fromBelowAllToBelow")
                    allMapSlots[currentMapSlot + 2].classList.add("below")
                    allMapSlots[currentMapSlot + 2].style.animationDuration = `${animTime}ms`
                }
                await delay(animTime)
                currentMapSlot++
            }
        } else {
            for (var i = 0; i < mapSlotDifference; i++) {
                await removeAnimationClasses()
                animTime = 1000 / Math.abs(currentMapSlot - toMapSlot)
                if (document.body.contains(allMapSlots[currentMapSlot - 2])) {
                    allMapSlots[currentMapSlot - 2].classList.remove("aboveAll")
                    allMapSlots[currentMapSlot - 2].classList.add("fromAboveAllToAbove")
                    allMapSlots[currentMapSlot - 2].classList.add("above")
                    allMapSlots[currentMapSlot - 2].style.animationDuration = `${animTime}ms`
                }

                if (document.body.contains(allMapSlots[currentMapSlot - 1])) {
                    allMapSlots[currentMapSlot - 1].classList.remove("above")
                    allMapSlots[currentMapSlot - 1].classList.add("fromAboveToCurrent")
                    allMapSlots[currentMapSlot - 1].classList.add("current")
                    allMapSlots[currentMapSlot - 1].style.animationDuration = `${animTime}ms`
                }

                allMapSlots[currentMapSlot].classList.remove("current")
                allMapSlots[currentMapSlot].classList.add("fromCurrentToBelow")
                allMapSlots[currentMapSlot].classList.add("below")
                allMapSlots[currentMapSlot].style.animationDuration = `${animTime}ms`

                if (document.body.contains(allMapSlots[currentMapSlot + 1])) {
                    allMapSlots[currentMapSlot + 1].classList.remove("below")
                    allMapSlots[currentMapSlot + 1].classList.add("fromBelowToBelowAll")
                    allMapSlots[currentMapSlot + 1].classList.add("belowAll")
                    allMapSlots[currentMapSlot + 1].style.animationDuration = `${animTime}ms`
                }

                await delay(animTime)
                currentMapSlot--
            }
        }
    }

    // SR, CS, AR, OD
    if (currSR !== data.menu.bm.stats.SR) {
        currSR = data.menu.bm.stats.SR;
        mapStatsSR.innerText = currSR;
        if (currSR > 4) {
            srbarPercent = (currSR - 4) / 3.1;
            srbarPix = srbarPercent * 352;
            srBar.style.width = `${srbarPix}px`;
        }
        else {
            srBar.style.width = `0px`;
        }
    }
    if (currCS !== data.menu.bm.stats.CS) {
        currCS = data.menu.bm.stats.CS;
        mapStatsCS.innerText = currCS;
        csbarPercent = (currCS - 2) / 5.15;
        csbarPix = csbarPercent * 352;
        csBar.style.width = `${csbarPix}px`;
    }
    if (currAR !== data.menu.bm.stats.AR) {
        currAR = data.menu.bm.stats.AR;
        mapStatsAR.innerText = currAR;
        arbarPercent = (currAR - 5) / 5.2;
        arbarPix = arbarPercent * 352;
        arBar.style.width = `${arbarPix}px`;
    }
    if (currOD !== data.menu.bm.stats.OD) {
        currOD = data.menu.bm.stats.OD
        mapStatsOD.innerText = currOD;
        odbarPercent = (currOD - 5) / 5;
        odbarPix = odbarPercent * 352;
        odBar.style.width = `${odbarPix}px`;
    }

    // Length
    if (currLENms !== data.menu.bm.time.full) {
        // Get Time in MS
        currLENms = data.menu.bm.time.full;
        tempLENms = (data.menu.mods.str.includes("DT")) ? currLENms / 3 * 2 : currLENms;
        // Get Time in S and apply
        tempLENs = tempLENms / 1000;
        currLENs = `${(Math.floor(tempLENs / 60))}:${("0" + Math.floor(tempLENs % 60)).slice(-2)}`;
        mapStatsLEN.innerText = currLENs;
    }

    // BPM
    if (Math.abs(data.menu.bm.stats.BPM.min - data.menu.bm.stats.BPM.max) !== 0){ 
        if (currBPM !== `${data.menu.bm.stats.BPM.min} - ${data.menu.bm.stats.BPM.max}`) {
            currBPM = `${data.menu.bm.stats.BPM.min} - ${data.menu.bm.stats.BPM.max}`;
            mapStatsBPM.innerText = currBPM;
            console.log(currBPM !== `${data.menu.bm.stats.BPM.min} - ${data.menu.bm.stats.BPM.max}`);
        }
    } 
    else if (currBPM !== data.menu.bm.stats.BPM.min) {
        currBPM = data.menu.bm.stats.BPM.min;
        mapStatsBPM.innerText = currBPM;
    }

}
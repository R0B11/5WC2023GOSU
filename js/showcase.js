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

let mapFound = false
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

let replayerName
let replayer = document.getElementById("replayer")
let allMaps;

let comments = document.getElementById("comments")

let getMaps = new Promise(async (resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET",`http://localhost:24050/5WC2023GOSU/data/showcaseBeatmaps.json`, false);
    xhr.onload = function xhrLoad()  {
        if (this.status == 404) return
        if (this.status == 200) allMaps = JSON.parse(this.responseText)
    }
    xhr.send();
    resolve(allMaps); 
})
getMaps.then(allMaps => {
    for (var i = 0; i < allMaps.length; i++) {
        let newMapTitle = document.createElement("div")
        console.log(allMaps[i])
        let newSongName = allMaps[i].songName.replace(" ","_")
        let newSongDifficulty = allMaps[i].difficulty.replace(" ","_")
        newMapTitle.setAttribute("id", `${newSongName}_${newSongDifficulty}`)
        newMapTitle.innerText = `${allMaps[i].modid.toUpperCase()}`
        newMapTitle.classList.add("mapSlot")

        if (i == 0) newMapTitle.classList.add("current")
        else if (i == 1) newMapTitle.classList.add("below")
        else newMapTitle.classList.add("belowAll")

        currentMapWheel.append(newMapTitle)
    }
})

socket.onmessage = async event => {
    let data = JSON.parse(event.data);
    console.log(data)
<<<<<<< HEAD

=======
    console.log(data.gameplay.name)
>>>>>>> 2c7276316cef05fda59e84e00630324bbb4e70b7
    // Now Playing Container Data
    if (mapID !== data.menu.bm.id || mapTitle.innerText !== data.menu.bm.metadata.title) {
        mapFound = false
        mapID = data.menu.bm.id;
        // Map Image
        currImg = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/').replace(/'/g, "\\'");
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
            let currentSongName = data.menu.bm.metadata.title.replace(" ","_")
            let currentSongDifficulty = data.menu.bm.metadata.difficulty.replace(" ", "_")
            if (allMapSlots[i].id == `${currentSongName}_${currentSongDifficulty}`) {
                toMapSlot = i;
                mapFound = true
                
                // SR
                currSR = allMaps[i].sr
                currSR = Math.round(currSR * 100) / 100
                srbarPercent = (currSR - 4) / 3.1
                srbarPix = srbarPercent * 352
                srBar.style.width = `${srbarPix}px`
                mapStatsSR.innerText = currSR
                // CS
                currCS = allMaps[i].cs
                currCS = Math.round(currCS * 10) / 10
                csbarPercent = (currCS - 2) / 5.15
                csbarPix = csbarPercent * 352
                csBar.style.width = `${csbarPix}px`
                mapStatsCS.innerText = currCS
                // AR
                currAR = allMaps[i].ar
                currAR = Math.round(currAR * 10) / 10
                arbarPercent = (currAR - 5) / 5.2
                arbarPix = arbarPercent * 352
                arBar.style.width = `${arbarPix}px`
                mapStatsAR.innerText = currAR
                // OD
                currOD = allMaps[i].od
                currOD = Math.round(currOD * 10) / 10
                odbarPercent = (currOD - 5) / 5
                odbarPix = odbarPercent * 352
                odBar.style.width = `${odbarPix}px`
                mapStatsOD.innerText = currOD
                // LEN
                tempLENs = allMaps[i].len
                currLENs = `${(Math.floor(tempLENs / 60))}:${("0" + Math.floor(tempLENs % 60)).slice(-2)}`;
                mapStatsLEN.innerText = currLENs;
                // BPM
                currBPM = allMaps[i].bpm
                mapStatsBPM.innerText = currBPM
                // Comment
                comments.innerText = allMaps[i].comment
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
    if (!mapFound) {
        if (currSR !== data.menu.bm.stats.fullSR) {
            currSR = data.menu.bm.stats.fullSR;
            mapStatsSR.innerText = currSR;
            if (currSR > 4) {
                srbarPercent = (currSR - 4) / 3.1;
                srbarPix = srbarPercent * 352;
                srBar.style.width = `${srbarPix}px`;
            }
            else srBar.style.width = `0px`;
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
    // Replayer Name
    if (replayerName !== data.gameplay.name) {
        replayerName = data.gameplay.name
        replayer.innerText = replayerName
    }
}
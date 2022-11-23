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

let mapID;
let currImg;

socket.onmessage = event => {
    let data = JSON.parse(event.data);

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
    }
}


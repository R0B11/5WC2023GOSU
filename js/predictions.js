const predictionTeams = ["Argentina","Australia","Austria","Belgium","Brazil","Canada","Chile","China","Colombia","Czech Republic","Denmark", "Estonia","Finland","France","Germany","Hong Kong","Indonesia","Israel","Italy","Japan","Kazakhstan","Latvia","Lithuania","Malaysia","Mexico","Nepal","Netherlands","New Zealand","Peru", "Philippines", "Poland","Portugal","Réunion", "Romania","Russian Federation", "Singapore","Slovakia","South Korea", "Spain", "Sweden", "Taiwan", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"];

let currentTeamLocation = 0
let setTeamName = document.getElementById("currentTeamName");
let setTeamFlag = document.getElementById("currentTeamFlag");

setTeamName.innerText = predictionTeams[currentTeamLocation];
setTeamFlag.style.backgroundImage = `url("static/flags/${predictionTeams[currentTeamLocation]}.png")`;


function teamDisplayleft(){
    currentTeamLocation = currentTeamLocation - 1;
    if (currentTeamLocation < 0) {currentTeamLocation = (predictionTeams.length - 1)};
    setTeamName.innerText = predictionTeams[currentTeamLocation];
    setTeamFlag.style.backgroundImage = `url("static/flags/${predictionTeams[currentTeamLocation]}.png")`;
}
function teamDisplayright(){
    currentTeamLocation = currentTeamLocation + 1;
    if (currentTeamLocation > (predictionTeams.length - 1)) {currentTeamLocation = 0};
    setTeamName.innerText = predictionTeams[currentTeamLocation];
    setTeamFlag.style.backgroundImage = `url("static/flags/${predictionTeams[currentTeamLocation]}.png")`;
}

let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws");
let currentSongImage = document.getElementById("currentSongImage");
let currentSongName = document.getElementById("currentSongName");
let currentSongArtist = document.getElementById("currentSongArtist");
let currentSongID;

socket.onopen = () => console.log("Successfully Connected");
socket.onerror = error => console.log("Socket Error: ", error);
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if (currentSongID !== data.menu.bm.id) {
        currentSongID = data.menu.bm.id
        currentSongImage.style.backgroundImage =  `url("https://assets.ppy.sh/beatmaps/${data.menu.bm.set}/covers/cover.jpg")`
        currentSongTitle.innerText = data.menu.bm.metadata.title
        currentSongArtist.innerText = data.menu.bm.metadata.artist

        console.log(currentSongTitle.getBoundingClientRect().width)
        console.log(currentSongArtist.getBoundingClientRect().width)
        if (currentSongTitle.getBoundingClientRect().width > 323) currentSongTitle.classList.add("currentSongTextWrap")
        else currentSongTitle.classList.remove("currentSongTextWrap")

        if (currentSongArtist.getBoundingClientRect().width > 323) currentSongArtist.classList.add("currentSongTextWrap")
        else currentSongArtist.classList.remove("currentSongTextWrap")
    }
    
    console.log(data)
}
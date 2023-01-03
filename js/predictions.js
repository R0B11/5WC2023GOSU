
const predictionTeams = ["Argentina","Australia","Austria","Belgium","Brazil","Canada","Chile","China","Colombia","Czech Republic","Denmark", "Estonia","Finland","France","Germany","Hong Kong","Indonesia","Israel","Italy","Kazakhstan","Latvia","Lithuania","Malaysia","Mexico","Nepal","Netherlands","Peru", "Philippines", "Poland","Portugal","Réunion", "Romania","Russian Federation", "Singapore","Slovakia","South Korea", "Spain", "Sweden", "Taiwan", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"];

let currentTeamLocation = 0
let setTeamName = document.getElementById("currentTeamName");
let setTeamFlag = document.getElementById("currentTeamFlag")

setTeamName.innerText = predictionTeams[currentTeamLocation];
setTeamFlag.style.backgroundImage = `url("static/flags/${predictionTeams[currentTeamLocation]}.png")`;



function teamDisplayleft(){

    currentTeamLocation = currentTeamLocation - 1;
    if (currentTeamLocation < 0) {currentTeamLocation = (predictionTeams.length -1)};
    setTeamName.innerText = predictionTeams[currentTeamLocation];
    setTeamFlag.style.backgroundImage = `url("../static/flags/${predictionTeams[currentTeamLocation]}.png")`;

}
function teamDisplayright(){
    
    currentTeamLocation = currentTeamLocation + 1;
    if (currentTeamLocation > (predictionTeams.length - 1)) {currentTeamLocation = 0};
    setTeamName.innerText = predictionTeams[currentTeamLocation];
    setTeamFlag.style.backgroundImage = `url("../static/flags/${predictionTeams[currentTeamLocation]}.png")`;

}

let teamStatsTextArea = document.getElementById("teamStatsTextArea")
let teamStatsMakerDiv = document.getElementById("teamStatsMaker")
let teamStatsMakerButton = document.getElementById("teamStatsMakerButton")

function teamStatsMaker() {
    let teamStatsTeamSplit = teamStatsTextArea.value.split("\n")
    let hasInformation = false;
    let error = false;
    let errorMessage = "";
    let arrayOfTeams = [];

    for (var i = 0; i < teamStatsTeamSplit.length; i++) {
        if (teamStatsTeamSplit[i].trim() == "") continue
        hasInformation = true;
        let teamStatsItemSplit = teamStatsTeamSplit[i].split("//")
        for (var j = 0; j < teamStatsItemSplit.length; j++) teamStatsItemSplit[j] = teamStatsItemSplit[j].trim()
        for (var j = 1; j <= 7; j++) teamStatsItemSplit[j] = Math.round((parseFloat(teamStatsItemSplit[j]) + Number.EPSILON) * 10) / 10
        if (teamStatsItemSplit.length < 14) {
            errorMessage += `You are missing some key information for team: ${teamStatsItemSplit[0]}.\n`
            error = true
        }

        let teamStatsObj = {
            countryName: teamStatsItemSplit[0],
            aim: teamStatsItemSplit[1],
            speed: teamStatsItemSplit[2],
            stamina: teamStatsItemSplit[3],
            fingerControl: teamStatsItemSplit[4],
            precision: teamStatsItemSplit[5],
            reading: teamStatsItemSplit[6],
            tech: teamStatsItemSplit[7],
            captain: teamStatsItemSplit[8],
            player2: teamStatsItemSplit[9],
            player3: teamStatsItemSplit[10],
            player4: teamStatsItemSplit[11],
            player5: teamStatsItemSplit[12],
            player6: teamStatsItemSplit[13]
        }

        if (typeof teamStatsItemSplit[14] !== undefined) teamStatsObj.player7 = teamStatsItemSplit[14]
        if (typeof teamStatsItemSplit[15] !== undefined) teamStatsObj.player8 = teamStatsItemSplit[15]

        arrayOfTeams.push(teamStatsObj)
    }
    if (!hasInformation) { alert("Please put in some information!"); return; }
    if (error) { 
        errorMessage += "Please look at the format that you are required to put the information in."
        alert(errorMessage); 
        return; 
    }

    const teamStatsDL = "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(arrayOfTeams));
    let download = document.createElement("a");
    download.setAttribute("href", teamStatsDL)
    download.setAttribute("download", "teamStats.json")
    download.innerText = "here";
    
    let confirmLink = document.createElement("div")
    confirmLink.innerText = "The download has already started. If it hasn't, you can download it by clicking ";
    confirmLink.append(download)

    teamStatsMakerDiv.append(document.createElement("br"))
    teamStatsMakerDiv.append(document.createElement("br"))
    teamStatsMakerDiv.append(confirmLink)
}
let teamStatsTextArea = document.getElementById("teamStatsTextArea")
let teamStatsMakerDiv = document.getElementById("teamStatsMaker")
let teamStatsMakerButton = document.getElementById("teamStatsMakerButton")

function teamStatsMaker() {
    let teamStatsTeamSplit = teamStatsTextArea.value.split("\n")
    let hasInformation = false;
    let error = false
    let errorMessage = ""
    let arrayOfTeams = []

    for (var i = 0; i < teamStatsTeamSplit.length; i++) {
        if (teamStatsTeamSplit[i].trim() == "") continue
        hasInformation = true;
        let teamStatsItemSplit = teamStatsTeamSplit[i].split("//")
        let teamStatItemSplitOriginal = teamStatsTeamSplit[i].split("//")
        for (var j = 0; j < teamStatsItemSplit.length; j++) teamStatsItemSplit[j] = teamStatsItemSplit[j].trim()
        for (var j = 2; j <= 8; j++) teamStatsItemSplit[j] = Math.round((parseFloat(teamStatsItemSplit[j]) + Number.EPSILON) * 10) / 10
        for (var j = 1; j <= 8; j++) {
            if (!teamStatItemSplitOriginal[j]) continue;
            if (isNaN(teamStatsItemSplit[j])) {
                errorMessage += `Item ${j + 1} for Country ${teamStatsItemSplit[0]} is not being counted as a number.\n`
                error = true
            }
        }
        if (teamStatsItemSplit.length < 15) {
            errorMessage += `You are missing some key information for team: ${teamStatsItemSplit[0]}.\n`
            error = true
        }

        let teamStatsObj = {
            countryName: teamStatsItemSplit[0],
            seed: teamStatsItemSplit[1],
            aim: teamStatsItemSplit[2],
            speed: teamStatsItemSplit[3],
            stamina: teamStatsItemSplit[4],
            fingerControl: teamStatsItemSplit[5],
            precision: teamStatsItemSplit[6],
            reading: teamStatsItemSplit[7],
            tech: teamStatsItemSplit[8],
            captain: teamStatsItemSplit[9],
            player2: teamStatsItemSplit[10],
            player3: teamStatsItemSplit[11],
            player4: teamStatsItemSplit[12],
            player5: teamStatsItemSplit[13],
            player6: teamStatsItemSplit[14]
        }

        if (typeof teamStatsItemSplit[15] !== undefined) teamStatsObj.player7 = teamStatsItemSplit[15]
        if (typeof teamStatsItemSplit[16] !== undefined) teamStatsObj.player8 = teamStatsItemSplit[16]

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

    download.click()
}
"use strict";

let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws");
let mapid = document.getElementById('mapid');

// NOW PLAYING
let mapContainer = document.getElementById("mapContainer");
let mapTitleWrapper = document.getElementById("mapTitleWrapper");
let mapTitleWrapper2 = document.getElementById("mapTitleWrapper2");
let mapTitle = document.getElementById("mapTitle");
let mapTitle1 = document.getElementById("mapTitle1");
let mapTitle2 = document.getElementById("mapTitle2");

// TEAM NAME
let teamBlueName = document.getElementById("teamBlueName");
let teamPurpleName = document.getElementById("teamPurpleName");
let teamNames = document.getElementsByClassName("teamNames");

let winnerName = document.getElementById("winnerName");

// TEAM STATS
let blueTeamStatsAimNum = document.getElementById("blueTeamStatsAimNum")
let blueTeamStatsSpeedNum = document.getElementById("blueTeamStatsSpeedNum")
let blueTeamStatsStaminaNum = document.getElementById("blueTeamStatsStaminaNum")
let blueTeamStatsFingerControlNum = document.getElementById("blueTeamStatsFingerControlNum")
let blueTeamStatsPrecisionNum = document.getElementById("blueTeamStatsPrecisionNum")
let blueTeamStatsReadingNum = document.getElementById("blueTeamStatsReadingNum")
let blueTeamStatsTechNum = document.getElementById("blueTeamStatsTechNum")
let purpleTeamStatsAimNum = document.getElementById("purpleTeamStatsAimNum")
let purpleTeamStatsSpeedNum = document.getElementById("purpleTeamStatsSpeedNum")
let purpleTeamStatsStaminaNum = document.getElementById("purpleTeamStatsStaminaNum")
let purpleTeamStatsFingerControlNum = document.getElementById("purpleTeamStatsFingerControlNum")
let purpleTeamStatsPrecisionNum = document.getElementById("purpleTeamStatsPrecisionNum")
let purpleTeamStatsReadingNum = document.getElementById("purpleTeamStatsReadingNum")
let purpleTeamStatsTechNum = document.getElementById("purpleTeamStatsTechNum")

// TEAM STATS BARS
let blueTeamStatsAimBar = document.getElementById("blueTeamStatsAimBar")
let blueTeamStatsSpeedBar = document.getElementById("blueTeamStatsSpeedBar")
let blueTeamStatsStaminaBar = document.getElementById("blueTeamStatsStaminaBar")
let blueTeamStatsFingerControlBar = document.getElementById("blueTeamStatsFingerControlBar")
let blueTeamStatsPrecisionBar = document.getElementById("blueTeamStatsPrecisionBar")
let blueTeamStatsReadingBar = document.getElementById("blueTeamStatsReadingBar")
let blueTeamStatsTechBar = document.getElementById("blueTeamStatsTechBar")
let purpleTeamStatsAimBar = document.getElementById("purpleTeamStatsAimBar")
let purpleTeamStatsSpeedBar = document.getElementById("purpleTeamStatsSpeedBar")
let purpleTeamStatsStaminaBar = document.getElementById("purpleTeamStatsStaminaBar")
let purpleTeamStatsFingerControlBar = document.getElementById("purpleTeamStatsFingerControlBar")
let purpleTeamStatsPrecisionBar = document.getElementById("purpleTeamStatsPrecisionBar")
let purpleTeamStatsReadingBar = document.getElementById("purpleTeamStatsReadingBar")
let purpleTeamStatsTechBar = document.getElementById("purpleTeamStatsTechBar")

// TEAM PLAYER NAMES
let teamNameBluePlayer1 = document.getElementById("teamNameBluePlayer1")
let teamNameBluePlayer2 = document.getElementById("teamNameBluePlayer2")
let teamNameBluePlayer3 = document.getElementById("teamNameBluePlayer3")
let teamNameBluePlayer4 = document.getElementById("teamNameBluePlayer4")
let teamNameBluePlayer5 = document.getElementById("teamNameBluePlayer5")
let teamNameBluePlayer6 = document.getElementById("teamNameBluePlayer6")
let teamNameBluePlayer7 = document.getElementById("teamNameBluePlayer7")
let teamNameBluePlayer8 = document.getElementById("teamNameBluePlayer8")
let teamNamePurplePlayer1 = document.getElementById("teamNamePurplePlayer1")
let teamNamePurplePlayer2 = document.getElementById("teamNamePurplePlayer2")
let teamNamePurplePlayer3 = document.getElementById("teamNamePurplePlayer3")
let teamNamePurplePlayer4 = document.getElementById("teamNamePurplePlayer4")
let teamNamePurplePlayer5 = document.getElementById("teamNamePurplePlayer5")
let teamNamePurplePlayer6 = document.getElementById("teamNamePurplePlayer6")
let teamNamePurplePlayer7 = document.getElementById("teamNamePurplePlayer7")
let teamNamePurplePlayer8 = document.getElementById("teamNamePurplePlayer8")

let teamNameBluePlayer1Temp
let teamNameBluePlayer2Temp
let teamNameBluePlayer3Temp
let teamNameBluePlayer4Temp
let teamNameBluePlayer5Temp
let teamNameBluePlayer6Temp
let teamNameBluePlayer7Temp
let teamNameBluePlayer8Temp

let teamNamePurplePlayer1Temp
let teamNamePurplePlayer2Temp
let teamNamePurplePlayer3Temp
let teamNamePurplePlayer4Temp
let teamNamePurplePlayer5Temp
let teamNamePurplePlayer6Temp
let teamNamePurplePlayer7Temp
let teamNamePurplePlayer8Temp

let winnerRoster1 = document.getElementById("winnerRoster1")
let winnerRoster2 = document.getElementById("winnerRoster2")
let winnerRoster3 = document.getElementById("winnerRoster3")
let winnerRoster4 = document.getElementById("winnerRoster4")
let winnerRoster5 = document.getElementById("winnerRoster5")
let winnerRoster6 = document.getElementById("winnerRoster6")
let winnerRoster7 = document.getElementById("winnerRoster7")
let winnerRoster8 = document.getElementById("winnerRoster8")

// SEEDS
let blueTeamSeedNumber = document.getElementById("blueTeamSeedNumber")
let purpleTeamSeedNumber = document.getElementById("purpleTeamSeedNumber")

// MOVING SCORE BAR
let movingScoreBars = document.getElementById("movingScoreBars");
let movingScoreBarBlue = document.getElementById("movingScoreBarBlue");
let movingScoreBarPurple = document.getElementById("movingScoreBarPurple");

// SCORE DIFFERENCE
let playScoreDifferenceLeftArrow = document.getElementById("playScoreDifferenceLeftArrow")
let playScoreDifferenceRightArrow = document.getElementById("playScoreDifferenceRightArrow")
let playScoreDifferenceScore = document.getElementById("playScoreDifferenceScore")
let playScoreDifference = document.getElementById("playScoreDifference")

// STAR VISIBILITY
let scoreBlue = document.getElementById("scoreBlue");
let scorePurple = document.getElementById("scorePurple");
let blueStars = scoreBlue.getElementsByClassName("star");
let purpleStars = scorePurple.getElementsByClassName("star");
let teamBlue = document.getElementById("teamBlue");
let teamPurple = document.getElementById("teamPurple");
let starToggle = document.getElementById("starToggle");
let starToggleState = true;

// STAR CONTROL
let blueStarControlPlus = document.getElementById("blueStarControlPlus");
let blueStarControlSubtract = document.getElementById("blueStarControlSubtract");
let purpleStarControlPlus = document.getElementById("purpleStarControlPlus");
let purpleStarControlSubtract = document.getElementById("purpleStarControlSubtract");

// TOURNEY CONTROL
let ipcState;
let pointAwarded;

// TEAM PLAYING SCORE
let playScoreBlue = document.getElementById("playScoreBlue");
let playScorePurple = document.getElementById("playScorePurple");

// GRAPHIC COMPONENTS
let bottom = document.getElementById("bottom");

// CHATS
let chats = document.getElementById("chats");

// FLAGS
let teamPurpleFlag = document.getElementById("teamPurpleFlag");
let teamBlueFlag = document.getElementById("teamBlueFlag");
let teamFlags = document.getElementsByClassName("teamFlags");

let winnerFlag = document.getElementById("winnerFlag");

// MAP STATS
let currentMap
let clickedMapID
let nowPlayingContainer = document.getElementById("nowPlayingContainer");
let mapStatsCS = document.getElementById("mapStatsCS");
let mapStatsAR = document.getElementById("mapStatsAR");
let mapStatsOD = document.getElementById("mapStatsOD");
let mapStatsLEN = document.getElementById("mapStatsLEN");
let mapStatsSR = document.getElementById("mapStatsSR");
let mapStatsBPM = document.getElementById("mapStatsBPM");
let mapStatsTop = document.getElementsByClassName("mapStatsTop");
let mapStatsBot = document.getElementsByClassName("mapStatsBot")

// MAP PICKS
let mapPickCardsBlue = document.getElementById("mapPickCardsBlue");
let mapPickCardsPurple = document.getElementById("mapPickCardsPurple");
let mapChoices = document.getElementById("mapChoices")

// TOP SECTION
let topSection = document.getElementById("top");
let gameplaySection = document.getElementById("gameplay");
let gameplayNames = document.getElementById("gameplayNames")
let gameplayName1 = document.getElementById("gameplayName1")
let gameplayName2 = document.getElementById("gameplayName2")
let gameplayName3 = document.getElementById("gameplayName3")
let gameplayName4 = document.getElementById("gameplayName4")
let gameplayName5 = document.getElementById("gameplayName5")
let gameplayName6 = document.getElementById("gameplayName6")
let gameplayName7 = document.getElementById("gameplayName7")
let gameplayName8 = document.getElementById("gameplayName8")
let playerSlotName1;
let playerSlotName2;
let playerSlotName3;
let playerSlotName4;
let playerSlotName5;
let playerSlotName6;
let playerSlotName7;
let playerSlotName8;

// SPONSORS
let sponsor = document.getElementById("sponsor")
let mappoolSponsor = document.getElementById("mappoolSponsor")

// PROTECTS AND BANS
let protectCardBlue = document.getElementById("protectCardBlue")
let protectCardPurple = document.getElementById("protectCardPurple")
let protectCardBlueText = document.getElementById("protectCardBlueText")
let protectCardPurpleText = document.getElementById("protectCardPurpleText")
let banCard = document.getElementsByClassName("banCard")
let banCards = document.getElementById("banCards")
let banCardBlue = document.getElementsByClassName("banCardBlue")
let banCardPurple = document.getElementsByClassName("banCardPurple")
let protectCardBlueID
let protectCardPurpleID
let banCardBlueIDs = new Array()
let banCardPurpleIDs = new Array()
let pickCardBlueIDs = new Array()
let pickCardPurpleIDs = new Array()

// ROLL WINNER
let setRollWinner = document.getElementById("setRollWinner")

// RESET BUTTONS
let resetButtonPicks = document.getElementById("resetButtonPicks")
let resetButtonBans = document.getElementById("resetButtonBans")
let resetButtonProtects = document.getElementById("resetButtonProtects")
let resetButtonPicksConfirm = document.getElementById("resetButtonPicksConfirm")
let resetButtonBansConfirm = document.getElementById("resetButtonBansConfirm")
let resetButtonProtectsConfirm = document.getElementById("resetButtonProtectsConfirm")

// MAPPOOL PAGE
let mappool = document.getElementById("mappool")

// SETTING CHANGES
let mapControl = document.getElementById("mapControl")
let setActionElement = document.getElementById("setAction")
let setTeamOptions = document.getElementById("selectTeamOptions")
let currentActionMapControl;
let currentTeamMapControl;
let currentMapMapControl;
let currentSlotMapControl;
let currentSlotNumberMapControl;

let warmupState = 0;

let winScreen = document.getElementById("winScreen");

let winVideoBlue = document.getElementById("winVideoBlue")
let winVideoPurple = document.getElementById("winVideoPurple")
let winVideoText = document.getElementById("winVideoText")

socket.onopen = () => console.log("Successfully Connected");
socket.onerror = error => console.log("Socket Error: ", error);

let animation = {
    playScoreBlue:  new CountUp('playScoreBlue', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    playScorePurple:  new CountUp('playScorePurple', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
	playScoreDifference:  new CountUp('playScoreDifferenceScore', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
}

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

let previousBestOfTemp = 0;
let bestOfTemp = 5;
let scoreVisibleTemp;
let starsVisibleTemp;

let tempMapID;
let tempImg;
let tempMapName;
let tempMapDiff;
let tempMapStatsCS;
let tempMapStatsAR;
let tempMapStatsOD;
let tempMapStatsLEN;
let tempMapStatsSR;
let tempMapStatsBPM;
let foundMapFromMappool;

let blueTeamSeedNum
let purpleTeamSeedNum
let blueTeamStatsAim
let blueTeamStatsSpeed
let blueTeamStatsStamina
let blueTeamStatsFingerControl
let blueTeamStatsPrecision
let blueTeamStatsReading
let blueTeamStatsTech
let purpleTeamStatsAim
let purpleTeamStatsSpeed
let purpleTeamStatsStamina
let purpleTeamStatsFingerControl
let purpleTeamStatsPrecision
let purpleTeamStatsReading
let purpleTeamStatsTech

let scoreBlueTemp = 0
let scorePurpleTemp = 0
let teamNameBlueTemp;
let teamNamePurpleTemp;
let gameState;
let isFreemod = true;

let playScoreBlueTemp = 0
let playScorePurpleTemp = 0
let playScoreDifferenceTemp = 0

let numOfClients
let starEvent 

let chatLen = 0;
let tempClass = 'unknown';

let nextAction = document.getElementById("nextAction");
let roundText = document.getElementById("round");
let allMaps = getAllBeatmaps();
let allTeams = getAllTeams();

let protectTotalNum = 1
let banTotalNum = 0
let banProtectNum = 0
let blueProtectNum  = 0
let purpleProtectNum = 0
let banNum = 0

let viewState = 0

playScoreDifferenceLeftArrow.style.opacity = 0;
playScoreDifferenceRightArrow.style.opacity = 0;

for (var i = 0; i < allMaps.length; i++) {
	for (var j = 0; j < allMaps[i].length; j++) {
		let mapChoicesButton = document.createElement("button")
		mapChoicesButton.innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
		mapChoicesButton.setAttribute("id", `${allMaps[i][j].beatmapID}Button`)
		mapChoicesButton.addEventListener("click", mapClickEvent)
		mapChoices.append(mapChoicesButton)
	}
}

socket.onmessage = async event => {
    let data = JSON.parse(event.data);

	// SCore and Star Visibility
	if(scoreVisibleTemp !== data.tourney.manager.bools.scoreVisible) {
		scoreVisibleTemp = data.tourney.manager.bools.scoreVisible;
		if(scoreVisibleTemp) {
			// Score visible -> Set bg bottom to full
			movingScoreBars.style.opacity = 1;
			chats.style.opacity = 0;
			playScoreBlue.style.opacity = 1;
			playScorePurple.style.opacity = 1;
			playScoreDifference.style.opacity = 1;
		} else {
			// Score invisible -> Set bg to show chats
			movingScoreBars.style.opacity = 0;
			chats.style.opacity = 1;
			playScoreBlue.style.opacity = 0;
			playScorePurple.style.opacity = 0;
			playScoreDifference.style.opacity = 0;
		}
	}
	if(starsVisibleTemp !== starToggleState) {
		starsVisibleTemp = starToggleState;
		if(starsVisibleTemp) {
			scoreBlue.style.display = "flex";
			scorePurple.style.display = "flex";
			for (var i = 0; i < blueStars.length; i++) {
				blueStars[i].style.opacity = 1;
				purpleStars[i].style.opacity = 1
				await new Promise(r => setTimeout(r, 500));
			}
		} else {
			for (var i = blueStars.length - 1; i >= 0; i--) {
				blueStars[i].style.opacity = 0;
				purpleStars[i].style.opacity = 0;
				await new Promise(r => setTimeout(r, 500));
			}
			scorePurple.style.display = "none";
			scoreBlue.style.display = "none";
		}
	}
	// Getting maps
	if (tempMapID !== data.menu.bm.id) {
		// MAP ID
		tempMapID = data.menu.bm.id
		// MAP MAIN SECTION
		tempImg = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/').replace(/'/g, "\\'");
		mapContainer.style.backgroundImage = `url('http://` + location.host + `/Songs/${tempImg}?a=${Math.random(10000)}')`;
		console.log(mapContainer.style.backgroundImage);
		
		// MAP TEXT
		let replaceText = new Promise((resolve, reject) => {
			let tempMapTitle = `${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title} [${data.menu.bm.metadata.difficulty}]`.replaceAll("(", "( ").replaceAll(")", " )").replaceAll("[", "[ ").replaceAll("]", " ]")
			mapTitle.innerText = tempMapTitle;
			mapTitle1.innerText = tempMapTitle;
			mapTitle2.innerText = tempMapTitle;
			resolve(mapTitle.innerText)
		})
		replaceText.then(function() {
			if (mapTitle1.clientWidth > 378 || mapTitle.clientWidth > 328 ) {
				mapTitleWrapper.style.display = "none";
				mapTitleWrapper2.style.display = "block"

				// Client Width, Divide 175 and * 6 for default seconds (175px for 6 seconds), and then get the milliseconds. 
				let mapTitleScrollTime = Math.round(mapTitle1.clientWidth / 175 * 6 * 1000)
				mapTitle1.style.animationDuration = `${mapTitleScrollTime}ms`
				mapTitle2.style.animationDuration = `${mapTitleScrollTime}ms`
				mapTitle2.style.animationDelay = `${mapTitleScrollTime / 2}ms`
			} else {
				mapTitleWrapper.style.display = "block";
				mapTitleWrapper2.style.display = "none"
			}
		})

		// MAP STATS
		foundMapFromMappool = false;
		for (var i = 0; i < allMaps.length; i++) {
			for (var j = 0; j < allMaps[i].length; j++) {
					if (allMaps[i][j].beatmapID == data.menu.bm.id && !pickCardBlueIDs.includes(allMaps[i][j].beatmapID) && !pickCardPurpleIDs.includes(allMaps[i][j].beatmapID) ) {
						currentMap = allMaps[i][j];
						foundMapFromMappool = true;
						tempMapStatsCS = Math.round((parseFloat(currentMap.cs) + Number.EPSILON) * 10) / 10
						tempMapStatsAR = Math.round((parseFloat(currentMap.ar) + Number.EPSILON) * 10) / 10
						tempMapStatsOD = Math.round((parseFloat(currentMap.od) + Number.EPSILON) * 10) / 10
						tempMapStatsBPM = parseFloat(currentMap.bpm)
						tempMapStatsLEN = parseFloat(currentMap.songLength)
						tempMapStatsSR = Math.round((parseFloat(currentMap.difficultyrating) + Number.EPSILON) * 100) / 100

						mapStatsCS.innerText = tempMapStatsCS;
						mapStatsBPM.innerText = tempMapStatsBPM;
						mapStatsAR.innerText = tempMapStatsAR;
						mapStatsOD.innerText = tempMapStatsOD;
						mapStatsLEN.innerText = `${(Math.floor(tempMapStatsLEN / 60))}:${("0" + Math.floor(tempMapStatsLEN % 60)).slice(-2)}`
						mapStatsSR.innerText = tempMapStatsSR;

						document.getElementById(`${data.menu.bm.id}Button`).click()
					}
					if (foundMapFromMappool) break;
			}
			if (foundMapFromMappool) break;
		}
	}
	if (!foundMapFromMappool) {
		if (tempMapStatsCS !== data.menu.bm.stats.CS) mapStatsCS.innerText = data.menu.bm.stats.CS
		if (tempMapStatsAR !== data.menu.bm.stats.AR) mapStatsAR.innerText = data.menu.bm.stats.AR
		if (tempMapStatsOD !== data.menu.bm.stats.OD) mapStatsOD.innerText = data.menu.bm.stats.OD
		if (tempMapStatsLEN !== data.menu.bm.time.full) {
			tempMapStatsLEN = data.menu.bm.time.full;
			let songLengthSec = tempMapStatsLEN / 1000
			mapStatsLEN.innerText = `${(Math.floor(parseFloat(songLengthSec) / 60))}:${("0" + Math.floor(parseInt(songLengthSec) % 60)).slice(-2)}`;
		}
		if (Math.abs(data.menu.bm.stats.BPM.min - data.menu.bm.stats.BPM.max) !== 0) {
			if (tempMapStatsBPM !== `${data.menu.bm.stats.BPM.min} - ${data.menu.bm.stats.BPM.max}`) {
				tempMapStatsBPM = `${data.menu.bm.stats.BPM.min} - ${data.menu.bm.stats.BPM.max}`
				mapStatsBPM.innerText = tempMapStatsBPM
			}
		} 
		else if (tempMapStatsBPM !== data.menu.bm.stats.BPM.min) mapStatsBPM.innerText = data.menu.bm.stats.BPM.min
		if (tempMapStatsSR !== data.menu.bm.stats.SR) mapStatsSR.innerText = Math.round((parseFloat(data.menu.bm.stats.SR) + Number.EPSILON) * 10) / 10;
	}
	// Team Names
	if(teamNameBlueTemp !== data.tourney.manager.teamName.left) {
		teamNameBlueTemp = data.tourney.manager.teamName.left;
		teamBlueName.innerHTML = teamNameBlueTemp;
		if (teamNameBlueTemp !== "") teamBlueFlag.style.backgroundImage = `url("static/flags/${teamNameBlueTemp}.png")`
		else teamBlueFlag.style.backgroundImage = null

		for (var i = 0; i < allTeams.length; i++) {
			if (teamNameBlueTemp == allTeams[i].countryName) {
				blueTeamSeedNum = parseFloat(allTeams[i].seed)
				blueTeamStatsAim = parseFloat(allTeams[i].aim)
				blueTeamStatsSpeed = parseFloat(allTeams[i].speed)
				blueTeamStatsStamina = parseFloat(allTeams[i].stamina)
				blueTeamStatsFingerControl = parseFloat(allTeams[i].fingerControl)
				blueTeamStatsPrecision = parseFloat(allTeams[i].precision)
				blueTeamStatsReading = parseFloat(allTeams[i].reading)
				blueTeamStatsTech = parseFloat(allTeams[i].tech)
				
				teamNameBluePlayer1Temp = allTeams[i].captain
				teamNameBluePlayer2Temp = allTeams[i].player2
				teamNameBluePlayer3Temp = allTeams[i].player3
				teamNameBluePlayer4Temp = allTeams[i].player4
				teamNameBluePlayer5Temp = allTeams[i].player5
				teamNameBluePlayer6Temp = allTeams[i].player6
				teamNameBluePlayer7Temp = allTeams[i].player7
				teamNameBluePlayer8Temp = allTeams[i].player8

				teamNameBluePlayer1.innerText = allTeams[i].captain
				teamNameBluePlayer2.innerText = allTeams[i].player2
				teamNameBluePlayer3.innerText = allTeams[i].player3
				teamNameBluePlayer4.innerText = allTeams[i].player4
				teamNameBluePlayer5.innerText = allTeams[i].player5
				teamNameBluePlayer6.innerText = allTeams[i].player6
				teamNameBluePlayer7.innerText = allTeams[i].player7
				teamNameBluePlayer8.innerText = allTeams[i].player8
				break;
			}
		}

		if (blueTeamSeedNum && blueTeamStatsAim && blueTeamStatsSpeed && blueTeamStatsStamina && 
			blueTeamStatsFingerControl && blueTeamStatsPrecision && blueTeamStatsReading && blueTeamStatsTech) {
			blueTeamSeedNumber.innerText = blueTeamSeedNum
			blueTeamStatsAimNum.innerText = blueTeamStatsAim
			blueTeamStatsSpeedNum.innerText = blueTeamStatsSpeed 
			blueTeamStatsStaminaNum.innerText = blueTeamStatsStamina
			blueTeamStatsFingerControlNum.innerText = blueTeamStatsFingerControl 
			blueTeamStatsPrecisionNum.innerText = blueTeamStatsPrecision 
			blueTeamStatsReadingNum.innerText = blueTeamStatsReading
			blueTeamStatsTechNum.innerText = blueTeamStatsTech
	
			blueTeamStatsAimBar.style.width = `${(blueTeamStatsAim - 3) / 7 * 256}px`
			blueTeamStatsSpeedBar.style.width = `${(blueTeamStatsSpeed - 3) / 7 * 256}px`
			blueTeamStatsStaminaBar.style.width = `${(blueTeamStatsStamina - 3) / 7 * 256}px`
			blueTeamStatsFingerControlBar.style.width = `${(blueTeamStatsFingerControl - 3) / 7 * 256}px`
			blueTeamStatsPrecisionBar.style.width = `${(blueTeamStatsPrecision - 3) / 7 * 256}px`
			blueTeamStatsReadingBar.style.width = `${(blueTeamStatsReading - 3) / 7 * 256}px`
			blueTeamStatsTechBar.style.width = `${(blueTeamStatsTech - 3) / 7 * 256}px`
		} else {
			blueTeamStatsAimNum.innerText = "0.0"
			blueTeamStatsSpeedNum.innerText = "0.0" 
			blueTeamStatsStaminaNum.innerText = "0.0"
			blueTeamStatsFingerControlNum.innerText = "0.0" 
			blueTeamStatsPrecisionNum.innerText = "0.0" 
			blueTeamStatsReadingNum.innerText = "0.0"
			blueTeamStatsTechNum.innerText = "0.0"
	
			blueTeamStatsAimBar.style.width = 0
			blueTeamStatsSpeedBar.style.width = 0
			blueTeamStatsStaminaBar.style.width = 0
			blueTeamStatsFingerControlBar.style.width = 0
			blueTeamStatsPrecisionBar.style.width = 0
			blueTeamStatsReadingBar.style.width = 0
			blueTeamStatsTechBar.style.width = 0

			teamNameBluePlayer1.innerText = ""
			teamNameBluePlayer2.innerText = ""
			teamNameBluePlayer3.innerText = ""
			teamNameBluePlayer4.innerText = ""
			teamNameBluePlayer5.innerText = ""
			teamNameBluePlayer6.innerText = ""
			teamNameBluePlayer7.innerText = ""
			teamNameBluePlayer8.innerText = ""
		}
	}
	if(teamNamePurpleTemp !== data.tourney.manager.teamName.right) {
		teamNamePurpleTemp = data.tourney.manager.teamName.right;
		teamPurpleName.innerHTML = teamNamePurpleTemp;
		if (teamNamePurpleTemp !== "") teamPurpleFlag.style.backgroundImage = `url("static/flags/${teamNamePurpleTemp}.png")`
		else teamPurpleFlag.style.backgroundImage = null

		for (var i = 0; i < allTeams.length; i++) {
			if (teamNamePurpleTemp == allTeams[i].countryName) {
				purpleTeamSeedNum = parseFloat(allTeams[i].seed)
				purpleTeamStatsAim = parseFloat(allTeams[i].aim)
				purpleTeamStatsSpeed = parseFloat(allTeams[i].speed)
				purpleTeamStatsStamina = parseFloat(allTeams[i].stamina)
				purpleTeamStatsFingerControl = parseFloat(allTeams[i].fingerControl)
				purpleTeamStatsPrecision = parseFloat(allTeams[i].precision)
				purpleTeamStatsReading = parseFloat(allTeams[i].reading)
				purpleTeamStatsTech = parseFloat(allTeams[i].tech)

				teamNamePurplePlayer1Temp = allTeams[i].captain
				teamNamePurplePlayer2Temp = allTeams[i].player2
				teamNamePurplePlayer3Temp = allTeams[i].player3
				teamNamePurplePlayer4Temp = allTeams[i].player4
				teamNamePurplePlayer5Temp = allTeams[i].player5
				teamNamePurplePlayer6Temp = allTeams[i].player6
				teamNamePurplePlayer7Temp = allTeams[i].player7
				teamNamePurplePlayer8Temp = allTeams[i].player8

				teamNamePurplePlayer1.innerText = allTeams[i].captain
				teamNamePurplePlayer2.innerText = allTeams[i].player2
				teamNamePurplePlayer3.innerText = allTeams[i].player3
				teamNamePurplePlayer4.innerText = allTeams[i].player4
				teamNamePurplePlayer5.innerText = allTeams[i].player5
				teamNamePurplePlayer6.innerText = allTeams[i].player6
				teamNamePurplePlayer7.innerText = allTeams[i].player7
				teamNamePurplePlayer8.innerText = allTeams[i].player8
			}
		}

		if (purpleTeamSeedNum && purpleTeamStatsAim && purpleTeamStatsSpeed && purpleTeamStatsStamina && 
			purpleTeamStatsFingerControl && purpleTeamStatsPrecision && purpleTeamStatsReading && purpleTeamStatsTech) {
			purpleTeamSeedNumber.innerText = purpleTeamSeedNum
			purpleTeamStatsAimNum.innerText = purpleTeamStatsAim
			purpleTeamStatsSpeedNum.innerText = purpleTeamStatsSpeed 
			purpleTeamStatsStaminaNum.innerText = purpleTeamStatsStamina
			purpleTeamStatsFingerControlNum.innerText = purpleTeamStatsFingerControl 
			purpleTeamStatsPrecisionNum.innerText = purpleTeamStatsPrecision 
			purpleTeamStatsReadingNum.innerText = purpleTeamStatsReading
			purpleTeamStatsTechNum.innerText = purpleTeamStatsTech
	
			purpleTeamStatsAimBar.style.width = `${(purpleTeamStatsAim - 3) / 7 * 256}px`
			purpleTeamStatsSpeedBar.style.width = `${(purpleTeamStatsSpeed - 3) / 7 * 256}px`
			purpleTeamStatsStaminaBar.style.width = `${(purpleTeamStatsStamina - 3) / 7 * 256}px`
			purpleTeamStatsFingerControlBar.style.width = `${(purpleTeamStatsFingerControl - 3) / 7 * 256}px`
			purpleTeamStatsPrecisionBar.style.width = `${(purpleTeamStatsPrecision - 3) / 7 * 256}px`
			purpleTeamStatsReadingBar.style.width = `${(purpleTeamStatsReading - 3) / 7 * 256}px`
			purpleTeamStatsTechBar.style.width = `${(purpleTeamStatsTech - 3) / 7 * 256}px`
		} else {
			purpleTeamStatsAimNum.innerText = "0.0"
			purpleTeamStatsSpeedNum.innerText = "0.0" 
			purpleTeamStatsStaminaNum.innerText = "0.0"
			purpleTeamStatsFingerControlNum.innerText = "0.0" 
			purpleTeamStatsPrecisionNum.innerText = "0.0" 
			purpleTeamStatsReadingNum.innerText = "0.0"
			purpleTeamStatsTechNum.innerText = "0.0"
	
			purpleTeamStatsAimBar.style.width = 0
			purpleTeamStatsSpeedBar.style.width = 0
			purpleTeamStatsStaminaBar.style.width = 0
			purpleTeamStatsFingerControlBar.style.width = 0
			purpleTeamStatsPrecisionBar.style.width = 0
			purpleTeamStatsReadingBar.style.width = 0
			purpleTeamStatsTechBar.style.width = 0

			teamNamePurplePlayer1.innerText = ""
			teamNamePurplePlayer2.innerText = ""
			teamNamePurplePlayer3.innerText = ""
			teamNamePurplePlayer4.innerText = ""
			teamNamePurplePlayer5.innerText = ""
			teamNamePurplePlayer6.innerText = ""
			teamNamePurplePlayer7.innerText = ""
			teamNamePurplePlayer8.innerText = ""
		}
	}
	// IPC State
	if (numOfClients !== data.tourney.ipcClients.length) numOfClients = data.tourney.ipcClients.length
	if (ipcState !== data.tourney.manager.ipcState) {
		ipcState = data.tourney.manager.ipcState
		if (ipcState == 1) pointAwarded = false;
		else if (ipcState == 3) {
			pointAwarded = false;
			toGameplayView()
		}
		else if (ipcState == 4) {
			let currentMapCardSetWinner = ""
			let pickCardBlue = document.getElementsByClassName("pickCardBlue")
			let pickCardPurple = document.getElementsByClassName("pickCardPurple")
			for (var i = 0; i < pickCardBlueIDs.length; i++) {
				if (clickedMapID == pickCardBlueIDs[i]) {
					currentMapCardSetWinner = pickCardBlue[i]
					break
				}
			}
			if (currentMapCardSetWinner == "") {
				for (var i = 0; i < pickCardPurpleIDs.length; i++) {
					if (clickedMapID == pickCardPurpleIDs[i]) {
						currentMapCardSetWinner = pickCardPurple[i]
						break
					}
				}
			}

			if (pointAwarded == false) {
				pointAwarded = true;
				if (playScoreBlueTemp > playScorePurpleTemp) {
					blueStarControlPlus.click()
					if (currentMapCardSetWinner !== "") currentMapCardSetWinner.children[0].style.borderColor = "var(--blue)"
				}
				else if (playScoreBlueTemp < playScorePurpleTemp) {
					purpleStarControlPlus.click()
					if (currentMapCardSetWinner !== "") currentMapCardSetWinner.children[0].style.borderColor = "var(--purple)"
				}
				else if (playScoreBlueTemp == playScorePurpleTemp) {
					let blueTeamAccuracy = 0;
					let purpleTeamAccuracy = 0;

					for (var i = 0; i < numOfClients; i++) {
						let currentAccuracy = parseFloat(data.tourney.ipcClients[i].gameplay.accuracy)
						if (i < numOfClients / 2) blueTeamAccuracy += currentAccuracy
						else purpleTeamAccuracy += currentAccuracy
					}

					if (blueTeamAccuracy > purpleTeamAccuracy) {
						blueStarControlPlus.click()
						if (currentMapCardSetWinner !== "") currentMapCardSetWinner.children[0].style.borderColor = "var(--blue)"
					}
					else if (blueTeamAccuracy < purpleTeamAccuracy) {
						purpleStarControlPlus.click()
						if (currentMapCardSetWinner !== "") currentMapCardSetWinner.children[0].style.borderColor = "var(--purple)"
					}
				}
			}

			// Automatically go to mappool page
			setTimeout(() => {
				// Changing Background Image
				topSection.style.backgroundImage = "url('static/mappoolViewTop.png')"
				// Gameplay Greenscreen 
				gameplaySection.style.left = "-1920px"
				// Round Text
				roundText.style.opacity = 0
				// Now Playing Container
				nowPlayingContainer.style.bottom = "-135px"
				for (var i = 0; i < mapStatsTop.length; i++) mapStatsTop[i].style.top = "237px"
				for (var i = 0; i < mapStatsBot.length; i++) mapStatsBot[i].style.top = "256px"
				// Stars
				for (var i = 0; i < blueStars.length; i++) {
					blueStars[i].style.top = "-25px"
					blueStars[i].style.left = `${615 - (i * 55)}px`
					purpleStars[i].style.top = "-25px"
					purpleStars[i].style.right = `${615 - (i * 55)}px`	
				}
				// Team Names
				for (var i = 0; i < teamNames.length; i++) {
					teamNames[i].style.top = "320px"
					teamNames[i].style.fontSize = "40px"
					teamNames[i].style.width = "350px"
				}
				teamBlueName.style.transform = "translateX(-50%)"
				teamBlueName.style.left = "190px"
				teamBlueName.style.textShadow = "0px 0px 10px var(--blue75Opacity), 0px 0px 20px var(--blue75Opacity), 0px 0px 30px var(--blue75Opacity)"
				teamPurpleName.style.transform = "translateX(50%)"
				teamPurpleName.style.right = "190px"
				teamPurpleName.style.textShadow = "0px 0px 10px var(--purple75Opacity), 0px 0px 20px var(--purple75Opacity), 0px 0px 30px var(--purple75Opacity)"
				// Team Flags
				for (var i = 0; i < teamFlags.length; i++) teamFlags[i].style.height = "200px";
				teamBlueFlag.style.top = "115px"
				teamBlueFlag.style.left = "52px"
				teamPurpleFlag.style.left = "1590px"
				teamPurpleFlag.style.top = "-85px"
				// Chat
				chats.style.bottom = "45px"
				chats.style.height = "145px"
				// Sponsors
				sponsor.style.opacity = 0;
				mappoolSponsor.style.opacity = 1;
				// Gameplay Names
				gameplayNames.style.opacity = 0;
				mappool.style.opacity = 1;

				viewState = 1;
				if (scoreBlueTemp == bestOfTemp || scorePurpleTemp == bestOfTemp){
					setTimeout(() => {
						toWinScreen();
					}, 25000);
				}
			}, 25000)
			
			
			
		}
	}
	if(scoreVisibleTemp) {
		// MAKE SURE WHEN MAP IS PLAYED, SET A BOOL TO "isFreemod" TO TRUE/FALSE.
		// Freemod Mod Multipliers
		playScoreBlueTemp = 0;
		playScorePurpleTemp = 0;

		if (isFreemod) {
			for (var i = 0; i < numOfClients; i++) {
				// All mod combination multipliers
				var tempScore = data.tourney.ipcClients[i].gameplay.score
				let modStr = data.tourney.ipcClients[i].gameplay.mods.str

				if (modStr.includes("EZFL")) tempScore *= 2.15
				else if (modStr.includes("EZ")) tempScore *= 1.75 

				if (!modStr.includes("HD") && modStr.includes("HR")) tempScore *= 1.04
				
				if (modStr.includes("FL") && !modStr.includes("EZ")) tempScore *= 1.4
				if (i < numOfClients / 2) playScoreBlueTemp += tempScore 
				else playScorePurpleTemp += tempScore  
			}
		} else {
			playScoreBlueTemp = data.tourney.manager.gameplay.score.left;
			playScorePurpleTemp = data.tourney.manager.gameplay.score.right;
		}

		playScoreBlueTemp = parseInt(playScoreBlueTemp);
		playScorePurpleTemp = parseInt(playScorePurpleTemp); 
		playScoreDifferenceTemp = Math.abs(playScoreBlueTemp - playScorePurpleTemp)

		animation.playScoreBlue.update(playScoreBlueTemp);
		animation.playScorePurple.update(playScorePurpleTemp);
		animation.playScoreDifference.update(playScoreDifferenceTemp)

		let widthOfScoreBar = Math.abs(playScoreBlueTemp - playScorePurpleTemp) / 1000000 * 720;
		if (widthOfScoreBar > 720) widthOfScoreBar = 720

		if (playScoreBlueTemp > playScorePurpleTemp) {
			// Blue is Leading
			playScoreBlue.style.fontSize = "45px";
			playScoreBlue.style.color = "#75c6ea";
			playScorePurple.style.fontSize = "40px";
			playScorePurple.style.color = "#fff";

			movingScoreBarBlue.style.width = `${widthOfScoreBar}px`;
			movingScoreBarPurple.style.width = "0px";

			playScoreDifferenceLeftArrow.style.opacity = 1;
			playScoreDifferenceRightArrow.style.opacity = 0;

			// playScoreDifferenceLeftArrow.style.display = "none"
			// playScoreDifferenceRightArrow.style.display = "block"
		} else if (playScoreBlueTemp == playScorePurpleTemp) {
			// Tie
			playScoreBlue.style.fontSize = "40px";
			playScoreBlue.style.color = "#fff";
			playScorePurple.style.fontSize = "40px";
			playScorePurple.style.color = "#fff";

			movingScoreBarBlue.style.width = "0px";
			movingScoreBarPurple.style.width = "0px";

			playScoreDifferenceLeftArrow.style.opacity = 0;
			playScoreDifferenceRightArrow.style.opacity = 0;

			// playScoreDifferenceLeftArrow.style.display = "none"
			// playScoreDifferenceRightArrow.style.display = "none"
		} else {
			// Purple is leading
			playScoreBlue.style.fontSize = "40px";
			playScoreBlue.style.color = "#fff";
			playScorePurple.style.fontSize = "45px";
			playScorePurple.style.color = "#936bf7";

			movingScoreBarBlue.style.width = "0px";
			movingScoreBarPurple.style.width = `${widthOfScoreBar}px`;

			playScoreDifferenceLeftArrow.style.opacity = 0;
			playScoreDifferenceRightArrow.style.opacity = 1;

			// playScoreDifferenceLeftArrow.style.display = "none"
			// playScoreDifferenceRightArrow.style.display = "block"
		}
	}
	if(!scoreVisibleTemp) {
		if(chatLen != data.tourney.manager.chat.length) {
			// There's new chats that haven't been updated
			
			if(chatLen == 0 || (chatLen > 0 && chatLen > data.tourney.manager.chat.length)) {
				// Starts from bottom
				chats.innerHTML = "";
				chatLen = 0;
			}
			
			// Add the chats
			for(var i=chatLen; i < data.tourney.manager.chat.length; i++) {
				tempClass = data.tourney.manager.chat[i].team;
				
				// Chat variables
				let chatParent = document.createElement('div');
				chatParent.setAttribute('class', 'chat');

				let chatTime = document.createElement('div');
				chatTime.setAttribute('class', 'chatTime');

				let chatName = document.createElement('div');
				chatName.setAttribute('class', 'chatName');

				let chatText = document.createElement('div');
				chatText.setAttribute('class', 'chatText');
				
				chatTime.innerText = data.tourney.manager.chat[i].time;
				chatName.innerText = data.tourney.manager.chat[i].name + ":\xa0";
				chatText.innerText = data.tourney.manager.chat[i].messageBody;
				
				chatName.classList.add(tempClass);
				
				chatParent.append(chatTime);
				chatParent.append(chatName);
				chatParent.append(chatText);
				chats.append(chatParent);
			}
			
			// Update the Length of chat
			chatLen = data.tourney.manager.chat.length;
			
			// Update the scroll so it's sticks at the bottom by default
			chats.scrollTop = chats.scrollHeight;
		}
	}

	// Player Names
	// if (playerSlotName1 !== data.tourney.ipcClients[0].spectating.name) {
	// 	playerSlotName1 = data.tourney.ipcClients[0].spectating.name
	// 	gameplayName1.innerText = playerSlotName1
	// }
	//  if (playerSlotName2 !== data.tourney.ipcClients[2].spectating.name) {
	//  	playerSlotName2 = data.tourney.ipcClients[2].spectating.name
	// 	gameplayName2.innerText = playerSlotName2
	// }
	// if (playerSlotName3 !== data.tourney.ipcClients[1].spectating.name) {
	// 	playerSlotName3 = data.tourney.ipcClients[1].spectating.name
	// 	gameplayName3.innerText = playerSlotName3
	// }
	// if (playerSlotName4 !== data.tourney.ipcClients[3].spectating.name) {
	//  	playerSlotName4 = data.tourney.ipcClients[3].spectating.name
	//  	gameplayName4.innerText = playerSlotName4
	// }
	// if (playerSlotName5 !== data.tourney.ipcClients[4].spectating.name) {
	//  	playerSlotName5 = data.tourney.ipcClients[4].spectating.name
	//  	gameplayName5.innerText = playerSlotName5
	// }
	// if (playerSlotName6 !== data.tourney.ipcClients[6].spectating.name) {
	//  	playerSlotName6 = data.tourney.ipcClients[6].spectating.name
	//  	gameplayName6.innerText = playerSlotName6
	// }
	// if (playerSlotName7 !== data.tourney.ipcClients[5].spectating.name) {
	//   	playerSlotName7 = data.tourney.ipcClients[5].spectating.name
	//   	gameplayName7.innerText = playerSlotName7
	// }
	// if (playerSlotName8 !== data.tourney.ipcClients[7].spectating.name) {
	//  	playerSlotName8 = data.tourney.ipcClients[7].spectating.name
	//  	gameplayName8.innerText = playerSlotName8
	// }
}

const changeAction = (actionText) => nextAction.innerText = actionText
changeRound('Quarterfinals')
function changeRound(round) {
	// Changing Round Text
	roundText.innerText = round;

	// Changing Best Of
	bestOfTemp = 7
	if (round == "Round of 32" || round == "Round of 16") bestOfTemp = 5
	else if (round == "Quarterfinals" || round == "Semifinals") bestOfTemp = 6

	// Changing No Of Bans
	banTotalNum = 2
	if (round == "Round of 32" || round == "Round of 16") banTotalNum = 1

	// Changing Number of Ban Cards
	if (banCard.length / 2 < banTotalNum) {
		for (var i = banCard.length; i < banTotalNum * 2; i++) {
			let banCardCreate = document.createElement("div")
			banCardCreate.setAttribute("class", "mappoolCard banCard")
			banCardCreate.style.backgroundImage = "url('static/mappoolCardBlankImage.png')"

			let banCardOverlayCreate = document.createElement("div")
			banCardOverlayCreate.classList.add("mappoolCardOverlay")

			let banCardModTextCreate = document.createElement("div")
			banCardModTextCreate.classList.add("mappoolCardText")

			let banCardTextCreate = document.createElement("div")
			banCardTextCreate.classList.add("banCardText")
			banCardTextCreate.innerText = "BAN"

			banCardCreate.append(banCardOverlayCreate)
			banCardCreate.append(banCardModTextCreate)
			banCardCreate.append(banCardTextCreate)
			banCards.append(banCardCreate)			
			
			if (i == 0) {
				banCardCreate.style.left = "420px"
				banCardCreate.classList.add("banCardBlue")
			}
			else if (i == 1) {
				banCardCreate.style.right = "420px"
				banCardCreate.classList.add("banCardPurple")
			}
			else if (i == 2) {
				banCardCreate.style.left = "580px"
				banCardCreate.classList.add("banCardBlue")
			}
			else if (i == 3) {
				banCardCreate.style.right = "580px"
				banCardCreate.classList.add("banCardPurple")
			}
		}
	} else if (banCard.length / 2 > banTotalNum) for (var i = banCard.length; i > banTotalNum * 2; i--) banCards.removeChild(banCards.lastElementChild)

	// Changing Stars
	changeStars(null);

	// Changing Number of Cards
	let noOfBlueCards = mapPickCardsBlue.childElementCount
	let noOfPurpleCards = mapPickCardsPurple.childElementCount

	if (noOfBlueCards < bestOfTemp) {
		for (var i = noOfBlueCards; i < bestOfTemp; i++) {
			let pickCard = document.createElement("div")
			pickCard.setAttribute("class","mappoolCard pickCard pickCardBlue")
			pickCard.style.backgroundImage = "url('static/mappoolCardBlankImage.png')"
			pickCard.style.left = `${160 * i}px`

			let pickCardOverlay = document.createElement("div")
			pickCardOverlay.classList.add("mappoolCardOverlay")
			let pickCardText = document.createElement("div")
			pickCardText.classList.add("mappoolCardText")

			pickCard.append(pickCardOverlay)
			pickCard.append(pickCardText)
			mapPickCardsBlue.append(pickCard)
		}
	} else if (bestOfTemp < noOfBlueCards) for (var i = noOfBlueCards; i > bestOfTemp; i--) mapPickCardsBlue.removeChild(mapPickCardsBlue.lastElementChild)
	if (noOfPurpleCards < bestOfTemp) {
		for (var i = noOfPurpleCards; i < bestOfTemp; i++) {
			let pickCard = document.createElement("div")
			pickCard.setAttribute("class","mappoolCard pickCard pickCardPurple")
			pickCard.style.backgroundImage = "url('static/mappoolCardBlankImage.png')"
			pickCard.style.right = `${(160 * i) - 120}px`

			let pickCardOverlay = document.createElement("div")
			pickCardOverlay.classList.add("mappoolCardOverlay")
			let pickCardText = document.createElement("div")
			pickCardText.classList.add("mappoolCardText")

			pickCard.append(pickCardOverlay)
			pickCard.append(pickCardText)
			mapPickCardsPurple.append(pickCard)
		}
	} else if (bestOfTemp < noOfPurpleCards) for (var i = noOfPurpleCards; i > bestOfTemp; i--) mapPickCardsPurple.removeChild(mapPickCardsPurple.lastElementChild)
}
function changeScore(side, scoreEvent) {
	let animation = true;
	if	(warmupState == 0){
		if (side == "blue" && scoreEvent == "add") scoreBlueTemp++
		else if (side == "blue" && scoreEvent == "remove") scoreBlueTemp--
		else if (side == "purple" && scoreEvent == "add") scorePurpleTemp++
		else if (side == "purple" && scoreEvent == "remove") scorePurpleTemp--

		if (scoreBlueTemp < 0) {
			scoreBlueTemp = 0
			animation = false;
		} else if (scoreBlueTemp > bestOfTemp) {
			scoreBlueTemp = bestOfTemp
			animation = false;
		}
		if (scorePurpleTemp < 0) {
			scorePurpleTemp = 0
			animation = false;
		} else if (scorePurpleTemp > bestOfTemp) {
			scorePurpleTemp = bestOfTemp;
			animation = false;
		}

		if (animation) changeStars(`${side}-${scoreEvent}`)
	}
	else {
		return false;
	}
}
function changeStars(starEvent) {
	// Left Stars
	scoreBlue.innerHTML = '';
	// Pointed Achieved
	for (var i = 0; i < scoreBlueTemp; i++) {
		let generatedStar = starGenerate("left", i);
		generatedStar[1].classList.add("line1CrossLeft", "starCross");
		generatedStar[2].classList.add("line2CrossLeft", "starCross");
		if (starEvent == "blue-add" && i === scoreBlueTemp - 1) {
			generatedStar[1].classList.add("line1CircleToCrossLeftAnimation");
			generatedStar[2].classList.add("line2CircleToCrossLeftAnimation");
		}
		generatedStar[0].appendChild(generatedStar[1])
		generatedStar[0].appendChild(generatedStar[2])
		scoreBlue.appendChild(generatedStar[0])
	}
	// Points not yet achieved
	for (i; i < bestOfTemp; i++) {
		let generatedStar = starGenerate("left", i);
		generatedStar[1].classList.add("line1CircleLeft", "starCircle");
		generatedStar[2].classList.add("line2CircleLeft", "starCircle");
		if (starEvent == "blue-remove" && i == scoreBlueTemp) {
			generatedStar[1].classList.add("line1CrossToCircleLeftAnimation")
			generatedStar[2].classList.add("line2CrossToCircleLeftAnimation")
		}
		generatedStar[0].appendChild(generatedStar[1])
		generatedStar[0].appendChild(generatedStar[2])
		scoreBlue.appendChild(generatedStar[0])
	}
	// Right Stars
	scorePurple.innerHTML = '';
	// Points Achieved
	for (var i = 0; i < scorePurpleTemp; i++) {
		let generatedStar = starGenerate("right", i);
		generatedStar[1].classList.add("line1CrossRight", "starCross");
		generatedStar[2].classList.add("line2CrossRight", "starCross");
		if (starEvent == "purple-add" && i === scorePurpleTemp - 1) {
			generatedStar[1].classList.add("line1CircleToCrossRightAnimation")
			generatedStar[2].classList.add("line2CircleToCrossRightAnimation")
		}
		generatedStar[0].appendChild(generatedStar[1])
		generatedStar[0].appendChild(generatedStar[2])
		scorePurple.appendChild(generatedStar[0])
	}
	// Points not yet achieved
	for (i; i < bestOfTemp; i++) {
		let generatedStar = starGenerate("right", i);
		generatedStar[1].classList.add("line1CircleRight", "starCircle");
		generatedStar[2].classList.add("line2CircleRight", "starCircle");
		if (starEvent == "purple-remove" && i == scorePurpleTemp) {
			generatedStar[1].classList.add("line1CrossToCircleRightAnimation")
			generatedStar[2].classList.add("line2CrossToCircleRightAnimation")
		}
		generatedStar[0].appendChild(generatedStar[1])
		generatedStar[0].appendChild(generatedStar[2])
		scorePurple.appendChild(generatedStar[0])
	}
}
function starGenerate(side, i) {
	let star = document.createElement("div")
	let line1 = document.createElement("div")
	let line2 = document.createElement("div")
	if (viewState == 0){
		if (side == "left") {
			line1.style.backgroundColor = "#75c6ea";
			line2.style.backgroundColor = "#75c6ea";

			star.style.left = `${740 - (i * 50)}px`;
		} else {
			line1.style.backgroundColor = "#936bf7";
			line2.style.backgroundColor = "#936bf7";

			star.style.right = `${728 - (i * 50)}px`;
		}
	}
	else {
		if (side == "left") {
			line1.style.backgroundColor = "#75c6ea";
			line2.style.backgroundColor = "#75c6ea";

			star.style.left = `${615 - (i * 55)}px`;
			star.style.top = `-25px`;
		} else {
			line1.style.backgroundColor = "#936bf7";
			line2.style.backgroundColor = "#936bf7";

			star.style.right = `${615 - (i * 55)}px`;
			star.style.top = `-25px`;
		}
	}

	star.setAttribute("class", "star");
	let starGeneration = [star, line1, line2]
	return starGeneration
}

// Reset
function reset(section) {
	if (section == "picks") {
		// Picks
		resetButtonPicks.style.display = "none"	
		resetButtonPicksConfirm.style.display = "block"
		let pickCardBlue = document.getElementsByClassName("pickCardBlue")
		let pickCardPurple = document.getElementsByClassName("pickCardPurple")
		for (var i = 0; i < pickCardBlue.length; i++) {
			pickCardBlue[i].children[0].borderColor = "white"
			pickCardPurple[i].children[0].borderColor = "white"
		}
		resetBanButton()
		resetProtectButton()
	} else if (section == "bans") {
		// Bans
		resetPickButton()
		resetButtonBans.style.display = "none"	
		resetButtonBansConfirm.style.display = "block"
		resetProtectButton()
	} else if (section == "protects") {
		// Protects
		resetPickButton()
		resetBanButton()
		resetButtonProtects.style.display = "none"	
		resetButtonProtectsConfirm.style.display = "block"
	}
}
function resetConfirm(section, confirm) {
	if (confirm) {
		if (section == "picks") {
			for (var i = 0; i < mapPickCardsBlue.childElementCount; i++) {
				mapPickCardsBlue.children[i].children[1].innerText = ""
				mapPickCardsBlue.children[i].style.backgroundImage = "none"
				mapPickCardsPurple.children[i].children[1].innerText = ""
				mapPickCardsPurple.children[i].style.backgroundImage = "none"
			}
			for (var i = 0; i < pickCardBlueIDs.length; i++) {
				document.getElementById(`${pickCardBlueIDs[i]}Button`).style.backgroundColor = "white"
				pickCardBlueIDs[i] = undefined
			}
			for (var i = 0; i < pickCardPurpleIDs.length; i++) {
				document.getElementById(`${pickCardPurpleIDs[i]}Button`).style.backgroundColor = "white"
				pickCardPurpleIDs[i] = undefined
			}
			banNum = 0
			resetPickButton()
		} else if (section == "bans") {
			for (var i = 0; i < banCard.length; i++) {
				banCard[i].style.backgroundImage = "none"
				banCard[i].children[1].innerText = ""
			}
			for (var i = banCardBlueIDs.length - 1; i >= 0; i--) {
				document.getElementById(`${banCardBlueIDs[i]}Button`).style.backgroundColor = "white"
				document.getElementById(`${banCardPurpleIDs[i]}Button`).style.backgroundColor = "white"
				banCardBlueIDs[i] = undefined
				banCardPurpleIDs[i] = undefined
			}
			resetBanButton()
		} else if (section == "protects") {
			protectCardBlue.style.backgroundImage = "none"
			protectCardBlueText.innerText = ""
			document.getElementById(`${[protectCardBlueID]}Button`).style.backgroundColor = "#FFFFFF"
			protectCardPurple.style.backgroundImage = "none"
			protectCardPurpleText.innerText = ""
			document.getElementById(`${[protectCardPurpleID]}Button`).style.backgroundColor = "#FFFFFF"

			blueProtectNum = 0
			purpleProtectNum = 0
			resetProtectButton()
		}
	} else {
		if (section == "picks") resetPickButton()
		else if (section == "bans") resetBanButton()
		else if (section == "protects") resetProtectButton()
	}
}
function resetPickButton() {
	resetButtonPicks.style.display = "block"	
	resetButtonPicksConfirm.style.display = "none"
}
function resetBanButton() {
	resetButtonBans.style.display = "block"	
	resetButtonBansConfirm.style.display = "none"
}
function resetProtectButton() {
	resetButtonProtects.style.display = "block"	
	resetButtonProtectsConfirm.style.display = "none"
}

// Star Toggle
function starToggleOnOff(toggle) {
	if (toggle == "turnOff") {
		starToggleState = false;
		starToggle.innerText = "OFF";
		starToggle.setAttribute("onclick", "starToggleOnOff('turnOn')")
		warmupState = 1;
	} else if (toggle == "turnOn") {
		starToggleState = true;
		starToggle.innerText = "ON";
		starToggle.setAttribute("onclick", "starToggleOnOff('turnOff')")
		warmupState = 0;
	}
}

function toPickScreenView() {
	// Resetting Win Screen opacity
	winScreen.style.opacity = 0;
	// Changing Background Image
	topSection.style.backgroundImage = "url('static/mappoolViewTop.png')"
	// Gameplay Greenscreen 
	gameplaySection.style.left = "-1920px"
	// Round Text
	roundText.style.opacity = 0
	// Now Playing Container
	nowPlayingContainer.style.bottom = "-135px"
	for (var i = 0; i < mapStatsTop.length; i++) mapStatsTop[i].style.top = "237px"
	for (var i = 0; i < mapStatsBot.length; i++) mapStatsBot[i].style.top = "256px"
	// Stars
	for (var i = 0; i < blueStars.length; i++) {
		blueStars[i].style.top = "-25px"
		blueStars[i].style.left = `${615 - (i * 55)}px`
		purpleStars[i].style.top = "-25px"
		purpleStars[i].style.right = `${615 - (i * 55)}px`	
	}
	// Team Names
	for (var i = 0; i < teamNames.length; i++) {
		teamNames[i].style.top = "320px"
		teamNames[i].style.fontSize = "40px"
		teamNames[i].style.width = "350px"
	}
	teamBlueName.style.transform = "translateX(-50%)"
	teamBlueName.style.left = "190px"
	teamBlueName.style.textShadow = "0px 0px 10px var(--blue75Opacity), 0px 0px 20px var(--blue75Opacity), 0px 0px 30px var(--blue75Opacity)"
	teamPurpleName.style.transform = "translateX(50%)"
	teamPurpleName.style.right = "190px"
	teamPurpleName.style.textShadow = "0px 0px 10px var(--purple75Opacity), 0px 0px 20px var(--purple75Opacity), 0px 0px 30px var(--purple75Opacity)"
	// Team Flags
	for (var i = 0; i < teamFlags.length; i++) teamFlags[i].style.height = "200px";
	teamBlueFlag.style.top = "115px"
	teamBlueFlag.style.left = "52px"
	teamPurpleFlag.style.left = "1590px"
	teamPurpleFlag.style.top = "-85px"
	// Chat
	chats.style.bottom = "45px"
	chats.style.height = "145px"
	// Sponsors
	sponsor.style.opacity = 0;
	mappoolSponsor.style.opacity = 1;
	// Gameplay Names
	gameplayNames.style.opacity = 0;
	mappool.style.opacity = 1;

	viewState = 1;

	winVideoBlue.removeAttribute('loop');
	winVideoPurple.removeAttribute('loop');
	winVideoBlue.pause();
	winVideoPurple.pause();
	winVideoText.pause();
}
function toGameplayView() {
	// Resetting Win Screen opacity
	winScreen.style.opacity = 0;
	// Changing Background Image
	topSection.style.backgroundImage = "url('static/gameplayView.png')";
	// Gameplay greenscreen
	gameplaySection.style.left = 0;
	// Round Text
	roundText.style.opacity = 1;
	// Now Playing Container
	nowPlayingContainer.style.bottom = "15px";
	for (var i = 0; i < mapStatsTop.length; i++) mapStatsTop[i].style.top = "87px"
	for (var i = 0; i < mapStatsBot.length; i++) mapStatsBot[i].style.top = "106px"
	// Stars
	for (var i = 0; i < blueStars.length; i++) {
		blueStars[i].style.top = "88px";
		blueStars[i].style.left = `${740 - (i * 50)}px`;
		purpleStars[i].style.top = "88px";
		purpleStars[i].style.right = `${728 - (i * 50)}px`;
	}
	// Team Names
	for (var i = 0; i < teamNames.length; i++) {
		teamNames[i].style.top = "10px"
		teamNames[i].style.width = "max-content"
		teamNames[i].style.fontSize = "31px"
		teamNames[i].style.transform = "translateX(0)"
	}
	teamBlueName.style.left = "170px"
	teamPurpleName.style.right = "170px"
	teamBlueName.style.textShadow = "0px 0px 0px #ffffff"
	teamPurpleName.style.textShadow = "0px 0px 0px #ffffff"
	// Team Flags
	for (var i = 0; i < teamFlags.length; i++) teamFlags[i].style.height = "70px";
	teamBlueFlag.style.top = "20px"
	teamBlueFlag.style.left = "50px"
	teamPurpleFlag.style.left = "1780px"
	teamPurpleFlag.style.top = "-50px"
	// Chat
	chats.style.bottom = "10px"
	chats.style.height = "130px"
	// Sponsors
	sponsor.style.opacity = 1;
	mappoolSponsor.style.opacity = 0;
	// Gameplay Names
	gameplayNames.style.opacity = 1;
	mappool.style.opacity = 0;

	viewState = 0;

	winVideoBlue.removeAttribute('loop');
	winVideoPurple.removeAttribute('loop');
	winVideoBlue.pause();
	winVideoPurple.pause();
	winVideoText.pause();
}

changeStars(null)

// When clicking on a map in the side panel
function mapClickEvent() {

	// Get id of the element clicked
	if (typeof this.id !== "undefined") clickedMapID = this.id.replace(/\D/g, "")

	// Finding the correct map
	let clickedMap;
	let clickedMapFound;
	for (var i = 0; i < allMaps.length; i++) {
		for (var j = 0; j < allMaps[i].length; j++) {
			if (clickedMapID == allMaps[i][j].beatmapID) {
				clickedMap = allMaps[i][j]
				clickedMapFound = true
				break
			}
		}
		if (clickedMapFound) break
	}

	// Changes based on protection
	let validation = true
	switch(true) {
	case (nextAction.innerText == "Blue Protect"):
		// Checking for Bans
		for (var i = 0; i < banCardBlueIDs.length; i++) {
			if (clickedMapID == banCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < banCardPurpleIDs.length; i++) {
			if (clickedMapID == banCardPurpleIDs[i]) validation = false
		}
		// Checking for Purple Protect
		if (clickedMapID == protectCardPurpleID) validation = false
		if (validation) {
			// Changing the style of buttonS
			protectCardBlueID = clickedMapID
			this.style.backgroundColor = "#6ACE0C"
			if (clickedMapID !== protectCardBlueID && (typeof protectCardBlueID !== "undefined" || protectCardBlueID == null)) {
				document.getElementById(`${protectCardBlueID}Button`).style.backgroundColor = "#FFFFFF" 
			}
			//protectCardBlueID = clickedMapID
			// Changing the style of the card
			protectCardBlue.style.backgroundImage = `url("${clickedMap.imgURL}")`
			protectCardBlueText.innerText = `${clickedMap.mod}${clickedMap.order}`
			// Other Details
			blueProtectNum++;
			if (purpleProtectNum >= protectTotalNum) nextAction.innerText = "Blue Ban"
			else nextAction.innerText = "Purple Protect"
		}
		break;
	case (nextAction.innerText == "Purple Protect"): 
		// Checking for Bans
		for (var i = 0; i < banCardBlueIDs.length; i++) {
			if (clickedMapID == banCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < banCardPurpleIDs.length; i++) {
			if (clickedMapID == banCardPurpleIDs[i]) validation = false
		}
		// Checking for Purple Protect
		if (clickedMapID == protectCardBlueID) validation = false
		if (validation) {
			// Changing the style of buttons
			protectCardPurpleID = clickedMapID
			this.style.backgroundColor = "#6ACE0C"
			if (clickedMapID !== protectCardPurpleID && (typeof protectCardPurpleID !== "undefined" || protectCardPurpleID == null)) {
				document.getElementById(`${protectCardPurpleID}Button`).style.backgroundColor = "#FFFFFF" 
			}
			//protectCardPurpleID = clickedMapID
			// Changing the style of the card
			protectCardPurple.style.backgroundImage = `url("${clickedMap.imgURL}")`
			protectCardPurpleText.innerText = `${clickedMap.mod}${clickedMap.order}`
			// Other Details
			purpleProtectNum++;
			if (blueProtectNum >= protectTotalNum) nextAction.innerText = "Purple Ban"
			else nextAction.innerText = "Blue Protect"
		}

		break;
	case (nextAction.innerText == "Blue Ban"):
		// Checking for protects
		if (clickedMapID == protectCardBlueID || clickedMapID == protectCardPurpleID) validation = false
		// Checking for ban
		for (var i = 0; i < banCardBlueIDs[i]; i++) {
			if (clickedMapID == banCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < banCardPurpleIDs[i]; i++) {
			if (clickedMapID == banCardPurpleIDs[i]) validation = false
		}
		if (validation) {
			banNum++

			banCardBlueIDs.push(clickedMap.beatmapID)
			// Changing style of buttons
			document.getElementById(`${clickedMap.beatmapID}Button`).style.backgroundColor = "#F88379"
			// Changing the style of the card
			for (var i = 0; i < banCardBlue.length; i++) {
				if (clickedMapID != banCardBlueIDs[i] && (typeof banCardBlueIDs[i] !== "undefined" || banCardBlueIDs[i] == null)) {
					document.getElementById(`${banCardBlueIDs[i]}Button`).style.backgroundColor = "#FFFFFF" 
				}

				if (i == banCardBlue.length - 1 || banCardBlue[i].children[1].innerText.trim() == "") {
					setCardInfo(banCardBlue[i], clickedMap)
					banCardBlueIDs[i] = clickedMap.beatmapID
					break;
				}
			}
			if (banNum == 1) nextAction.innerText = "Purple Ban"
			else if (banTotalNum == 2) {
				if (banNum == 2) nextAction.innerText = "Blue Ban"
				else if (banNum == 3) nextAction.innerText = "Purple Ban"
				else nextAction.innerText = "Purple Pick"
			} else if (banTotalNum == 1) nextAction.innerText = "Purple Pick"
		}
		break;
	case (nextAction.innerText == "Purple Ban"): 
		// Checking for protects
		if (clickedMapID == protectCardBlueID || clickedMapID == protectCardPurpleID) validation = false
		// Checking for bans
		for (var i = 0; i < banCardBlueIDs[i]; i++) {
			if (clickedMapID == banCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < banCardPurpleIDs[i]; i++) {
			if (clickedMapID == banCardPurpleIDs[i]) validation = false
		}
		if (validation) {
			banNum++

			banCardPurpleIDs.push(clickedMap.beatmapID)
			// Changing style of buttons
			document.getElementById(`${clickedMap.beatmapID}Button`).style.backgroundColor = "#F88379"
			// Changing the style of the card
			for (var i = 0; i < banCardPurple.length; i++) {
				if (clickedMapID != banCardPurpleIDs[i] && (typeof banCardPurpleIDs[i] !== "undefined" || banCardPurpleIDs[i] == null)) {
					document.getElementById(`${banCardPurpleIDs[i]}Button`).style.backgroundColor = "#FFFFFF" 
				}

				if (i == banCardPurple.length - 1 || banCardPurple[i].children[1].innerText.trim() == "") {
					setCardInfo(banCardPurple[i], clickedMap)
					banCardPurpleIDs[i] = clickedMap.beatmapID
					break;
				}
			}
			if (banNum == 1) nextAction.innerText = "Blue Ban"
			else if (banTotalNum == 2) {
				if (banNum == 2) nextAction.innerText = "Purple Ban"
				else if (banNum == 3) nextAction.innerText = "Blue Ban"
				else nextAction.innerText = "Blue Pick"
			} else if (banTotalNum == 1) nextAction.innerText = "Blue Pick"
		}
		break;
	case (nextAction.innerText == "Blue Pick"):
		// Checking Bans
		for (var i = 0; i < banCardBlueIDs.length; i++) {
			if (clickedMapID == banCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < banCardPurpleIDs.length; i++) {
			if (clickedMapID == banCardPurpleIDs[i]) validation = false
		}
		// Checking Picks
		for (var i = 0; i < pickCardBlueIDs.length; i++) {
			if (clickedMap == pickCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < pickCardPurpleIDs.length; i++) {
			if (clickedMap == pickCardPurpleIDs[i]) validation = false
		}
		if (validation) {
			// Change style of button
			this.style.backgroundColor = "var(--blue)"
			// Change style of card
			for (var i = 0; i < mapPickCardsBlue.childElementCount; i++) {
				if (mapPickCardsBlue.children[i].children[1].innerText !== "") continue
				mapPickCardsBlue.children[i].children[1].innerText = `${clickedMap.mod.toUpperCase()}${clickedMap.order}`
				mapPickCardsBlue.children[i].style.backgroundImage = `url("${clickedMap.imgURL}")`
				pickCardBlueIDs[i] = clickedMap.beatmapID
				break;
			}
			document.getElementById("nowPlayingWrapperImageNeutral").style.opacity = 0
			document.getElementById("nowPlayingWrapperImageBlue").style.opacity = 1
			document.getElementById("nowPlayingWrapperImagePurple").style.opacity = 0
			nextAction.innerText = "Purple Pick"
			// Automatically go to gameplay page
			setTimeout(() => {
				// Changing Background Image
				topSection.style.backgroundImage = "url('static/gameplayView.png')";
				// Gameplay greenscreen
				gameplaySection.style.left = 0;
				// Round Text
				roundText.style.opacity = 1;
				// Now Playing Container
				nowPlayingContainer.style.bottom = "15px";
				for (var i = 0; i < mapStatsTop.length; i++) mapStatsTop[i].style.top = "87px"
				for (var i = 0; i < mapStatsBot.length; i++) mapStatsBot[i].style.top = "106px"
				// Stars
				for (var i = 0; i < blueStars.length; i++) {
					blueStars[i].style.top = "88px";
					blueStars[i].style.left = `${740 - (i * 50)}px`;
					purpleStars[i].style.top = "88px";
					purpleStars[i].style.right = `${728 - (i * 50)}px`;
				}
				// Team Names
				for (var i = 0; i < teamNames.length; i++) {
					teamNames[i].style.top = "10px"
					teamNames[i].style.width = "max-content"
					teamNames[i].style.fontSize = "31px"
					teamNames[i].style.transform = "translateX(0)"
				}
				teamBlueName.style.left = "170px"
				teamPurpleName.style.right = "185px"
				teamBlueName.style.textShadow = "0px 0px 0px #ffffff"
				teamPurpleName.style.textShadow = "0px 0px 0px #ffffff"
				// Team Flags
				for (var i = 0; i < teamFlags.length; i++) teamFlags[i].style.height = "70px";
				teamBlueFlag.style.top = "20px"
				teamBlueFlag.style.left = "50px"
				teamPurpleFlag.style.left = "1785px"
				teamPurpleFlag.style.top = "-50px"
				// Chat
				chats.style.bottom = "10px"
				chats.style.height = "130px"
				// Sponsors
				sponsor.style.opacity = 1;
				mappoolSponsor.style.opacity = 0;
				// Gameplay Names
				gameplayNames.style.opacity = 1;
				mappool.style.opacity = 0;

				viewState = 0;
			},10000)
		}

		break;
		
	case (nextAction.innerText == "Purple Pick"): 
		// Checking Bans
		for (var i = 0; i < banCardBlueIDs.length; i++) {
			if (clickedMapID == banCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < banCardPurpleIDs.length; i++) {
			if (clickedMapID == banCardPurpleIDs[i]) validation = false
		}
		// Checking Picks
		for (var i = 0; i < pickCardBlueIDs.length; i++) {
			if (clickedMap == pickCardBlueIDs[i]) validation = false
		}
		for (var i = 0; i < pickCardPurpleIDs.length; i++) {
			if (clickedMap == pickCardPurpleIDs[i]) validation = false
		}
		if (validation) {
			// Change style of button
			this.style.backgroundColor = "var(--purple)"
			// Change style of card
			for (var i = 0; i < mapPickCardsPurple.childElementCount; i++) {
				if (mapPickCardsPurple.children[i].children[1].innerText !== "") continue
				mapPickCardsPurple.children[i].children[1].innerText = `${clickedMap.mod.toUpperCase()}${clickedMap.order}`
				mapPickCardsPurple.children[i].style.backgroundImage = `url("${clickedMap.imgURL}")`
				pickCardPurpleIDs[i] = clickedMap.beatmapID
				break;
			}
			document.getElementById("nowPlayingWrapperImageNeutral").style.opacity = 0
			document.getElementById("nowPlayingWrapperImageBlue").style.opacity = 0
			document.getElementById("nowPlayingWrapperImagePurple").style.opacity = 1
			nextAction.innerText = "Blue Pick"
			// Automatically go to gameplay page
			setTimeout(() => {
				// Changing Background Image
				topSection.style.backgroundImage = "url('static/gameplayView.png')";
				// Gameplay greenscreen
				gameplaySection.style.left = 0;
				// Round Text
				roundText.style.opacity = 1;
				// Now Playing Container
				nowPlayingContainer.style.bottom = "15px";
				for (var i = 0; i < mapStatsTop.length; i++) mapStatsTop[i].style.top = "87px"
				for (var i = 0; i < mapStatsBot.length; i++) mapStatsBot[i].style.top = "106px"
				// Stars
				for (var i = 0; i < blueStars.length; i++) {
					blueStars[i].style.top = "88px";
					blueStars[i].style.left = `${740 - (i * 50)}px`;
					purpleStars[i].style.top = "88px";
					purpleStars[i].style.right = `${728 - (i * 50)}px`;
				}
				// Team Names
				for (var i = 0; i < teamNames.length; i++) {
					teamNames[i].style.top = "10px"
					teamNames[i].style.width = "max-content"
					teamNames[i].style.fontSize = "31px"
					teamNames[i].style.transform = "translateX(0)"
				}
				teamBlueName.style.left = "170px"
				teamPurpleName.style.right = "185px"
				teamBlueName.style.textShadow = "0px 0px 0px #ffffff"
				teamPurpleName.style.textShadow = "0px 0px 0px #ffffff"
				// Team Flags
				for (var i = 0; i < teamFlags.length; i++) teamFlags[i].style.height = "70px";
				teamBlueFlag.style.top = "20px"
				teamBlueFlag.style.left = "50px"
				teamPurpleFlag.style.left = "1785px"
				teamPurpleFlag.style.top = "-50px"
				// Chat
				chats.style.bottom = "10px"
				chats.style.height = "130px"
				// Sponsors
				sponsor.style.opacity = 1;
				mappoolSponsor.style.opacity = 0;
				// Gameplay Names
				gameplayNames.style.opacity = 1;
				mappool.style.opacity = 0;

				viewState = 0;
			},10000)
		}
		break;
	}


}
function rollWinner() {
	if (setRollWinner.value == "blue") nextAction.innerText = "Purple Protect"
	else if (setRollWinner.value == "purple") nextAction.innerText = "Blue Protect"
}
function setCardInfo(element, map) {
	element.children[1].innerText = `${map.mod.toUpperCase()}${map.order}`
	element.style.backgroundImage =  `url("${map.imgURL}")`
}

// Setting Changes
function setAction() {
	// Set current action
	currentActionMapControl = setActionElement.value

	// Remove Children that are not needed
	removeMapControlElements("navigation")

	// Question of which teams
	let selectTeamOptionText = document.createElement("div")
	selectTeamOptionText.innerText = "Which Team?"
	let selectTeamOptions = document.createElement("select")
	let blueTeamOption = document.createElement("option")
	let purpleTeamOption = document.createElement("option")
	let selectTeamOptionBRPost = document.createElement("br")
	let selectTeamOptionBRPost2 =  document.createElement("br")

	selectTeamOptionText.setAttribute("id","selectTeamOptionText")
	selectTeamOptions.setAttribute("id","selectTeamOptions")
	selectTeamOptionBRPost.setAttribute("id","selectTeamOptionBRPost")
	selectTeamOptionBRPost2.setAttribute("id","selectTeamOptionBRPost2")

	selectTeamOptions.classList.add("mapControlSelect")
	blueTeamOption.setAttribute("value", "blue")
	blueTeamOption.innerText = "Blue"
	purpleTeamOption.setAttribute("value", "purple")
	purpleTeamOption.innerText = "Purple"

	mapControl.append(selectTeamOptionText)
	mapControl.append(selectTeamOptions)
	selectTeamOptions.append(blueTeamOption)
	selectTeamOptions.append(purpleTeamOption)
	mapControl.append(selectTeamOptionBRPost)
	mapControl.append(selectTeamOptionBRPost2)
	selectTeamOptions.setAttribute("size",selectTeamOptions.childElementCount)

	if ((setActionElement.value == "removeBan" && banTotalNum == 1) || setActionElement.value == "removeProtect") {
		let applyChangesButton = document.createElement("button")
		applyChangesButton.setAttribute("class", "panelButton resetButton")
		applyChangesButton.setAttribute("onclick", "applyChanges()")
		applyChangesButton.innerText = "Apply Changes"
		mapControl.append(applyChangesButton)
	} else {
		selectTeamOptions.setAttribute("onchange","setTeam()")
		setTeam()
	}
}

function setTeam() {
	currentTeamMapControl = document.getElementById("selectTeamOptions").value

	// Remove Elements not needed
	removeMapControlElements("selectTeamOptionBRPost2")

	// Ask for map
	let selectMapOptionText = document.createElement("div")
	selectMapOptionText.innerText = "Which Map?"
	let selectMapOptions = document.createElement("div")
	let selectMapOptionsBRPost = document.createElement("br")
	let selectMapOptionsBRPost2 = document.createElement("br")

	selectMapOptionText.setAttribute("id","selectMapOptionText")
	selectMapOptions.setAttribute("id","selectMapOptions")
	selectMapOptionsBRPost.setAttribute("id","selectMapOptionsBRPost")
	selectMapOptionsBRPost2.setAttribute("id","selectMapOptionsBRPost2")

	selectMapOptions.classList.add("mapControlSelect")

	if (currentActionMapControl == "setProtect" || currentActionMapControl == "setBan" || currentActionMapControl == "setPick") {
		for (var i = 0; i < allMaps.length; i++) {
			for (var j = 0; j < allMaps[i].length; j++) {
				let selectMapOptionIndividual = document.createElement("button")
				selectMapOptionIndividual.innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
				selectMapOptionIndividual.classList.add("selectMapOptionButton")
				selectMapOptionIndividual.setAttribute("onclick",`setCurrentMapMapControl(${allMaps[i][j].beatmapID})`)
				selectMapOptionIndividual.setAttribute("id",`${allMaps[i][j].beatmapID}MapMapControl`)
				selectMapOptions.append(selectMapOptionIndividual)
			}
		}
	} else if (currentActionMapControl == "removeBan") {
		if (currentTeamMapControl == "blue") {
			for (var i = 0; i < banCardBlueIDs.length; i++) {
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (allMaps[j][k].beatmapID == banCardBlueIDs[i]) {
							let selectMapOptionIndividual = document.createElement("button")
							selectMapOptionIndividual.innerText = `${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
							selectMapOptionIndividual.classList.add("selectMapOptionButton")
							selectMapOptionIndividual.setAttribute("onclick",`setCurrentMapMapControl(${allMaps[j][k].beatmapID})`)
							selectMapOptionIndividual.setAttribute("id",`${allMaps[j][k].beatmapID}MapMapControl`)
							selectMapOptions.append(selectMapOptionIndividual)
							break;
						}
					}
				}
			}
		} else if (currentTeamMapControl == "purple") {
			for (var i = 0; i < banCardPurpleIDs.length; i++) {
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (allMaps[j][k].beatmapID == banCardPurpleIDs[i]) {
							let selectMapOptionIndividual = document.createElement("button")
							selectMapOptionIndividual.innerText = `${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
							selectMapOptionIndividual.classList.add("selectMapOptionButton")
							selectMapOptionIndividual.setAttribute("onclick",`setCurrentMapMapControl(${allMaps[j][k].beatmapID})`)
							selectMapOptionIndividual.setAttribute("id",`${allMaps[j][k].beatmapID}MapMapControl`)
							selectMapOptions.append(selectMapOptionIndividual)
						}
					}
				}
			}
		}
	}

	mapControl.append(selectMapOptionText)
	mapControl.append(selectMapOptions)
	mapControl.append(selectMapOptionsBRPost)
	mapControl.append(selectMapOptionsBRPost2)

	if (currentActionMapControl == "setBan") {
		let selectSlotOptionText = document.createElement("div")
		selectSlotOptionText.innerText = "Replacing Which Slot?"
		let selectSlotOptions = document.createElement("select")
		let ban1Option = document.createElement("option")
		let ban2Option = document.createElement("option")
		let selectSlotOptionBRPost = document.createElement("br")
		let selectSlotOptionBRPost2 = document.createElement("br")

		selectSlotOptionText.setAttribute("id","selectSlotOptionText")
		selectSlotOptions.setAttribute("id","selectSlotOptions")
		ban1Option.setAttribute("id","ban1Option")
		ban2Option.setAttribute("id","ban2Option")
		selectSlotOptionBRPost.setAttribute("id","selectSlotOptionBRPost")
		selectSlotOptionBRPost2.setAttribute("id","selectSlotOptionBRPost2")

		selectSlotOptions.classList.add("mapControlSelect")
		if (currentTeamMapControl == "blue") {
			for (var i = 0; i < banTotalNum; i++) {
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (allMaps[j][k].beatmapID == banCardBlueIDs[i]) {
							if (i == 0) {
								ban1Option.innerText = `Slot 1 - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
								ban1Option.setAttribute("value",`${allMaps[j][k].beatmapID}SlotMapControl`)
								ban1Option.setAttribute("onclick",`setCurrentMapSlotControl(${allMaps[j][k].beatmapID}, 1)`)
								currentSlotMapControl = allMaps[j][k].beatmapID
								currentSlotNumberMapControl = 1
							}
							else if (i == 1) {
								ban2Option.innerText = `Slot 2 - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
								ban2Option.setAttribute("value",`${allMaps[j][k].beatmapID}SlotMapControl`)
								ban2Option.setAttribute("onclick",`setCurrentMapSlotControl(${allMaps[j][k].beatmapID}, 2)`)
							}
						}
					}
				}
				if (!banCardBlueIDs[i] || banCardBlueIDs[i] == "") {
					if (i == 0) {
						ban1Option.innerText = `Slot 1 - No Map`
						ban1Option.setAttribute("value",`0SlotMapControl`)
						ban1Option.setAttribute("onclick",`setCurrentMapSlotControl(0, 1)`)
						currentSlotMapControl = 0
						currentSlotNumberMapControl = 1
					}
					else if (i == 1) {
						ban2Option.innerText = `Slot 2 - No Map`
						ban2Option.setAttribute("value",`0SlotMapControl`)
						ban2Option.setAttribute("onclick",`setCurrentMapSlotControl(0, 2)`)
					}
				}
			}
		} else if (currentTeamMapControl == "purple") {
			for (var i = 0; i < banTotalNum; i++) {
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (allMaps[j][k].beatmapID == banCardPurpleIDs[i]) {
							if (i == 0) {
								ban1Option.innerText = `Slot 1 - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
								ban1Option.setAttribute("value",`${allMaps[j][k].beatmapID}SlotMapControl`)
								ban1Option.setAttribute("onclick",`setCurrentMapSlotControl(${allMaps[j][k].beatmapID}, 1)`)
								currentSlotMapControl = allMaps[j][k].beatmapID
								currentSlotNumberMapControl = 1
							}
							else if (i == 1) {
								ban2Option.innerText = `Slot 2 - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
								ban2Option.setAttribute("value",`${allMaps[j][k].beatmapID}SlotMapControl`)
								ban2Option.setAttribute("onclick",`setCurrentMapSlotControl(${allMaps[j][k].beatmapID}, 2)`)
							}
						}
					}
				}
				if (!banCardPurpleIDs[i] || banCardPurpleIDs[i] == "") {
					if (i == 0) {
						ban1Option.innerText = `Slot 1 - No Map`
						ban1Option.setAttribute("value",`0SlotMapControl`)
						ban1Option.setAttribute("onclick",`setCurrentMapSlotControl(0, 1)`)
						currentSlotMapControl = 0
						currentSlotNumberMapControl = 1
					}
					else if (i == 1) {
						ban2Option.innerText = `Slot 2 - No Map`
						ban2Option.setAttribute("value",`0SlotMapControl`)
						ban2Option.setAttribute("onclick",`setCurrentMapSlotControl(0, 2)`)
					}
				}
			}
		}

		mapControl.append(selectSlotOptionText)
		mapControl.append(selectSlotOptions)
		selectSlotOptions.append(ban1Option)
		if (banTotalNum == 2) selectSlotOptions.append(ban2Option)
		mapControl.append(selectSlotOptionBRPost)
		mapControl.append(selectSlotOptionBRPost2)
		selectSlotOptions.setAttribute("size",selectSlotOptions.childElementCount)
	}
	
	if (currentActionMapControl == "removePick") {
		if (currentTeamMapControl == "blue") {
			for (var i = 0; i < pickCardBlueIDs.length; i++) {
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (pickCardBlueIDs[i] == allMaps[j][k].beatmapID) {
							let pickCardOption = document.createElement("button")
							pickCardOption.innerText = `${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
							pickCardOption.classList.add("selectMapOptionButton")
							pickCardOption.setAttribute("onclick",`setCurrentMapMapControl(${allMaps[j][k].beatmapID})`)
							pickCardOption.setAttribute("id",`${allMaps[j][k].beatmapID}MapMapControl`)
							selectMapOptions.append(pickCardOption)
						}
					}
				}
			}
		} else if (currentTeamMapControl == "purple") {
			for (var i = 0; i < pickCardPurpleIDs.length; i++) {
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (pickCardPurpleIDs[i] == allMaps[j][k].beatmapID) {
							let pickCardOption = document.createElement("button")
							pickCardOption.innerText = `${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
							pickCardOption.classList.add("selectMapOptionButton")
							pickCardOption.setAttribute("onclick",`setCurrentMapMapControl(${allMaps[j][k].beatmapID})`)
							pickCardOption.setAttribute("id",`${allMaps[j][k].beatmapID}MapMapControl`)
							selectMapOptions.append(pickCardOption)
						}
					}
				}
			}
		}
	}

	if (currentActionMapControl == "setPick") {
		let selectSlotOptionText = document.createElement("div")
		selectSlotOptionText.innerText = "Replacing Which Slot?"
		let selectSlotOptions = document.createElement("select")
		let selectSlotOptionBRPost = document.createElement("option")

		selectSlotOptionText.setAttribute("id","selectSlotOptionText")
		selectSlotOptions.setAttribute("id","seletSlotOptions")
		selectSlotOptionBRPost.setAttribute("id","selectSlotOptionBRPost")
		selectSlotOptions.classList.add("mapControlSelect")

		if (currentTeamMapControl == "blue") {
			let pickCardBlue = document.getElementsByClassName("pickCardBlue")
			for (var i = 0; i < pickCardBlue.length; i++) {
				let selectPickCardOption = document.createElement("option")
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (pickCardBlueIDs[i] == allMaps[j][k].beatmapID) {
							
							selectPickCardOption.setAttribute("value",`${allMaps[j][k].beatmapID}SlotMapControl`)
							selectPickCardOption.innerText = `Slot ${i + 1} - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
							selectPickCardOption.setAttribute("onclick",`setCurrentMapSlotControl(${allMaps[j][k].beatmapID}, ${i + 1})`)
							if (i == 0) {
								currentSlotMapControl = allMaps[j][k].beatmapID
								currentSlotNumberMapControl = 1
							}
						}
					}
				}
				if (!pickCardBlueIDs[i]) {
					selectPickCardOption.innerText = `Slot ${i + 1} - No Map`
					selectPickCardOption.setAttribute("value","0SlotMapControl")
					selectPickCardOption.setAttribute("onclick",`setCurrentMapSlotControl(0, ${i + 1})`)
					if (i == 0) {
						currentSlotMapControl = 0
						currentSlotNumberMapControl = 1
					}
				}
				selectSlotOptions.append(selectPickCardOption)
			}
		} else if (currentTeamMapControl == "purple") {
			let pickCardPurple = document.getElementsByClassName("pickCardPurple")
			for (var i = 0; i < pickCardPurple.length; i++) {
				let selectPickCardOption = document.createElement("option")
				for (var j = 0; j < allMaps.length; j++) {
					for (var k = 0; k < allMaps[j].length; k++) {
						if (pickCardPurpleIDs[i] == allMaps[j][k].beatmapID) {
							selectPickCardOption.setAttribute("value",`${allMaps[j][k].beatmapID}SlotMapControl`)
							selectPickCardOption.innerText = `Slot ${i + 1} - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
							selectPickCardOption.setAttribute("onclick",`setCurrentMapSlotControl(${allMaps[j][k].beatmapID}, ${i + 1})`)
							if (i == 0) {
								currentSlotMapControl = allMaps[j][k].beatmapID
								currentSlotNumberMapControl = 1
							}
						}
					}
				}
				if (!pickCardPurpleIDs[i]) {
					selectPickCardOption.innerText = `Slot ${i + 1} - No Map`
					selectPickCardOption.setAttribute("value","0SlotMapControl")
					selectPickCardOption.setAttribute("onclick",`setCurrentMapSlotControl(0, ${i + 1})`)
					if (i == 0) {
						currentSlotMapControl = 0
						currentSlotNumberMapControl = 1
					}
				}
				selectSlotOptions.append(selectPickCardOption)
			}
		}
		mapControl.append(selectSlotOptionText)
		mapControl.append(selectSlotOptions)
		mapControl.append(selectSlotOptionBRPost)
		selectSlotOptions.setAttribute("size", selectSlotOptions.childElementCount)
	}

	if (currentActionMapControl == "setWinner") {
		if (document.contains(document.getElementById("selectMapOptions"))) document.getElementById("selectMapOptions").remove()

		let selectMapOptions = document.createElement("select")
		selectMapOptions.classList.add("mapControlSelect")
		selectMapOptions.setAttribute("id","selectMapOptionsSelect")
		for (var i = 0; i < pickCardBlueIDs.length; i++) {
			for (var j = 0; j < allMaps.length; j++) {
				for (var k = 0; k < allMaps[j].length; k++) {
					if (allMaps[j][k].beatmapID == pickCardBlueIDs[i]) {
						let selectMapOptionIndividual = document.createElement("option")
						selectMapOptionIndividual.innerText = `Blue Pick - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`
						selectMapOptions.append(selectMapOptionIndividual)
					}
				}
			}
		}
		for (var i = 0; i < pickCardPurpleIDs.length; i++) {
			for (var j = 0; j < allMaps.length; j++) {
				for (var k = 0; k < allMaps[j].length; k++) {
					if (allMaps[j][k].beatmapID == pickCardPurpleIDs[i]) {
						let selectMapOptionIndividual = document.createElement("option")
						selectMapOptionIndividual.innerText = `Purple Pick - ${allMaps[j][k].mod.toUpperCase()}${allMaps[j][k].order}`

						selectMapOptions.append(selectMapOptionIndividual)
					}
				}
			}
		}
		selectMapOptions.setAttribute("size",selectMapOptions.childElementCount)
		document.getElementById("selectMapOptionText").after(selectMapOptions)
	}

	let applyChangesButton = document.createElement("button")
	applyChangesButton.setAttribute("class", "panelButton resetButton")
	applyChangesButton.setAttribute("onclick", "applyChanges()")
	applyChangesButton.innerText = "Apply Changes"
	mapControl.append(applyChangesButton)
}

function setCurrentMapMapControl(beatmapID) {
	let selectMapOptionButtons = document.getElementsByClassName("selectMapOptionButton")
	
	for (var i = 0; i < selectMapOptionButtons.length; i++) {
		selectMapOptionButtons[i].style.backgroundColor = "transparent"
		selectMapOptionButtons[i].style.color ="rgb(180,180,180)"
	}

	let currentMap = document.getElementById(`${beatmapID}MapMapControl`)
	currentMap.style.backgroundColor = "rgb(206, 206, 206)"
	currentMap.style.color = "black"
	
	currentMapMapControl = beatmapID
}

function setCurrentMapSlotControl(slotmap, slotnum) {
	currentSlotMapControl = slotmap
	currentSlotNumberMapControl = slotnum
}

function applyChanges() {
	currentTeamMapControl = document.getElementById("selectTeamOptions").value

	// Remove Protect
	if (currentActionMapControl == "removeProtect") {
		if (currentTeamMapControl == "blue") {
			document.getElementById(`${protectCardBlueID}Button`).style.backgroundColor = "#FFFFFF"
			protectCardBlueID = null
			protectCardBlue.style.backgroundImage = "none"
			protectCardBlueText.innerText = ""
			blueProtectNum--
			if (blueProtectNum < 0) blueProtectNum = 0
		}
		else if (currentTeamMapControl == "purple") {
			document.getElementById(`${protectCardPurpleID}Button`).style.backgroundColor = "#FFFFFF"
			protectCardPurpleID = null
			protectCardPurple.style.backgroundImage = "none"
			protectCardPurpleText.innerText = ""
			purpleProtectNum--
			if (purpleProtectNum < 0) purpleProtectNum = 0
		}
	} else if (currentActionMapControl == "setProtect") {
		let savePreviousNextAction = `${nextAction.innerText}`
		if (currentTeamMapControl == "blue") {
			nextAction.innerText = "Blue Protect"
			document.getElementById(`${currentMapMapControl}Button`).click()
		} else if (currentTeamMapControl == "purple") {
			nextAction.innerText = "Purple Protect"
			document.getElementById(`${currentMapMapControl}Button`).click()
		}
		nextAction.innerText = savePreviousNextAction
	} else if (currentActionMapControl == "removeBan" && banTotalNum == 1) {
		if (currentTeamMapControl == "blue") {
			document.getElementById(`${banCardBlueIDs[0]}Button`).style.backgroundColor = "#FFFFFF"
			banCardBlueIDs[0] = null
			banCardBlue[0].style.backgroundImage = "none"
			if (banCardBlue[0].children[1].innerText !== "") {
				banCardBlue[0].children[1].innerText = ""
				banNum--
			}
		} else if (currentTeamMapControl == "purple") {
			document.getElementById(`${banCardPurpleIDs[0]}Button`).style.backgroundColor = "#FFFFFF"
			banCardPurpleIDs[0] = null
			banCardPurple[0].style.backgroundImage = "none"
			if (banCardPurple[0].children[1].innerText !== "") {
				banCardPurple[0].children[1].innerText = ""
				banNum--
			}
		}
	} else if (currentActionMapControl == "removeBan" && banTotalNum == 2) {
		if (currentTeamMapControl == "blue") {
			for (var i = 0; i < banCardBlueIDs.length; i++) {
				if (currentMapMapControl == banCardBlueIDs[i]) {
					document.getElementById(`${banCardBlueIDs[i]}Button`).style.backgroundColor = "#FFFFFF"
					banCardBlue[i].style.backgroundImage = "none"
					document.getElementById(`${banCardBlueIDs[i]}MapMapControl`).remove()
					banCardBlue[i].children[1].innerText = ""
					banCardBlueIDs[i] = null
					banNum--				
					break
				}
			}
		} else if (currentTeamMapControl == "purple") {
			for (var i = 0; i < banCardPurpleIDs.length; i++) {
				if (currentMapMapControl == banCardPurpleIDs[i]) {
					document.getElementById(`${banCardPurpleIDs[i]}Button`).style.backgroundColor = "#FFFFFF"
					banCardPurple[i].style.backgroundImage = "none"
					document.getElementById(`${banCardPurpleIDs[i]}MapMapControl`).remove()
					banCardPurple[i].children[1].innerText = ""
					banCardPurpleIDs[i] = null
					banNum--
					break
				}
			}
		}

		// Remove Children That are not needed
		let selectMapOptionButtons = document.getElementsByClassName("selectMapOptionButton")
		if (selectMapOptionButtons.length == 0) removeMapControlElements("selectTeamOptionBRPost2")
		if (banNum <= 0) removeMapControlElements("navigation")
	} else if (currentActionMapControl == "setBan") {
		if (currentTeamMapControl == "blue") {
			if (currentSlotNumberMapControl == 1) { 
				if (document.contains(document.getElementById(`${banCardBlueIDs[0]}Button`))) document.getElementById(`${banCardBlueIDs[0]}Button`).style.backgroundColor = "#FFFFFF"
				banCardBlueIDs[0] = currentMapMapControl
				let map = document.getElementById(`${currentMapMapControl}Button`)
				map.style.backgroundColor = "rgb(248, 131, 121)"
				for (var i = 0; i < allMaps.length; i++) {
					for (var j = 0; j < allMaps[i].length; j++) {
						if (allMaps[i][j].beatmapID == currentMapMapControl) {
							banCardBlue[0].style.backgroundImage = `url(${allMaps[i][j].imgURL})`
							banCardBlue[0].children[1].innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
							ban1Option.innerText = `Slot 1 - ${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
						}
					}
				}
			} else if (currentSlotNumberMapControl == 2) {
				if (document.contains(document.getElementById(`${banCardBlueIDs[1]}Button`))) document.getElementById(`${banCardBlueIDs[1]}Button`).style.backgroundColor = "#FFFFFF"
				banCardBlueIDs[1] = currentMapMapControl
				let map = document.getElementById(`${currentMapMapControl}Button`)
				map.style.backgroundColor = "rgb(248, 131, 121)"
				for (var i = 0; i < allMaps.length; i++) {
					for (var j = 0; j < allMaps[i].length; j++) {
						if (allMaps[i][j].beatmapID == currentMapMapControl) {
							banCardBlue[1].style.backgroundImage = `url(${allMaps[i][j].imgURL})`
							banCardBlue[1].children[1].innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
							ban2Option.innerText = `Slot 2 - ${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
						}
					}
				}
			}
		} else if (currentTeamMapControl == "purple") {
			if (currentSlotNumberMapControl == 1) { 
				if (document.contains(document.getElementById(`${banCardPurpleIDs[0]}Button`))) document.getElementById(`${banCardPurpleIDs[0]}Button`).style.backgroundColor = "#FFFFFF"
				banCardPurpleIDs[0] = currentMapMapControl
				let map = document.getElementById(`${currentMapMapControl}Button`)
				map.style.backgroundColor = "rgb(248, 131, 121)"
				for (var i = 0; i < allMaps.length; i++) {
					for (var j = 0; j < allMaps[i].length; j++) {
						if (allMaps[i][j].beatmapID == currentMapMapControl) {
							banCardPurple[0].style.backgroundImage = `url(${allMaps[i][j].imgURL})`
							banCardPurple[0].children[1].innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
							ban1Option.innerText = `Slot 1 - ${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
						}
					}
				}
			} else if (currentSlotNumberMapControl == 2) {
				if (document.contains(document.getElementById(`${banCardPurpleIDs[1]}Button`))) document.getElementById(`${banCardPurpleIDs[1]}Button`).style.backgroundColor = "#FFFFFF"
				banCardPurpleIDs[1] = currentMapMapControl
				let map = document.getElementById(`${currentMapMapControl}Button`)
				map.style.backgroundColor = "rgb(248, 131, 121)"
				for (var i = 0; i < allMaps.length; i++) {
					for (var j = 0; j < allMaps[i].length; j++) {
						if (allMaps[i][j].beatmapID == currentMapMapControl) {
							banCardPurple[1].style.backgroundImage = `url(${allMaps[i][j].imgURL})`
							banCardPurple[1].children[1].innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
							ban2Option.innerText = `Slot 2 - ${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
						}
					}
				}
			}
		}
	} else if (currentActionMapControl == "removePick") {
		if (currentTeamMapControl == "blue") {
			for (var i = 0; i < pickCardBlueIDs.length; i++) {
				if (currentMapMapControl == pickCardBlueIDs[i]) {
					document.getElementById(`${pickCardBlueIDs[i]}Button`).style.backgroundColor = "#FFFFFF"
					let pickCardBlue = document.getElementsByClassName("pickCardBlue")
					pickCardBlue[i].style.backgroundImage = "none"
					pickCardBlue[i].children[1].innerText = ""
					document.getElementById(`${pickCardBlueIDs[i]}MapMapControl`).remove()
					pickCardBlueIDs[i] = null
					break
				}
			}
		} else if (currentTeamMapControl == "purple") {
			for (var i = 0; i < pickCardPurpleIDs.length; i++) {
				if (currentMapMapControl == pickCardPurpleIDs[i]) {
					document.getElementById(`${pickCardPurpleIDs[i]}Button`).style.backgroundColor = "#FFFFFF"
					let pickCardPurple = document.getElementsByClassName("pickCardPurple")
					pickCardPurple[i].style.backgroundImage = "none"
					pickCardPurple[i].children[1].innerText = ""
					document.getElementById(`${pickCardPurpleIDs[i]}MapMapControl`).remove()
					pickCardPurpleIDs[i] = null
					break
				}
			}
		}
	} else if (currentActionMapControl == "setPick") {
		if (currentTeamMapControl == "blue") {
			let pickCardBlue = document.getElementsByClassName("pickCardBlue")
			let currentMapCard = pickCardBlue[currentSlotNumberMapControl - 1]
			let currentMapID = pickCardBlueIDs[currentSlotNumberMapControl - 1]

			// Setting the current map ID
			if (document.contains(document.getElementById(`${currentMapID}Button`))) document.getElementById(`${currentMapID}Button`).style.backgroundColor = "#FFFFFF"
			pickCardBlueIDs[currentSlotNumberMapControl - 1] = currentMapMapControl
			document.getElementById(`${pickCardBlueIDs[currentSlotNumberMapControl - 1]}Button`).style.backgroundColor = "var(--blue)"

			// Changing Card Information and Map Control Info
			let seletSlotOptions = document.getElementById("seletSlotOptions")

			for (var i = 0; i < allMaps.length; i++) {
				for (var j = 0; j < allMaps[i].length; j++) {
					if (allMaps[i][j].beatmapID == currentMapMapControl) {
						currentMapCard.style.backgroundImage = `url("${allMaps[i][j].imgURL}")`
						currentMapCard.children[1].innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
						seletSlotOptions.children[currentSlotNumberMapControl - 1].innerText = `Slot ${currentSlotNumberMapControl} - ${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
					}
				}
			}
		} else if (currentTeamMapControl == "purple") {
			let pickCardPurple = document.getElementsByClassName("pickCardPurple")
			let currentMapCard = pickCardPurple[currentSlotNumberMapControl - 1]
			let currentMapID = pickCardPurpleIDs[currentSlotNumberMapControl - 1]

			// Setting the current map ID
			if (document.contains(document.getElementById(`${currentMapID}Button`))) document.getElementById(`${currentMapID}Button`).style.backgroundColor = "#FFFFFF"
			pickCardPurpleIDs[currentSlotNumberMapControl - 1] = currentMapMapControl
			document.getElementById(`${pickCardPurpleIDs[currentSlotNumberMapControl - 1]}Button`).style.backgroundColor = "var(--purple)"

			// Changing Card Information and Map Control Info
			let seletSlotOptions = document.getElementById("seletSlotOptions")

			for (var i = 0; i < allMaps.length; i++) {
				for (var j = 0; j < allMaps[i].length; j++) {
					if (allMaps[i][j].beatmapID == currentMapMapControl) {
						currentMapCard.style.backgroundImage = `url("${allMaps[i][j].imgURL}")`
						currentMapCard.children[1].innerText = `${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
						seletSlotOptions.children[currentSlotNumberMapControl - 1].innerText = `Slot ${currentSlotNumberMapControl} - ${allMaps[i][j].mod.toUpperCase()}${allMaps[i][j].order}`
					}
				}
			}
		}
	} else if (currentActionMapControl == "setWinner") {
		let selectMapOptions = document.getElementById("selectMapOptionsSelect")
		let selectMapOptionsValue = selectMapOptions.value.slice(-3)
		let pickCards = document.getElementsByClassName("pickCard")

		for (var i = 0; i < pickCards.length; i++) {
			if (pickCards[i].children[1].innerText.trim().toUpperCase() == selectMapOptionsValue) {

				if (currentTeamMapControl == "blue") pickCards[i].children[0].style.borderColor = "#75c6ea"
				else if (currentTeamMapControl == "purple") pickCards[i].children[0].style.borderColor = "#936bf7"
			}
		}
	}
}

function removeMapControlElements(elementIDName) {
	let removeStartingChild
	for (var i = 0; i < mapControl.childElementCount; i++) if (mapControl.children[i].id == elementIDName) removeStartingChild = i
	for (var i = mapControl.childElementCount - 1; i  > removeStartingChild; i--) mapControl.children[i].remove()
}

function toWinScreen(){
	if (scoreBlueTemp == bestOfTemp && scorePurpleTemp < bestOfTemp) {
		winnerRoster1.innerHTML = teamNameBluePlayer1Temp
		winnerRoster2.innerHTML = teamNameBluePlayer2Temp
		winnerRoster3.innerHTML = teamNameBluePlayer3Temp
		winnerRoster4.innerHTML = teamNameBluePlayer4Temp
		winnerRoster5.innerHTML = teamNameBluePlayer5Temp
		winnerRoster6.innerHTML = teamNameBluePlayer6Temp
		winnerRoster7.innerHTML = teamNameBluePlayer7Temp
		if (teamNameBluePlayer8Temp == 'undefined' || teamNameBluePlayer8Temp == undefined){ winnerRoster8.innerHTML = ""}
		else {winnerRoster8.innerHTML = teamNameBluePlayer8Temp}
		
		winnerFlag.style.backgroundImage = `url("static/flags/${teamNameBlueTemp}.png")`
		winnerName.innerHTML = `${teamNameBlueTemp} wins!`
		winnerName.style.textShadow = "0px 0px 10px var(--blue75Opacity), 0px 0px 20px var(--blue75Opacity), 0px 0px 30px var(--blue75Opacity)"
		winVideoPurple.style.opacity = 0;
		winVideoBlue.style.opacity = 1;
		winVideoBlue.setAttribute('loop','true');
		winVideoBlue.currentTime = 0;
		winVideoBlue.play();

	}
	else if (scorePurpleTemp == bestOfTemp && scoreBlueTemp < bestOfTemp) {
		winnerRoster1.innerHTML = teamNamePurplePlayer1Temp
		winnerRoster2.innerHTML = teamNamePurplePlayer2Temp
		winnerRoster3.innerHTML = teamNamePurplePlayer3Temp
		winnerRoster4.innerHTML = teamNamePurplePlayer4Temp
		winnerRoster5.innerHTML = teamNamePurplePlayer5Temp
		winnerRoster6.innerHTML = teamNamePurplePlayer6Temp
		winnerRoster7.innerHTML = teamNamePurplePlayer7Temp
		if (teamNamePurplePlayer8Temp == 'undefined' || teamNamePurplePlayer8Temp == undefined){ winnerRoster8.innerHTML = ""}
		else {winnerRoster8.innerHTML = teamNamePurplePlayer8Temp}
		winnerFlag.style.backgroundImage = `url("static/flags/${teamNamePurpleTemp}.png")`
		winnerName.innerHTML = `${teamNamePurpleTemp} wins!`
		winnerName.style.textShadow = "0px 0px 10px var(--purple75Opacity), 0px 0px 20px var(--purple75Opacity), 0px 0px 30px var(--purple75Opacity)"
		winVideoPurple.style.opacity = 1;
		winVideoBlue.style.opacity = 0;
		winVideoPurple.setAttribute('loop','true');
		winVideoPurple.currentTime = 0;
		winVideoPurple.play();
	}
	else {
		winnerRoster1.innerHTML = ""
		winnerRoster2.innerHTML = ""
		winnerRoster3.innerHTML = ""
		winnerRoster4.innerHTML = ""
		winnerRoster5.innerHTML = ""
		winnerRoster6.innerHTML = ""
		winnerRoster7.innerHTML = ""
		winnerRoster8.innerHTML = ""
		winnerFlag.style.backgroundImage = ``
		winnerName.innerHTML = `No Winner`
		winnerName.style.textShadow = 'none'

	}
	winVideoText.currentTime = 0;
	winVideoText.play();
	winScreen.style.opacity = 1;
}

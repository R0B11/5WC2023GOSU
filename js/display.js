let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws");
let mapid = document.getElementById('mapid');

// NOW PLAYING
let mapContainer = document.getElementById("mapContainer");
let mapTitleWrapper = document.getElementById("mapTitleWrapper");
let mapTitleWrapper2 = document.getElementById("mapTitleWrapper2");
let mapTitle = document.getElementById("mapTitle");
let mapTitle1 = document.getElementById("mapTitle1");
let mapTitle2 = document.getElementById("mapTitle2");

// TEAM OVERALL SCORE
let teamBlueName = document.getElementById("teamBlueName");
let teamPurpleName = document.getElementById("teamPurpleName");
// MOVING SCORE BAR
let movingScoreBars = document.getElementById("movingScoreBars");
let movingScoreBarBlue = document.getElementById("movingScoreBarBlue");
let movingScoreBarPurple = document.getElementById("movingScoreBarPurple");

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

// MAP STATS
let mapStatsCS = document.getElementById("mapStatsCS");
let mapStatsAR = document.getElementById("mapStatsAR");
let mapStatsOD = document.getElementById("mapStatsOD");
let mapStatsLEN = document.getElementById("mapStatsLEN");
let mapStatsSR = document.getElementById("mapStatsSR");
let mapStatsBPM = document.getElementById("mapStatsBPM");

// TOP SECTION
let topSection = document.getElementById("top");
let gameplaySection = document.getElementById("gameplay");

socket.onopen = () => {
    console.log("Successfully Connected");
};

let animation = {
    playScoreBlue:  new CountUp('playScoreBlue', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    playScorePurple:  new CountUp('playScorePurple', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
}

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

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

let scoreBlueTemp = 0
let scorePurpleTemp = 0
let teamNameBlueTemp;
let teamNamePurpleTemp;
let gameState;
let isFreemod = true;

let playScoreBlueTemp = 0
let playScorePurpleTemp = 0

let numOfClients
let starEvent 

let chatLen = 0;
let tempClass = 'unknown';

let nextAction = document.getElementById("nextAction");
let roundText = document.getElementById("round");

socket.onmessage = async event => {
    let data = JSON.parse(event.data);
	console.log(data)

	if(scoreVisibleTemp !== data.tourney.manager.bools.scoreVisible) {
		scoreVisibleTemp = data.tourney.manager.bools.scoreVisible;
		if(scoreVisibleTemp) {
			// Score visible -> Set bg bottom to full
			movingScoreBars.style.opacity = 1;
			chats.style.opacity = 0;
			playScoreBlue.style.opacity = 1;
			playScorePurple.style.opacity = 1;
		} else {
			// Score invisible -> Set bg to show chats
			movingScoreBars.style.opacity = 0;
			chats.style.opacity = 1;
			playScoreBlue.style.opacity = 0;
			playScorePurple.style.opacity = 0;
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
				console.log(starsVisibleTemp)
			}
		} else {
			for (var i = blueStars.length - 1; i >= 0; i--) {
				blueStars[i].style.opacity = 0;
				purpleStars[i].style.opacity = 0;
				await new Promise(r => setTimeout(r, 500));
				console.log(starsVisibleTemp)
			}
			scorePurple.style.display = "none";
			scoreBlue.style.display = "none";
		}
	}
	if (tempMapID !== data.menu.bm.id) {
		// MAP ID
		tempMapID = data.menu.bm.id
		await new Promise(r => setTimeout(r, 1000));
		// MAP MAIN SECTION
		tempImg = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/');
		mapContainer.style.backgroundImage = `url('http://` + location.host + `/Songs/${tempImg}?a=${Math.random(10000)}')`;
		
		// MAP TEXT
		let replaceText = new Promise((resolve, reject) => {
			tempMapTitle = `${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title} [${data.menu.bm.metadata.difficulty}]`.replaceAll("(", "( ").replaceAll(")", " )").replaceAll("[", "[ ").replaceAll("]", " ]")
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
		let getMaps = new Promise((resolve, reject) => {
			let allMaps = getAllBeatmaps();
			console.log(allMaps);
			resolve(allMaps); 
		})

		getMaps.then((allMaps => {
			
			for (var i = 0; i < allMaps.length; i++) {
				for (var j = 0; j < allMaps[i].length; j++) {
						if (allMaps[i][j].beatmapID == data.menu.bm.id) {
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
						}
						if (foundMapFromMappool) break;
				}
				if (foundMapFromMappool) break;
			}
		}))
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
		} else {
			if (tempMapStatsBPM !== data.menu.bm.stats.BPM.min) mapStatsBPM.innerText = data.menu.bm.stats.BPM.min
		}
		if (tempMapStatsSR !== data.menu.bm.stats.SR) mapStatsSR.innerText = Math.round((parseFloat(data.menu.bm.stats.SR) + Number.EPSILON) * 10) / 10;
	}
	if(teamNameBlueTemp !== data.tourney.manager.teamName.left) {
		teamNameBlueTemp = data.tourney.manager.teamName.left;
		teamBlueName.innerHTML = teamNameBlueTemp;
		if (teamNameBlueTemp !== "") {
			teamBlueFlag.style.backgroundImage = `url("static/flags/${teamNameBlueTemp}.png")`
		} else {
			teamBlueFlag.style.backgroundImage = null
		}
	}
	if(teamNamePurpleTemp !== data.tourney.manager.teamName.right) {
		teamNamePurpleTemp = data.tourney.manager.teamName.right;
		teamPurpleName.innerHTML = teamNamePurpleTemp;
		if (teamNamePurpleTemp !== "") {
			teamPurpleFlag.style.backgroundImage = `url("static/flags/${teamNamePurpleTemp}.png")`
		} else {
			teamPurpleFlag.style.backgroundImage = null
		}
	}
	if (numOfClients !== data.tourney.ipcClients.length) numOfClients = data.tourney.ipcClients.length
	if (ipcState !== data.tourney.manager.ipcState) {
		ipcState = data.tourney.manager.ipcState
		if (ipcState == 1) pointAwarded = false;
		else if (ipcState == 4) {
			if (pointAwarded == false) {
				pointAwarded = true;
				if (playScoreBlueTemp > playScorePurpleTemp) blueStarControlPlus.click()
				else if (playScoreBlueTemp < playScorePurpleTemp) purpleStarControlPlus.click()
				else if (playScoreBlueTemp == playScorePurpleTemp) {
					let blueTeamAccuracy = 0;
					let purpleTeamAccuracy = 0;

					for (var i = 0; i < numOfClients; i++) {
						let currentAccuracy = parseFloat(data.tourney.ipcClients[i].gameplay.accuracy)
						if (i < numOfClients / 2) blueTeamAccuracy += currentAccuracy
						else purpleTeamAccuracy += currentAccuracy
					}

					if (blueTeamAccuracy > purpleTeamAccuracy) blueStarControlPlus.click()
					else if (blueTeamAccuracy < purpleTeamAccuracy) purpleStarControlPlus.click()
				}
			}
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
				if (data.tourney.ipcClients[i].gameplay.mods.str.includes("EZHD")) tempScore = tempScore * 1.9
				else if (data.tourney.ipcClients[i].gameplay.mods.str.includes("EZ")) tempScore = tempScore * 1.75
				else if (data.tourney.ipcClients[i].gameplay.mods.str.includes("HDHR")) tempScore = tempScore * 1.03
				else if (data.tourney.ipcClients[i].gameplay.mods.str.includes("HR")) tempScore = tempScore * 1.05
				// Separate FL as that gets added on top of the current multipliers(?)
				if (data.tourney.ipcClients[i].gameplay.mods.str.includes("FL")) tempScore = tempScore * 1.4
				if (i < numOfClients / 2) playScoreBlueTemp += tempScore 
				else playScorePurpleTemp += tempScore  
			}
		} else {
			playScoreBlueTemp = data.tourney.manager.gameplay.score.left;
			playScorePurpleTemp = data.tourney.manager.gameplay.score.right;
		}

		playScoreBlueTemp = parseInt(playScoreBlueTemp);
		playScorePurpleTemp = parseInt(playScorePurpleTemp); 

		animation.playScoreBlue.update(playScoreBlueTemp);
		animation.playScorePurple.update(playScorePurpleTemp);

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
		} else if (playScoreBlueTemp == playScorePurpleTemp) {
			// Tie
			playScoreBlue.style.fontSize = "40px";
			playScoreBlue.style.color = "#fff";
			playScorePurple.style.fontSize = "40px";
			playScorePurple.style.color = "#fff";

			movingScoreBarBlue.style.width = "0px";
			movingScoreBarPurple.style.width = "0px";
		} else {
			// Purple is leading
			playScoreBlue.style.fontSize = "40px";
			playScoreBlue.style.color = "#fff";
			playScorePurple.style.fontSize = "45px";
			playScorePurple.style.color = "#936bf7";

			movingScoreBarBlue.style.width = "0px";
			movingScoreBarPurple.style.width = `${widthOfScoreBar}px`;
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

}

function changeAction(actionText) { nextAction.innerText = actionText; }
function changeRound(round) {
	// Changing Round Text
	roundText.innerText = round;

	// Changing Best Of
	if (round == "Round of 32" || round == "Round of 16") bestOfTemp = 5
	else if (round == "Quarterfinals" || round == "Semifinals") bestOfTemp = 6
	else bestOfTemp = 7

	// Changing Stars
	changeStars(null);
}
function changeScore(side, scoreEvent) {
	let animation = true;
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

	if (side == "left") {
		line1.style.backgroundColor = "#75c6ea";
		line2.style.backgroundColor = "#75c6ea";

		star.style.left = `${740 - (i * 50)}px`;
	} else {
		line1.style.backgroundColor = "#936bf7";
		line2.style.backgroundColor = "#936bf7";

		star.style.right = `${728 - (i * 50)}px`;
	}

	star.setAttribute("class", "star");
	let starGeneration = [star, line1, line2]
	return starGeneration
}
function reset(text) {
	if (text == "neutral") {
		document.getElementById("nowPlayingWrapperImageNeutral").style.opacity = 1;
		document.getElementById("nowPlayingWrapperImageBlue").style.opacity = 0;
		document.getElementById("nowPlayingWrapperImagePurple").style.opacity = 0;
	} else if (text == "blue") {
		document.getElementById("nowPlayingWrapperImageNeutral").style.opacity = 0;
		document.getElementById("nowPlayingWrapperImageBlue").style.opacity = 1;
		document.getElementById("nowPlayingWrapperImagePurple").style.opacity = 0;
	} else {
		document.getElementById("nowPlayingWrapperImageNeutral").style.opacity = 0;
		document.getElementById("nowPlayingWrapperImageBlue").style.opacity = 0;
		document.getElementById("nowPlayingWrapperImagePurple").style.opacity = 1;
	}
}

function starToggleOnOff(toggle) {
	if (toggle == "turnOff") {
		starToggleState = false;
		starToggle.innerText = "OFF";
		starToggle.setAttribute("onclick", "starToggleOnOff('turnOn')")
	} else if (toggle == "turnOn") {
		starToggleState = true;
		starToggle.innerText = "ON";
		starToggle.setAttribute("onclick", "starToggleOnOff('turnOff')")
	}
}

function toPickScreenView() {
	topSection.style.backgroundImage = "url('static/mappoolView.png')"
	gameplaySection.style.left = "-1920px"
	for (var i = 0; i < blueStars.length; i++) {
		blueStars[i].style.top = "-25px"
		blueStars[i].style.left = `${615 - (i * 55)}px`
		purpleStars[i].style.top = "-25px"
		purpleStars[i].style.right = `${615 - (i * 55)}px`	
	}
}
function toGameplayView() {
	topSection.style.backgroundImage = "url('static/gameplayView.png')";
	gameplaySection.style.left = 0;
	for (var i = 0; i < blueStars.length; i++) {
		blueStars[i].style.top = "88px";
		blueStars[i].style.left = `${740 - (i * 50)}px`;
		purpleStars[i].style.top = "88px";
		purpleStars[i].style.right = `${728 - (i * 50)}px`;
	}
}

changeStars(null)
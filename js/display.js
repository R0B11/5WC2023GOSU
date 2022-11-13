let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws");
let mapid = document.getElementById('mapid');

// NOW PLAYING
let mapContainer = document.getElementById("mapContainer");
let mapTitle = document.getElementById("mapTitle");
let mapDifficulty = document.getElementById("mapDifficulty");

// TEAM OVERALL SCORE
let teamBlueName = document.getElementById("teamBlueName");
let teamPurpleName = document.getElementById("teamPurpleName");
let scoreNowBlue = document.getElementById("scoreNowBlue");
let scoreNowPurple = document.getElementById("scoreNowPurple");
let scoreMaxBlue = document.getElementById("scoreMaxBlue");
let scoreMaxPurple = document.getElementById("scoreMaxPurple");

// STAR VISIBILITY
let scoreBlue = document.getElementById("scoreBlue");
let scorePurple = document.getElementById("scorePurple");
let teamBlue = document.getElementById("teamBlue");
let teamPurple = document.getElementById("teamPurple");

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

let bestOfTemp;
let scoreVisibleTemp;
let starsVisibleTemp;

let tempMapID;
let tempImg;
let tempMapName;
let tempMapDiff;

let scoreBlueTemp = 0
let scorePurpleTemp = 0
let teamNameBlueTemp;
let teamNamePurpleTemp;
let gameState;
let isFreemod = true;

let numOfClients
let starEvent 

let chatLen = 0;
let tempClass = 'unknown';

socket.onmessage = event => {
    let data = JSON.parse(event.data);
	if(scoreVisibleTemp !== data.tourney.manager.bools.scoreVisible) {
		scoreVisibleTemp = data.tourney.manager.bools.scoreVisible;
		if(scoreVisibleTemp) {
			// Score visible -> Set bg bottom to full
			chats.style.opacity = 0;
			playScoreBlue.style.opacity = 1;
			playScorePurple.style.opacity = 1;
		} else {
			// Score invisible -> Set bg to show chats
			chats.style.opacity = 1;
			playScoreBlue.style.opacity = 0;
			playScorePurple.style.opacity = 0;
		}
	}
	if(starsVisibleTemp !== data.tourney.manager.bools.starsVisible) {
		starsVisibleTemp = data.tourney.manager.bools.starsVisible;
		if(starsVisibleTemp) {
			scoreBlue.style.display = "flex";
			scorePurple.style.display = "flex";
			teamBlue.style.transform = "translateX(0)";
			teamPurple.style.transform = "translateX(0)";
		} else {
			scoreBlue.style.display = "none";
			scorePurple.style.display = "none";
			teamBlue.style.transform = "translateX(-150px)";
			teamPurple.style.transform = "translateX(150px)";
		}
	}
	if (tempMapID !== data.menu.bm.id) {
		// MAP ID
		tempMapID = data.menu.bm.id

		// MAP MAIN SECTION
		tempImg = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/');
		mapContainer.style.backgroundImage = `url('http://` + location.host + `/Songs/${tempImg}?a=${Math.random(10000)}')`;
		mapTitle.innerHTML = data.menu.bm.metadata.title;
		mapDifficulty.innerHTML = `[${data.menu.bm.metadata.difficulty}]`;

		// MAP STATS
		let foundMapFromMappool = false;
		let getMaps = new Promise((resolve, reject) => {
			let allMaps = getAllMaps();
			resolve(mapsArray); 
		})

		getMaps.then((allMaps => {
			for (var i = 0; i < allMaps.length; i++) {
				for (var j = 0; allMaps[i].length; j++) {
					if (allMaps[i][j].beatmapID == data.menu.bm.id) {
						currentMap = allMaps[i][j];
						foundMapFromMappool = true;

						mapStatsCS.innerText = Math.round((parseFloat(currentMap.cs) + Number.EPSILON) * 100) / 100;
						mapStatsAR.innerText = Math.round((parseFloat(currentMap.ar) + Number.EPSILON) * 100) / 100;
                        mapStatsOD.innerText = Math.round((parseFloat(currentMap.od) + Number.EPSILON) * 100) / 100;
						mapStatsLEN.innerText = `${(Math.floor(parseFloat(currentMap.songLength) / 60))}:${("0" + Math.floor(parseInt(currentMap.songLength) % 60)).slice(-2)}`;
					}
					if (foundMapFromMappool) break;
				}
				if (foundMapFromMappool) break;
			}
		}))

		if (!foundMapFromMappool) {
			mapStatsCS.innerText = data.menu.bm.stats.CS;
			mapStatsAR.innerText = data.menu.bm.stats.AR;
			mapStatsOD.innerText = data.menu.bm.stats.OD;
			let songLength = data.menu.bm.time.full;
			let songLengthSec = songLength / 1000
			mapStatsLEN.innerText = `${(Math.floor(parseFloat(songLengthSec) / 60))}:${("0" + Math.floor(parseInt(songLengthSec) % 60)).slice(-2)}`;
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
	if (bestOfTemp !== Math.ceil(data.tourney.manager.bestOF / 2) ||
		scoreBlueTemp !== data.tourney.manager.stars.left ||
		scorePurpleTemp !== data.tourney.manager.stars.right) {
		
		// Best of
		bestOfTemp =Math.ceil(data.tourney.manager.bestOF / 2)

		// Add Event
        if (scoreBlueTemp < data.tourney.manager.stars.left) {
            starEvent = "blue-add";
        } else if (scoreBlueTemp > data.tourney.manager.stars.left) {
            starEvent = "blue-remove";
        } else if (scorePurpleTemp < data.tourney.manager.stars.right) {
            starEvent = "purple-add";
        } else if (scorePurpleTemp > data.tourney.manager.stars.right) {
            starEvent = "purple-remove"
        }

		// Left Stars
		scoreBlueTemp = data.tourney.manager.stars.left;
		scoreBlue.innerHTML = '';
		// Pointed Achieved
		for (var i = 0; i < scoreBlueTemp; i++) {
			let generatedStar = starGenerate("left", i);
			generatedStar[1].classList.add("line1CrossLeft","starCrossLine1", "starCross");
			generatedStar[2].classList.add("line2CrossLeft","starCrossLine2", "starCross");
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
			generatedStar[1].classList.add("line1CircleLeft","starLine");
			generatedStar[2].classList.add("line2CircleLeft","starLine");
			if (starEvent == "blue-remove" && i == scoreBlueTemp) {
				generatedStar[1].classList.add("line1CrossToCircleLeftAnimation")
				generatedStar[2].classList.add("line2CrossToCircleLeftAnimation")
			}
			generatedStar[0].appendChild(generatedStar[1])
			generatedStar[0].appendChild(generatedStar[2])
			scoreBlue.appendChild(generatedStar[0])
		}

		// Right Stars
		scorePurpleTemp = data.tourney.manager.stars.right;
		scorePurple.innerHTML = '';
		// Points Achieved
		for (var i = 0; i < scorePurpleTemp; i++) {
			let generatedStar = starGenerate("right", i);
			generatedStar[1].classList.add("line1CrossRight","starCrossLine1", "starCross");
			generatedStar[2].classList.add("line2CrossRight","starCrossLine2", "starCross");
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
			generatedStar[1].classList.add("line1CircleRight","starLine");
			generatedStar[2].classList.add("line2CircleRight","starLine");
			if (starEvent == "purple-remove" && i == scorePurpleTemp) {
				generatedStar[1].classList.add("line1CrossToCircleRightAnimation")
				generatedStar[2].classList.add("line2CrossToCircleRightAnimation")
			}
			generatedStar[0].appendChild(generatedStar[1])
			generatedStar[0].appendChild(generatedStar[2])
			scorePurple.appendChild(generatedStar[0])
		}
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
	if (numOfClients !== data.tourney.ipcClients.length) {
		numOfClients = data.tourney.ipcClients.length
	}
	if(scoreVisibleTemp) {
		// MAKE SURE WHEN MAP IS PLAYED, SET A BOOL TO "isFreemod" TO TRUE/FALSE.
		// Freemod Mod Multipliers
		if (isFreemod) {
			for (var i = 0; i < numOfClients; i++) {
				// All mod combination multipliers
				var tempScore = data.tourney.ipcClients[i].gameplay.score
				if (data.tourney.ipcClients[i].gameplay.mods.str.includes("EZHD")) tempScore = tempScore * 1.9
				else if (data.tourney.ipcClients[i].gameplay.mods.str.includes("EZ")) tempScore = tempScore * 1.75
				else if (data.tourney.ipcClients[i].gameplay.mods.str.includes("HR")) tempScore = tempScore * 1.05
				// Separate FL as that gets added on top of the current multipliers(?)
				if (data.tourney.ipcClients[i].gameplay.mods.str.includes("FL")) tempScore = tempScore * 1.4
				if (i < numOfClients / 2) scoreBlueTemp += tempScore 
				else scorePurpleTemp += tempScore  
			}
		} else {
			scoreBlueTemp = data.tourney.manager.gameplay.score.left;
			scorePurpleTemp = data.tourney.manager.gameplay.score.right;
		}

		animation.playScoreBlue.update(scoreBlueTemp);
		animation.playScorePurple.update(scorePurpleTemp);
		
		// if(scoreBlueTemp > scorePurpleTemp) {
		// 	// Blue is Leading
		// 	playScoreBlue.style.backgroundColor = '#007E93';
		// 	playScoreBlue.style.color = 'white';
			
		// 	playScorePurple.style.backgroundColor = 'transparent';
		// 	playScorePurple.style.color = '#8E0029';
		// } else if (scoreBlueTemp == scorePurpleTemp) {
		// 	// Tie
		// 	playScoreBlue.style.backgroundColor = '#007E93';
		// 	playScoreBlue.style.color = 'white';
			
		// 	playScorePurple.style.backgroundColor = '#8E0029';
		// 	playScorePurple.style.color = 'white';
		// } else {
		// 	// Purple is Leading
		// 	playScoreBlue.style.backgroundColor = 'transparent';
		// 	playScoreBlue.style.color = '#007E93';
			
		// 	playScorePurple.style.backgroundColor = '#8E0029';
		// 	playScorePurple.style.color = 'white';
			
		// }
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

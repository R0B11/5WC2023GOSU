var modAbbArray;
var modNumArray;
let beatmaps = [];
var downloadedMaps = false;

function mappoolGeneratorPageDisplay(modAbb, modNum) {
    modAbbArray = modAbb;
    modNumArray = modNum;

    let mappoolGeneratorPage = document.getElementById("mappoolGeneratorPage");
    mappoolGeneratorPage.innerHTML = "";
    let mappoolTemplateGeneratorPage = document.getElementById("mappoolTemplateGeneratorPage");

    // Show template to add the number, removing the one to add the mod.
    mappoolGeneratorPage.style.display = "block";
    mappoolTemplateGeneratorPage.style.display = "none";

    // Make a div for the buttons below
    let indivInputsDiv = document.createElement("div");
    indivInputsDiv.classList.add("mappoolGeneratorPageButtonDiv")

    mappoolGeneratorPage.append(indivInputsDiv);

    // Text Area to put answers into
    let textAreaDiv = document.createElement("div");
    let textAreaText = document.createElement("p");
    textAreaText.innerText = `Paste in the osu! id of the map in order (nm1, nm2, nm3) line by line. On the right, paste the pooler's comments for the map, separated by //.`
    let textAreaBox = document.createElement("textarea");
    textAreaBox.setAttribute("class","templateContentPosition");
    textAreaBox.setAttribute("id","textAreaBox");
    textAreaBox.style.marginBottom = "10px";
    textAreaDiv.append(textAreaText);
    textAreaDiv.append(textAreaBox);
    mappoolGeneratorPage.append(textAreaDiv);

    // Previous Page Button
    
    let previousPageButton = generatePreviousPageButton("backToMappoolModGeneratorPage()");
    previousPageButton.style.marginRight = "10px";

    // Next Page Button 2
    let nextPageButton2 = generateNextPageButton("validateTextAreaMappoolGenerator()");
    nextPageButton2.style.marginLeft = "10px";

    // Make a div for the buttons below
    let bulkInputsDiv = document.createElement("div");
    bulkInputsDiv.classList.add("mappoolGeneratorPageButtonDiv")    

    bulkInputsDiv.append(previousPageButton);
    bulkInputsDiv.append(nextPageButton2);
    mappoolGeneratorPage.append(bulkInputsDiv);
}

function generatePreviousPageButton(onclickString) {
    let previousPageButton = document.createElement("button");   
    previousPageButton.setAttribute("class","templateGeneratorButtons nextPageButton")
    previousPageButton.setAttribute("onclick",onclickString);
    previousPageButton.innerText = "Previous Page";   
    return previousPageButton;
}

function generateNextPageButton(onclickString) {
    let nextPageButton = document.createElement("button");
    nextPageButton.setAttribute("class","templateGeneratorButtons nextPageButton")
    nextPageButton.setAttribute("onclick",onclickString);
    nextPageButton.innerText = "Next Page";
    return nextPageButton;
}

function backToMappoolModGeneratorPage() {
    let mappoolGeneratorPage = document.getElementById("mappoolGeneratorPage");
    let mappoolTemplateGeneratorPage = document.getElementById("mappoolTemplateGeneratorPage");

    mappoolTemplateGeneratorPage.style.display = "block";
    mappoolGeneratorPage.style.display = "none";
}

function backToMappoolGeneratorPage() {
    let mappoolGeneratorPage = document.getElementById("mappoolGeneratorPage");
    let mappoolDownloadPage = document.getElementById("mappoolDownloadPage");

    mappoolGeneratorPage.style.display = "block";
    mappoolDownloadPage.style.display = "none";

    document.getElementById("mappoolDownloadPageLinks").parentNode.removeChild(document.getElementById("mappoolDownloadPageLinks"));
    document.getElementById("mappoolDownloadPagePreviousPageButton").parentNode.removeChild(document.getElementById("mappoolDownloadPagePreviousPageButton"))
    downloadedMaps = false; 
    beatmaps = [];
}

function validateTextAreaMappoolGenerator() {
    let textAreaBox = document.getElementById("textAreaBox");

    // error handling
    if (textAreaBox.value.trim() == "") return alert("You have not placed anything inside the text area! If you are using the individual input form, plase click the button above.")
    
    let textAreaBoxSplit = textAreaBox.value.split("\n");
    let notANum = 0;
    let notComment = 0;
    let arrayOfModIDs = new Array();
    let arrayOfMapIDs = new Array();
    let arrayOfComments = new Array();

    console.log(modAbbArray.length)
    // Mod Array
    for (var i = 0; i < modAbbArray.length; i++) {
        console.log(i)
        for (var j = 0; j < modNumArray[i].value; j++) {
            console.log("hello")
            console.log(modAbbArray[i].value)
            console.log(j + 1)
            arrayOfModIDs.push(`${modAbbArray[i].value}${j + 1}`)
        }
    }

    // Map Array and Comment Array
    for (var i = 0; i < textAreaBoxSplit.length; i++) {
        if (textAreaBoxSplit[i].trim() == "") { continue; } 
        let IDAndCommentSplit = textAreaBoxSplit[i].split("//");
        if (isNaN(parseInt(IDAndCommentSplit[0].trim()))) { notANum++; }
        else if (IDAndCommentSplit[1] == undefined || IDAndCommentSplit[1].trim() == "") { notComment++ } 
        else {
            arrayOfMapIDs.push(parseInt(IDAndCommentSplit[0].trim()));
            arrayOfComments.push(IDAndCommentSplit[1].trim())
        }
    }

    if (notANum != 0) return alert(`There are ${notANum} value(s) that are not a number.`)
    if (notComment != 0) return alert(`There are ${notComment} missing comments`)

    console.log(arrayOfMapIDs, arrayOfComments, arrayOfModIDs)
    turnIntoJSONAndDownload(arrayOfMapIDs, arrayOfComments, arrayOfModIDs)
}

function turnIntoJSONAndDownload(mapIDArray, mapCommentArray, modIDArray) {
    let mapArray = new Array();
    for (var i = 0; i < mapIDArray.length; i++) {
        let mapObj = {
            beatmapID: mapIDArray[i],
            poolerComment: mapCommentArray[i],
            modID: modIDArray[i]
        }
        mapArray.push(mapObj)
    }

    const mappoolDL = "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(mapArray));
    let mappoolAnchorElem = document.createElement("a");
    mappoolAnchorElem.setAttribute("id", "downloadMappool");
    mappoolAnchorElem.setAttribute("href", mappoolDL);
    mappoolAnchorElem.setAttribute("download", "showcaseBeatmaps.json");

    let mappoolDownloadPage = document.getElementById("mappoolDownloadPage");
    let mappoolGeneratorPage = document.getElementById("mappoolGeneratorPage");

    // Previous Page Button
    let previousPageButton = generatePreviousPageButton("backToMappoolGeneratorPage()");  
    previousPageButton.classList.add("templateContentPosition");
    previousPageButton.setAttribute("id","mappoolDownloadPagePreviousPageButton");

    // make a new paragraph to append everything into
    let mappoolDownloadPageLinks = document.createElement("p");
    mappoolDownloadPageLinks.setAttribute("id","mappoolDownloadPageLinks")
    mappoolDownloadPageLinks.style.marginBottom = "0";

    let mappoolDownloadPageLinksBr = document.createElement("br");
    mappoolDownloadPageLinks.append(mappoolAnchorElem);
    mappoolDownloadPageLinks.append(mappoolDownloadPageLinksBr);

    mappoolGeneratorPage.style.display = "none";
    mappoolDownloadPage.style.display = "block";

    mappoolAnchorElem.innerText = "Download Mappool";
    mappoolAnchorElem.click();

    mappoolDownloadPage.append(previousPageButton);
    mappoolDownloadPage.append(mappoolDownloadPageLinks);
}
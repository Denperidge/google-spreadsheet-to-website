const parseGoogleJson = new RegExp("\(({.*})\)");
const parseGoogleUrl = new RegExp("docs\.google\.com\/spreadsheets\/d\/(.*)\/")
let entries = [];
let spreadsheetId;


function getSpreadsheetId() {
    let spreadsheetId = localStorage.getItem("spreadsheetId") || window.location.search.substring(1);
    if (spreadsheetId == "") {
        //handleNoId();
    } else {
        localStorage.setItem("spreadsheetId", spreadsheetId);
    }
    return spreadsheetId;
}

function requestSpreadsheetData(spreadsheetId, callback) {
    if (spreadsheetId == "") return;
    let spreadsheetUrl = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/gviz/tq?tqx=out:json";
    
    
    get(spreadsheetUrl, function(request){
        callback(request.response);
    });
}

function parseSpreadsheetData(requestResponse) {
    const data = JSON.parse(parseGoogleJson.exec(requestResponse)[0]);
    let rows = data.table.rows;

    for (let i = 0; i < rows.length; i++) {
        entries.push(new Entry(rows[i]))
    }
}

function requestAndSaveData() {
    spreadsheetId = getSpreadsheetId();
    requestSpreadsheetData(spreadsheetId, function(requestResponse) {
        parseSpreadsheetData(requestResponse);
        handleEntries();
    });
}

document.querySelector("footer button").addEventListener("click", function() {
    let rawInput = document.querySelector("footer input").value;
    if (rawInput.indexOf("google") > -1) {
        window.location.search = parseGoogleUrl.exec(rawInput)[1];
        console.log(parseGoogleUrl.exec(rawInput))
    } else {
        window.location.search = rawInput;
    }
    requestAndSaveData();
});

requestAndSaveData();
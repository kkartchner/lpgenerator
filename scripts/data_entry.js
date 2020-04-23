"use strict";
document.getElementById("dataTable").innerHTML += dataEntryRows();

function dataEntryRows() {
    var htmlContent = "";
    for (var i = 0; i < 15; ++i) {
        htmlContent += ("<tr>"
            + "<td><input type='text' class='itemCode' /></td>"
            + "<td><input type='text' class='description' /></td>"
            + "<td><input type='text' class='location' /></td>"
            + "<td><input type='text' class='expiration' /></td>"
            + "<td><input type='text' class='stickerNum' /></td>"
            + "</tr>");
    }
    htmlContent += "<tr><td colspan='5'><input id='generateBtn' value='Print Stickers' type='button' onclick='goToPrintPage();' /></td></tr>"
    return htmlContent;
}


function goToPrintPage() {
    var descElements = document.getElementsByClassName("description");
    var locElements = document.getElementsByClassName("location");
    var expirElements = document.getElementsByClassName("expiration");
    var stickerNumList = document.getElementsByClassName("stickerNum");

    localStorage["entryCount"] = JSON.stringify(
        Math.max(entryCount(descElements), entryCount(locElements), entryCount(expirElements)));

    localStorage["descriptions"] = JSON.stringify(getElementValues(descElements, stickerNumList));
    localStorage["locations"] = JSON.stringify(getElementValues(locElements, stickerNumList));
    localStorage["expirations"] = JSON.stringify(getElementValues(expirElements, stickerNumList));

    window.open("print.html");
}

// Sticker Count is the number of entries that have at least one text box filled
function entryCount(column) {
    var count = 0;
    for (var i = 0; i < column.length; ++i) {
        if (column[i].value != "") {
            ++count;
        }
    }
    return count;
}

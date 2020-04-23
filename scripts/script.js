"use strict";
document.getElementById("stickerPages").innerHTML = generatePlates();
window.print();

/* Generate stickers with provided information */
function generatePlates() {
    var descList = JSON.parse(localStorage["descriptions"]);
    var locList = JSON.parse(localStorage["locations"]);
    var expirList = JSON.parse(localStorage["expirations"]);

    var stickerCount = Math.max(descList.length, locList.length, expirList.length);

    var platesPerRow = 2;
    var rowsPerPage = 2;
    var pageNum = Math.ceil(stickerCount / 4);
    var pageContent = "";

    var stkrIndex = 0;
    for (var p = 0; p < pageNum; ++p) {
        pageContent += "<table class='page'>";
        for (var row = 0; row < rowsPerPage; ++row) {
            pageContent += "<tr>";
            for (var i = 0; i < platesPerRow; ++i) {
                pageContent += "<td class='sticker'>";
                if (stkrIndex < stickerCount) {
                    pageContent += ("<span class='description'>" + descList[stkrIndex] + "</span>"
                        + "<span class='location'>" + locList[stkrIndex] + "</span>"
                        + "<span class='expiration'>" + ""+ expirList[stkrIndex] + "</span>");
                    ++stkrIndex;
                }
                pageContent += "</td>";
            }
            pageContent += "</tr>";
        }
    }
    return pageContent;
}
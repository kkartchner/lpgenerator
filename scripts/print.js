"use strict";
window.onload = function () {
    let options = ["description", "location", "expiration", "itemCode"];
    this.generatePlates(options);
    window.print();
}

function maxArrayLength(dataMap) {
    let max = -1;
    for (const [k, v] of dataMap) {
        if (v.length > max) {
            max = v.length;
        }
    }
    return max;
}

/* Generate stickers with provided information */
function generatePlates(options) {
    let dataMap = new Map();

    for (const op of options) { // Store arrays to data map
        let key = "print_" + op + "s";
        dataMap.set(key, JSON.parse(localStorage[key]));
    }

    let stickerCount = maxArrayLength(dataMap);

    const PLATES_PER_ROW = 2;
    const ROWS_PER_PAGE = 2;

    let pageNum = Math.ceil(stickerCount / (PLATES_PER_ROW * ROWS_PER_PAGE));

    for (var p = 0, stkrIndex = 0; p < pageNum; ++p) {
        let pageTable = document.createElement("table");
        pageTable.className = "page";

        for (var row = 0; row < ROWS_PER_PAGE; ++row) {
            let newRow = document.createElement("tr");

            for (var col = 0; col < PLATES_PER_ROW; ++col) {
                let newTD = document.createElement("td");
                newTD.className = "sticker";
                if (stkrIndex < stickerCount) {
                    for (const op of options) {
                        if (op !== "itemCode") {
                            let opSpan = document.createElement("span");
                            opSpan.className = op;
                            opSpan.innerHTML = dataMap.get("print_" + op + "s")[stkrIndex];
                            newTD.appendChild(opSpan);
                        }
                    }
                    let qrDiv = document.createElement("div");
                    qrDiv.className = "qrCode";

                    newTD.appendChild(qrDiv);

                    let qrCode = new QRCode(qrDiv, {
                        width: 50,
                        height: 50
                    });

                    let qrData = dataMap.get("print_itemCodes")[stkrIndex];
                    qrCode.makeCode(qrData);

                    ++stkrIndex;
                }
                newRow.appendChild(newTD);
            }

            pageTable.appendChild(newRow);
        }
        document.getElementById("stickerPages").appendChild(pageTable);
    }
}
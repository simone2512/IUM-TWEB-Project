let competitionId;

/**
 * Initializes the competition details page.
 * Parses the competition ID from the URL parameters and fetches competition data.
 * Depending on the type of competition, it fetches and displays either the leaderboard or the roll of honour.
 */
function init() {
    let param = new URLSearchParams(window.location.search);
    competitionId = param.get('param');

    axios.get('competitionSelected/getInfoCompetitionSelected', { params: { competitionId : competitionId}})
        .then (function (dataR) {
            let jsonString = JSON.stringify(dataR.data);
            let cleanedString = jsonString.substring(2, jsonString.length - 2);
            let infoCompetition = cleanedString.split(',');
            console.log(infoCompetition);
            infoCompetition[1] = capitalizeAndReplace(infoCompetition[1]);
            infoCompetition[3] = capitalizeAndReplaceSndVersion(infoCompetition[3]);
            infoCompetition[2] = capitalizeAndReplace(infoCompetition[2]);
            document.getElementById('LeagueName').innerHTML = infoCompetition[2].toUpperCase();
            document.getElementById('infoLeague').innerHTML = "Country: " + infoCompetition[6] +"<br>Type: "+ capitalizeAndReplaceSndVersion(infoCompetition[4]) + "<br>SubType: " + infoCompetition[3];

            let img = document.createElement('img');
            img.src = "https://tmssl.akamaized.net/images/logo/header/" + infoCompetition[0].toLowerCase() + ".png?lm=1521104656";
            img.alt = 'League image';

            let imageContainer = document.getElementById('imageContainer');
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
            imageContainer.appendChild(img);

            if(infoCompetition[4] == 'domestic_league') {
                document.getElementById("RollOfHonourTitle").style.display = "none";
                axios.get('competitionSelected/getLeadboardMongo', {params: {competitionId: competitionId}})
                    .then(function (dataR) {
                        generateLeaderboardTable(dataR.data);
                    })
                    .catch(handleError);
                console.log(infoCompetition[3]);
            } else if(!infoCompetition[3].includes("Qualifying") && !infoCompetition[3].includes("Qualifiers")&& infoCompetition[3] != "League Cup"){
                document.getElementById("RollOfHonourTitle").style.display = "block";
                axios.get('competitionSelected/getRollOfHonourMongo', {params: {competitionId: competitionId}})
                    .then(function (dataR) {
                        generateRollOfHonour(dataR.data);
                    })
                    .catch(handleError);
            }
        })
        .catch(handleError);
}

/**
 * Handles errors from axios requests.
 * Alerts the user with appropriate messages based on the error type and status code.
 * @param {Object} error - The error object from the axios request.
 */
function handleError(error) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                alert("Error 400: Bad Request");
                break;
            case 404:
                alert("Error 404: Page not found");
                //document.getElementById("RollOfHonourTitle").style.display = "none";
                break;
            case 500:
                alert("Error 500: Internal Server Error");
                break;
            default:
                alert("An error occurred: " + error.response.status);
        }
    } else if (error.request) {
        alert("No response received");
    } else {
        alert("Error in setting up the request");
    }
}

/**
 * Capitalizes the first letter of each word and replaces hyphens with spaces.
 * @param {string} string - The input string to be transformed.
 * @returns {string} The transformed string with capitalized words and spaces.
 */
function capitalizeAndReplace(string) {
    let words = string.split('-');

    for (let i = 0; i < words.length; i++) {
        let capitalizedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        words[i] = capitalizedWord;
    }

    let finalString = words.join(' ');

    return finalString;
}

/**
 * Capitalizes the first letter of each word and replaces hyphens with spaces.
 * @param {string} string - The input string to be transformed.
 * @returns {string} The transformed string with capitalized words and spaces.
 */
function capitalizeAndReplaceSndVersion(string) {
    let words = string.split('_');

    for (let i = 0; i < words.length; i++) {
        let capitalizedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        words[i] = capitalizedWord;
    }

    let finalString = words.join(' ');

    return finalString;
}

/**
 * Generates a leaderboard table with the provided data.
 * @param {Array} leaderboardData - An array of leaderboard data objects.
 */
function generateLeaderboardTable(leaderboardData) {
    const leaderboardContainer = document.getElementById('leaderboard');

    const table = document.createElement('table');
    table.classList.add('leaderboard-table');

    const headerRow = table.insertRow();
    const headers = ['Posizione', 'Squadra', 'Punti', 'Partite Giocate', 'Vittorie', 'Pareggi', 'Sconfitte'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    leaderboardData.forEach((rowData, index) => {
        const row = table.insertRow();
        if (rowData.nome) {
            const cellData = [index + 1, rowData.nome, rowData.punti, rowData.partiteGiocate, rowData.vittorie, rowData.pareggi, rowData.sconfitte];
            cellData.forEach(cellText => {
                const cell = document.createElement('td');
                cell.textContent = cellText;
                row.appendChild(cell);
            });
        } else {
            const cell = document.createElement('td');
            cell.setAttribute('colspan', '7');
            cell.textContent = `Statistiche generali: Punti: ${rowData.punti}, Partite Giocate: ${rowData.partiteGiocate}, Vittorie: ${rowData.vittorie}, Pareggi: ${rowData.pareggi}, Sconfitte: ${rowData.sconfitte}`;
            row.appendChild(cell);
        }
    });

    leaderboardContainer.innerHTML = '';
    leaderboardContainer.appendChild(table);
}

/**
 * Generates a roll of honour display with the provided data.
 * @param {Array} data - An array of roll of honour data objects.
 */
function generateRollOfHonour(data) {
    const rollOfHonourContainer = document.getElementById("RollOfHonour");
    rollOfHonourContainer.innerHTML = '';
    const row = document.createElement("div");
    row.classList.add("row");

    data.forEach(entry => {
        const card = document.createElement("div");
        card.classList.add("col", "mb-1", "col-md-3", "col-lg-2", "d-flex");
        const clubId = entry.winner_id;
        const imageUrl = "https://tmssl.akamaized.net/images/wappen/head/" + clubId + ".png?lm=1701079293";
        card.innerHTML = `
            <div class="card border rounded-lg shadow flex-fill d-flex flex-column">
                <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
                    <h5 class="card-title">${entry.season}</h5>
                    <img src="${imageUrl}" class="card-img-top img-fluid mx-auto mb-2" style="max-height: 100px; width: auto;" alt="Club Logo">
                    <p class="card-text mt-auto">${entry.winner}</p>
                </div>
            </div>
        `;
        card.onclick = function() {
            openPageClubSelected(clubId);
        }
        row.appendChild(card);
    });

    rollOfHonourContainer.appendChild(row);
}

/**
 * Opens the squads page with the current competition ID.
 */
function openPageSquads() {
    let queryString = '?param=' + encodeURIComponent(competitionId);
    window.location.href = 'squads.html' + queryString;
}

/**
 * Opens the games page with the current competition ID.
 */
function openPageGames() {
    let queryString = '?param=' + encodeURIComponent(competitionId);
    window.location.href = 'games.html' + queryString;
}

/**
 * Opens the club details page with the current competition ID and the selected club ID.
 * @param {string} club_id - The ID of the selected club.
 */
function openPageClubSelected(club_id) {
    let queryString = '?param1=' + encodeURIComponent(competitionId) + '&param2=' + encodeURIComponent(club_id);
    window.location.href = 'squadSelected.html' + queryString;
}

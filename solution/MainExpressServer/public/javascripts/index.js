/**
 * Initializes the dashboard by fetching and displaying data for best players, clubs, and competitions.
 */
function init() {
    // Fetch and display the best players
    axios.get('/getBestPlayers')
        .then(function (dataR) {
            createPlayerCards(dataR.data); // Create player cards using fetched data
        })
        .catch(function (error) {
            handleError(error); // Handle errors appropriately
        });

    // Fetch and display the best clubs
    axios.get('/getBestClubs')
        .then(function (dataR) {
            createClubsCards(dataR.data); // Create club cards using fetched data
        })
        .catch(function (error) {
            handleError(error); // Handle errors appropriately
        });

    // Fetch and display the best competitions
    axios.get('/getBestCompetitions')
        .then(function (dataR) {
            createCompetitionsCards(dataR.data); // Create competition cards using fetched data
        })
        .catch(function (error) {
            handleError(error); // Handle errors appropriately
        });
}

/**
 * Format a large number into a more readable format with currency units.
 * @param {number} value - The numeric value to be formatted.
 * @returns {string} The formatted value with currency units.
 */
function formatValue(value) {
    const num = parseInt(value, 10);
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B EUR';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M EUR';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K EUR';
    }
    return num + ' EUR';
}

/**
 * Create cards for displaying the best players.
 * @param {Array} jsonArray - The array of player data objects.
 */
function createPlayerCards(jsonArray) {
    const bestPlayersDiv = document.getElementById("topPlayers");
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-center");

    jsonArray.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-4", "mx-2");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card", "h-100", "shadow-sm");

        const img = document.createElement("img");
        img.src = jsonArray[index].imageUrl;
        img.alt = jsonArray[index].name;
        img.classList.add("card-img-top", "img-fluid");
        cardInner.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const playerName = document.createElement("h5");
        playerName.textContent = jsonArray[index].name;
        playerName.classList.add("card-title", "text-center");

        const playerValue = document.createElement("p");
        playerValue.textContent = "Market Value: " + formatValue(jsonArray[index].marketValueInEur);
        playerValue.classList.add("card-text", "text-center");

        cardBody.appendChild(playerName);
        cardBody.appendChild(playerValue);
        cardInner.appendChild(cardBody);

        cardInner.onclick = function () {
            openPagePlayerSelected(jsonArray[index].playerId);
        };

        card.appendChild(cardInner);
        row.appendChild(card);
    });

    bestPlayersDiv.appendChild(row);
}

/**
 * Create cards for displaying the best clubs.
 * @param {Array} jsonArray - The array of club data objects.
 */
function createClubsCards(jsonArray) {
    const bestClubsDiv = document.getElementById("topClubs");
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-center");

    jsonArray.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-4", "mx-2");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card", "h-100", "shadow-sm");

        const img = document.createElement("img");
        img.src = "https://tmssl.akamaized.net/images/wappen/head/" + jsonArray[index].clubId + ".png?lm=1701079293";
        img.alt = jsonArray[index].name;
        img.classList.add("card-img-top", "img-fluid");
        cardInner.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const clubName = document.createElement("h5");
        clubName.textContent = jsonArray[index].name;
        clubName.classList.add("card-title", "text-center");
        clubId = jsonArray[index].clubId;

        const clubValue = document.createElement("p");

        axios.get('/getClubValue', { params: { clubId }})
            .then(function (dataR) {
                clubValue.textContent = "Total Market Value: " + formatValue(dataR.data);
            })
            .catch(function (error) {
                handleError(error); // Handle errors appropriately
            });

        clubValue.classList.add("card-text", "text-center");

        cardBody.appendChild(clubName);
        cardBody.appendChild(clubValue);
        cardInner.appendChild(cardBody);

        cardInner.onclick = function () {
            openPageClubSelected(jsonArray[index].clubId, jsonArray[index].competitionId);
        };

        card.appendChild(cardInner);
        row.appendChild(card);
    });

    bestClubsDiv.appendChild(row);
}

/**
 * Create cards for displaying the best competitions.
 * @param {Array} jsonArray - The array of competition data objects.
 */
function createCompetitionsCards(jsonArray) {
    const bestCompetitionsDiv = document.getElementById("topCompetitions");
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-center");

    jsonArray.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-4", "mx-2");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card", "h-100", "shadow-sm");

        const img = document.createElement("img");
        img.src = "https://tmssl.akamaized.net/images/logo/header/" + jsonArray[index].competitionId.toLowerCase() + ".png?";
        img.alt = jsonArray[index].name;
        img.classList.add("card-img-top", "img-fluid");
        cardInner.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const competitionName = document.createElement("h5");
        competitionName.textContent = capitalizeAndReplace(jsonArray[index].name);
        competitionName.classList.add("card-title", "text-center");
        competitionId = jsonArray[index].competitionId;

        const competitionValue = document.createElement("p");

        axios.get('/getCompetitionValue', { params: { competitionId}})
            .then(function (dataR) {
                competitionValue.textContent = "Total Market Value: " + formatValue(dataR.data);
            })
            .catch(function (error) {
                handleError(error); // Handle errors appropriately
            });

        competitionValue.classList.add("card-text", "text-center");

        cardBody.appendChild(competitionName);
        cardBody.appendChild(competitionValue);
        cardInner.appendChild(cardBody);

        cardInner.onclick = function () {
            openPageCompetitionSelected(jsonArray[index].competitionId);
        };

        card.appendChild(cardInner);
        row.appendChild(card);
    });

    bestCompetitionsDiv.appendChild(row);
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
                alert("Error 404: No data found");
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
 * Capitalize words in a hyphenated string and replace hyphens with spaces.
 * @param {string} string - The string to be processed.
 * @returns {string} The processed string with capitalized words and hyphens replaced by spaces.
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
 * Open the player selected page with the specified player ID.
 * @param {string} PlayerId - The ID of the player to open the page for.
 */
function openPagePlayerSelected(PlayerId) {
    let queryString = '?param=' + encodeURIComponent(PlayerId);
    window.location.href = 'playerSelected.html' + queryString;
}

/**
 * Open the competition selected page with the specified competition ID.
 * @param {string} competitionId - The ID of the competition to open the page for.
 */
function openPageCompetitionSelected(competitionId) {
    let queryString = '?param=' + encodeURIComponent(competitionId);
    window.location.href = 'competitionSelected.html' + queryString;
}

/**
 * Open the club selected page with the specified club ID and competition ID.
 * @param {string} clubId - The ID of the club to open the page for.
 * @param {string} competitionId - The ID of the competition associated with the club.
 */
function openPageClubSelected(clubId, competitionId) {
    let queryString = '?param1=' + encodeURIComponent(competitionId) + '&param2=' + encodeURIComponent(clubId);
    window.location.href = 'squadSelected.html' + queryString;
}

let competitionId;
let seasonSelected;
let roundSelected;

/**
 * Initialize the page by extracting the competition ID from the URL
 * and fetching all seasons of the competition.
 *
 * @params window.location.search - The search parameters in the URL.
 */
function init() {
    let param = new URLSearchParams(window.location.search);
    competitionId = param.get('param');
    getAllSeasonOfCompetiton();
}

/**
 * Fetch all seasons of the specified competition and update the UI.
 *
 * @params competitionId - The ID of the competition to fetch seasons for.
 */
function getAllSeasonOfCompetiton() {
    axios.get('games/getAllSeasonOfCompetitionMongo', {params: {competitionId: competitionId}})
        .then(function (response) {
            seasonSelected = response.data[0];
            getRoundsOfSelectedSeason(seasonSelected);
            createFilterSeasons(response.data);
        })
        .catch(function (error) {
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
        });
}

/**
 * Create dropdown menu items for selecting rounds based on the provided data.
 *
 * @params jsonArray - Array of round data.
 */
function createFilterRounds(jsonArray) {
    const dropdownMenu = document.getElementById('dropdownMenuRounds');
    dropdownMenu.innerHTML = '';

    jsonArray.forEach((round) => {
        const listItem = document.createElement('li');
        const roundItem = document.createElement('a');
        roundItem.className = 'dropdown-item';
        roundItem.textContent = round;
        roundItem.href = '#';
        roundItem.onclick = function (event) {
            event.preventDefault();
            roundSelected = round;
            getGamesOfRoundOfSeason(seasonSelected, roundSelected);
        };
        listItem.appendChild(roundItem);
        dropdownMenu.appendChild(listItem);
    });
}

/**
 * Create dropdown menu items for selecting seasons based on the provided data.
 *
 * @params jsonArray - Array of season data.
 */
function createFilterSeasons(jsonArray) {
    const dropdownMenu = document.getElementById('dropdownMenuSeasons');
    dropdownMenu.innerHTML = '';

    jsonArray.forEach(season => {
        const listItem = document.createElement('li');
        const seasonItem = document.createElement('a');
        seasonItem.className = 'dropdown-item';
        seasonItem.textContent = season;
        seasonItem.href = '#';
        seasonItem.onclick = function (event) {
            event.preventDefault();
            getRoundsOfSelectedSeason(season);
            seasonSelected = season;
        };
        listItem.appendChild(seasonItem);
        dropdownMenu.appendChild(listItem);
    });
}

/**
 * Fetch all rounds of the specified season and update the UI.
 *
 * @params season - The selected season to fetch rounds for.
 */
function getRoundsOfSelectedSeason(season) {
    axios.get('games/getRoundsOfSeasonMongo', {params: {competitionId: competitionId, season: season}})
        .then(function (response) {
            roundSelected = response.data[0];
            getGamesOfRoundOfSeason();
            createFilterRounds(response.data);
        })
        .catch(function (error) {
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
        });
}

/**
 * Fetch all games of the specified round and season, then update the UI.
 *
 * @params seasonSelected - The selected season.
 * @params roundSelected - The selected round.
 */
function getGamesOfRoundOfSeason() {
    axios.get('games/getGamesOfRoundOfSeasonMongo', {params: {competitionId: competitionId, season: seasonSelected, round: roundSelected}})
        .then(function (response) {
            const gamesData = response.data;

            const gamesContainer = document.getElementById('gamesContainer');
            gamesContainer.innerHTML = ''; // Clear the container

            // Fetch competition type from the first game in the response
            const competitionType = gamesData[0].competition_type;

            if (competitionType === 'domestic_league') {
                const roundsData = {};
                gamesData.forEach(game => {
                    const roundNumber = parseInt(game.round.replace(/[^\d]/g, ''), 10);
                    if (!roundsData[roundNumber]) {
                        roundsData[roundNumber] = [];
                    }
                    roundsData[roundNumber].push(game);
                });

                const sortedRounds = Object.keys(roundsData).sort((a, b) => b - a);

                sortedRounds.forEach(round => {
                    const roundDiv = document.createElement('div');
                    roundDiv.classList.add('mb-4');

                    const roundNumber = round.split(' ')[0] || round;
                    roundDiv.innerHTML = `<h2>ROUND ${roundNumber} - SEASON ${seasonSelected}</h2>`;

                    const rowDiv = document.createElement('div');
                    rowDiv.classList.add('row');

                    roundsData[round].forEach(game => {
                        const gameDiv = document.createElement('div');
                        gameDiv.classList.add('col-md-6', 'mb-3');
                        const matchDate = new Date(game.date).toLocaleDateString();
                        gameDiv.innerHTML = `
                            <div class="card" onclick="openPageGameSelected(${game.game_id})">
                                <div class="card-header text-right small">${matchDate}</div>
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <div class="team">
                                        <img src="https://tmssl.akamaized.net/images/wappen/head/${game.home_club_id}.png?lm=1701079293" class="img-fluid" alt="${game.home_club_name} Logo">
                                        <span class="ml-2">${game.home_club_name}</span>
                                    </div>
                                    <div class="result"><span>${game.home_club_goals} - ${game.away_club_goals}</span></div>
                                    <div class="team">
                                        <span class="mr-2">${game.away_club_name}</span>
                                        <img src="https://tmssl.akamaized.net/images/wappen/head/${game.away_club_id}.png?lm=1701079293" class="img-fluid" alt="${game.away_club_name} Logo">
                                    </div>
                                </div>
                            </div>
                        `;
                        rowDiv.appendChild(gameDiv);
                    });

                    roundDiv.appendChild(rowDiv);
                    gamesContainer.appendChild(roundDiv);
                });
            } else {
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row');

                const roundDiv = document.createElement('div');
                roundDiv.classList.add('mb-4');
                roundDiv.innerHTML = `<h2>ROUND ${roundSelected} - SEASON ${seasonSelected}</h2>`;
                gamesContainer.appendChild(roundDiv);
                roundDiv.appendChild(rowDiv);

                gamesData.forEach(game => {
                    const gameDiv = document.createElement('div');
                    gameDiv.classList.add('col-md-6', 'mb-3');
                    const matchDate = new Date(game.date).toLocaleDateString();
                    gameDiv.innerHTML = `
                        <div class="card" onclick="openPageGameSelected(${game.game_id})">
                            <div class="card-header text-right small">${matchDate}</div>
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div class="team">
                                    <img src="https://tmssl.akamaized.net/images/wappen/head/${game.home_club_id}.png?lm=1701079293" class="img-fluid" alt="${game.home_club_name} Logo">
                                    <span class="ml-2">${game.home_club_name}</span>
                                </div>
                                <div class="result"><span>${game.home_club_goals} - ${game.away_club_goals}</span></div>
                                <div class="team">
                                    <span class="mr-2">${game.away_club_name}</span>
                                    <img src="https://tmssl.akamaized.net/images/wappen/head/${game.away_club_id}.png?lm=1701079293" class="img-fluid" alt="${game.away_club_name} Logo">
                                </div>
                            </div>
                        </div>
                    `;
                    rowDiv.appendChild(gameDiv);
                });

                gamesContainer.appendChild(rowDiv);
            }
        })
        .catch(function (error) {
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
        });
}

/**
 * Navigate to the competitionSelected page with the competition ID as a parameter.
 */
function openPageCompetitionSelected() {
    let queryString = '?param=' + encodeURIComponent(competitionId);
    window.location.href = 'competitionSelected.html' + queryString;
}

/**
 * Navigate to the squads page with the competition ID as a parameter.
 */
function openPageSquads() {
    let queryString = '?param=' + encodeURIComponent(competitionId);
    window.location.href = 'squads.html' + queryString;
}

/**
 * Navigate to the gameSelected page with the game ID as a parameter.
 *
 * @params gameId - The ID of the selected game.
 */
function openPageGameSelected(gameId) {
    let queryString = '?param=' + encodeURIComponent(gameId);
    window.location.href = 'gameSelected.html' + queryString;
}

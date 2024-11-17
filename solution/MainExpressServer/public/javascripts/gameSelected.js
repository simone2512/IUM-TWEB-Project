let GameId;
let club_id_home;
let club_id_away;

/**
 * Initialize the page by extracting the game ID from the URL
 * and fetching game and game event information.
 *
 * @params window.location.search - The search parameters in the URL.
 */
function init() {
    let param = new URLSearchParams(window.location.search);
    GameId = param.get('param');

    axios.get('gameSelected/getInfoGameMongo', { params: { gameId: GameId } })
        .then(function (response) {
            let gameInfo = response.data;
            club_id_home = gameInfo.home_club_id;
            club_id_away = gameInfo.away_club_id;
            displayGameInfo(gameInfo);
            displayClubLogos(gameInfo.home_club_id, gameInfo.away_club_id);
            document.getElementById('homeClubLogo').onclick = function() {
                openTeamPage(gameInfo.home_club_id, gameInfo.competitionId);
            };
            document.getElementById('awayClubLogo').onclick = function() {
                openTeamPage(gameInfo.away_club_id, gameInfo.competitionId);
            };
            document.getElementById('homeClubName').onclick = function() {
                openTeamPage(gameInfo.home_club_id, gameInfo.competitionId);
            };
            document.getElementById('awayClubName').onclick = function() {
                openTeamPage(gameInfo.away_club_id, gameInfo.competitionId);
            };
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

    axios.get('gameSelected/getInfoGameEventMongo', { params: { gameId: GameId } })
        .then(function (response) {
            let gameEventInfo = response.data;
            displayEventGameInfo(gameEventInfo);
        })
        .catch(function (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        alert("Error 400: Bad Request");
                        break;
                    case 404:
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
 * Display game information in the UI.
 *
 * @params gameInfo - The game information object.
 */
function displayGameInfo(gameInfo) {
    document.getElementById('homeClubName').textContent = gameInfo.home_club_name;
    document.getElementById('awayClubName').textContent = gameInfo.away_club_name;
    document.getElementById('gameScore').textContent = `${gameInfo.home_club_goals} - ${gameInfo.away_club_goals}`;
    document.getElementById('gameDate').textContent = new Date(gameInfo.date).toLocaleDateString();

    let gameDetails = `
        <p>Round: ${gameInfo.round}</p>
        <p>Referee: ${gameInfo.referee}</p>
        <p>Stadium: ${gameInfo.stadium}</p>
        <p>Attendance: ${gameInfo.attendance}</p>
    `;
    document.getElementById('gameDetails').innerHTML = gameDetails;
}

/**
 * Display club logos in the UI.
 *
 * @params homeClubId - The ID of the home club.
 * @params awayClubId - The ID of the away club.
 */
function displayClubLogos(homeClubId, awayClubId) {
    document.getElementById('homeClubLogo').src = `https://tmssl.akamaized.net/images/wappen/head/${homeClubId}.png?lm=1701079293`;
    document.getElementById('awayClubLogo').src = `https://tmssl.akamaized.net/images/wappen/head/${awayClubId}.png?lm=1701079293`;
}

/**
 * Display game event information in the UI, sorted in chronological order.
 *
 * @params gameEventInfo - The game event information array.
 */
async function displayEventGameInfo(gameEventInfo) {
    gameEventInfo.sort((a, b) => a.minute - b.minute);

    let timelineContainer = document.querySelector('.timeline');
    timelineContainer.innerHTML = '';

    for (let event of gameEventInfo) {
        let name = await getPlayerName(event.player_id);

        let eventElement = document.createElement('li');
        eventElement.classList.add('timeline-item');

        if (event.club_id === club_id_home) {
            eventElement.classList.add('timeline-left');
        } else {
            eventElement.classList.add('timeline-right');
        }

        eventElement.setAttribute('data-minute', `${event.minute}'`);

        let eventIcon = '';
        switch(event.type) {
            case 'Goals':
                eventIcon = "images/goal.jpg";
                break;
            case 'Cards':
                if (event.description.toLowerCase().includes("yellow"))
                    eventIcon = "images/yellow_card.svg";
                else
                    eventIcon = "images/red_card.svg";
                break;
        }

        let eventContent = `
            <h5 class="timeline-title mb-0">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</h5>
            <img src="${eventIcon}" class="img-fluid" alt="Icona Evento" style="width: 20px; height: 20px;">
        `;

        if (event.club_id === club_id_home) {
            eventContent = `
                <h5 class="timeline-title mb-0">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</h5>
                <img src="${eventIcon}" class="img-fluid ml-2" alt="Icona Evento" style="width: 20px; height: 20px;">
            `;
        } else {
            eventContent = `
                <img src="${eventIcon}" class="img-fluid mr-2" alt="Icona Evento" style="width: 20px; height: 20px;">
                <h5 class="timeline-title mb-0">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</h5>
            `;
        }

        eventElement.innerHTML = `
            <div class="timeline-panel card mb-3">
                <div class="card-body">
                    <div class="timeline-heading d-flex">
                        ${eventContent}
                    </div>
                    <p onclick="openPagePlayerSelected('${event.player_id}')">${name}</p>
                </div>
            </div>
        `;

        timelineContainer.appendChild(eventElement);
    }
}

/**
 * Fetch the name of the player by their ID.
 *
 * @params player_id - The ID of the player.
 * @returns {string} - The name of the player.
 */
async function getPlayerName(player_id) {
    try {
        const response = await axios.get('gameSelected/getPlayerNameById', { params: { player_id: player_id } });
        if(response.data.length > 1){
            return response.data;
        }
        else {
            return 'Player not in the DB';
        }
    } catch (error) {
        console.error('Error fetching player name:', error);
        return 'Player not in the DB';
    }
}

/**
 * Navigate to the squadSelected page with the team ID and competition ID as parameters.
 *
 * @params teamId - The ID of the team.
 * @params competitionId - The ID of the competition.
 */
function openTeamPage(teamId, competitionId) {
    let queryString = '?param1=' +  encodeURIComponent(competitionId) + '&param2=' +  encodeURIComponent(teamId);
    window.location.href = 'squadSelected.html' + queryString;
}



/**
 * Open the selected player's page.
 * @param {number} PlayerId - ID of the selected player.
 */
function openPagePlayerSelected(PlayerId) {
    let queryString = '?param=' + encodeURIComponent(PlayerId);
    window.location.href = 'playerSelected.html' + queryString;
}
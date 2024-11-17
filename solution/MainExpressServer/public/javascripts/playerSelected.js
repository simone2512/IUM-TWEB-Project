function init() {
    let param = new URLSearchParams(window.location.search);
    playerId = param.get('param');
    axios.get('playerSelected/getPlayerStats', {params: {player_id: playerId}})
        .then(function(dataR){
            let stats = dataR.data;
            axios.get('playerSelected/getInfoPlayerSelected', { params: { player_id: playerId }})
                .then(function (dataR) {
                    createPlayerSelectedCard(dataR.data, stats);
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

function createPlayerSelectedCard(player, stats) {
    const container = document.getElementById("sectionPlayerSelected");
    container.innerHTML = '';

    const formattedMarketValue = formatValue(player.marketValueInEur);

    const playerCard = document.createElement("div");
    playerCard.classList.add("container", "mt-5", "center-container");
    document.getElementById('playerName').innerHTML= player.name;

    playerCard.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3 d-flex align-items-center justify-content-center">
                    <img src="${player.imageUrl}" class="img-fluid rounded-start img-thumbnail" alt="image ${player.name}" style="max-width: 100%; height: auto;">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Data di nascita: ${player.dateOfBirth}</li>
                            <li class="list-group-item">Posizione: ${player.position}</li>
                            <li class="list-group-item">Nazionalità: ${player.countryOfCitizenship}</li>
                            <li class="list-group-item">Altezza: ${player.heightInCm} cm</li>
                            <li class="list-group-item">Piede preferito: ${player.foot}</li>
                            <li class="list-group-item">Valore di mercato: ${formattedMarketValue}</li>
                            <li class="list-group-item">Scadenza contratto: ${player.contractExpirationDate}</li>
                            <li class="list-group-item" >Squadra attuale: <a id="link" onclick="openPageClubSelected('${player.currentClubId}', '${player.currentClubDomesticCompetitionId}')">${player.currentClubName}</a></li>
                            <li class="list-group-item">Cartellini gialli: ${stats.total_yellow_cards}</li>
                            <li class="list-group-item">Cartellini rossi: ${stats.total_red_cards}</li>
                            <li class="list-group-item">Goal totali: ${stats.total_goals}</li>
                            <li class="list-group-item">Tempo giocato: ${convertMinutesToHoursAndDays(stats.total_minutes_played)}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(playerCard);
}

function openPageClubSelected(club_id, competition_id) {

    let queryString = '?param1=' + encodeURIComponent(competition_id) + '&param2=' + encodeURIComponent(club_id);
    window.location.href = 'squadSelected.html' + queryString;
}

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

function convertMinutesToHoursAndDays(minutes) {
    if (minutes >= 1440) {
        // Se i minuti sono maggiori o uguali a 24 ore
        const days = Math.floor(minutes / 1440);
        const remainingHours = Math.floor((minutes % 1440) / 60);
        if (days === 1 && remainingHours === 1) {
            return `1 giorno 1 ora`;
        } else if (days === 1 && remainingHours !== 1) {
            return `1 giorno ${remainingHours} ore`;
        } else if (days !== 1 && remainingHours === 1) {
            return `${days} giorni 1 ora`;
        } else {
            return `${days} giorni ${remainingHours} ore`;
        }
    } else if (minutes >= 60) {
        // Se i minuti sono maggiori o uguali a 60 minuti (1 ora)
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours === 1 && remainingMinutes === 1) {
            return `1 ora 1 minuto`;
        } else if (hours === 1 && remainingMinutes !== 1) {
            return `1 ora ${remainingMinutes} minuti`;
        } else if (hours !== 1 && remainingMinutes === 1) {
            return `${hours} ore 1 minuto`;
        } else {
            return `${hours} ore ${remainingMinutes} minuti`;
        }
    } else {
        // Se i minuti sono inferiori a 60 minuti
        if (minutes === 1) {
            return `1 minuto`;
        } else {
            return `${minutes} minuti`;
        }
    }
}


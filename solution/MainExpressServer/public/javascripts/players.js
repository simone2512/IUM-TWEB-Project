/**
 * Global variables to keep track of player number, page index, and total pages.
 * @param {number} playerNumber - Total number of players matching the current filter criteria.
 * @param {number} page - Current page index of the player search results.
 * @param {number} pages - Total number of pages of player search results.
 */
let playerNumber = 0;
let page = 0;
let pages = 0;

/**
 * Array of objects representing player positions for filtering.
 * @param {Array} playerPositions - Array containing objects with text and value properties.
 */
const playerPositions = [
    { text: "Goalkeeper", value: "Goalkeeper" },
    { text: "Defender", value: "Defender" },
    { text: "Midfielder", value: "Midfield" },
    { text: "Attacker", value: "Attack" }
];

/**
 * Array of objects representing player preferred foot for filtering.
 * @param {Array} playerFoot - Array containing objects with text and value properties.
 */
const playerFoot = [
    { text: "Right", value: "right" },
    { text: "Left", value: "left" },
    { text: "Both", value: "both" }
];

/**
 * Initialize the player search page by setting up filters and fetching initial data.
 * @param {function} init - Function called to initialize the player search page.
 */
function init() {
    indexFilter = 0;
    createFilterPosition(playerPositions); // Create position filter dropdown
    createFilterFoot(playerFoot); // Create foot filter dropdown
    searchPlayer(); // Perform initial player search

    // Fetch all domestic competitions and populate the competition filter dropdown
    axios.get('/competitions/getAllDomesticCompetitions')
        .then(function (dataR) {
            createFilterCompetition(dataR.data);
        })
        .catch(function (error) {
            handleError(error); // Handle error responses appropriately
        });

    // Fetch all countries and populate the country filter dropdown
    axios.get('/players/getAllCountries')
        .then(function (dataR) {
            createFilterCountry(dataR.data);
        })
        .catch(function (error) {
            handleError(error); // Handle error responses appropriately
        });
}

/**
 * Create competition filter dropdown options based on provided data.
 * @param {Array} jsonArray - Array of competition data objects.
 */
function createFilterCompetition(jsonArray) {
    const competitionFilter = document.getElementById("dropdownCompetitions");
    competitionFilter.innerHTML = '';

    const emptyOption = document.createElement('a');
    emptyOption.className = 'dropdown-item';
    emptyOption.textContent = "No selection"
    emptyOption.onclick = function (event) {
        event.preventDefault();
        const dropdownButton = document.getElementById('dropdownMenuCompetitionsButton');
        dropdownButton.dataset.value = "";
        dropdownButton.textContent = "Competitions";
        dropdownButton.classList = "btn btn-secondary dropdown-toggle";
        const dropdownInstance = new bootstrap.Dropdown(competitionFilter);
        const squadDropdown = document.getElementById("dropdownSquads");
        squadDropdown.innerHTML = '';
        const squadDropdownButton = document.getElementById("dropdownMenuSquadsButton");
        squadDropdownButton.dataset.value = "";
        squadDropdownButton.textContent = "Squads";
        squadDropdownButton.classList = "btn btn-secondary dropdown-toggle";
        dropdownInstance.hide();
    }
    competitionFilter.appendChild(emptyOption);

    jsonArray.forEach((item) => {
        const option = document.createElement('a');
        option.className = 'dropdown-item';
        option.textContent = capitalizeAndReplace(item.name);
        option.onclick = function (event) {
            event.preventDefault();
            const dropdownButton = document.getElementById('dropdownMenuCompetitionsButton');
            dropdownButton.dataset.value = item.competitionId;
            dropdownButton.textContent = capitalizeAndReplace(item.name);
            dropdownButton.classList = "btn btn-primary dropdown-toggle";
            const squadDropdownButton = document.getElementById("dropdownMenuSquadsButton");
            squadDropdownButton.dataset.value = "";
            squadDropdownButton.textContent = "Squads";
            squadDropdownButton.classList = "btn btn-secondary dropdown-toggle";
            const dropdownInstance = new bootstrap.Dropdown(competitionFilter);
            dropdownInstance.hide();

            populateSquadsByCompetition(item.competitionId);
        };

        competitionFilter.appendChild(option);
    });
}

/**
 * Create country filter dropdown options based on provided data.
 * @param {Array} jsonArray - Array of country names.
 */
function createFilterCountry(jsonArray) {
    const dropdownMenu = document.getElementById("dropdownCountries");
    dropdownMenu.innerHTML = '';

    const emptyOption = document.createElement('a');
    emptyOption.className = 'dropdown-item';
    emptyOption.textContent = "No selection"
    emptyOption.onclick = function (event) {
        event.preventDefault();
        const dropdownButton = document.getElementById('dropdownMenuCountriesButton');
        dropdownButton.dataset.value = "";
        dropdownButton.textContent = "Countries";
        dropdownButton.classList = "btn btn-secondary dropdown-toggle";
        const dropdownInstance = new bootstrap.Dropdown(dropdownMenu);
        dropdownInstance.hide();
    }
    dropdownMenu.appendChild(emptyOption);

    jsonArray.forEach((item) => {
        const option = document.createElement('a');
        option.className = 'dropdown-item';
        option.textContent = capitalizeAndReplace(item);
        option.onclick = function (event) {
            event.preventDefault();
            const dropdownButton = document.getElementById('dropdownMenuCountriesButton');
            dropdownButton.dataset.value = item;
            dropdownButton.textContent = capitalizeAndReplace(item);
            dropdownButton.classList = "btn btn-primary dropdown-toggle";
            const dropdownInstance = new bootstrap.Dropdown(dropdownMenu);
            dropdownInstance.hide();
        };
        dropdownMenu.appendChild(option);
    });
}

/**
 * Populate squads dropdown based on the selected competition.
 * @param {string} competitionId - ID of the selected competition.
 */
function populateSquadsByCompetition(competitionId) {
    axios.get('/squads/getAllClubsCompetitionSelected', { params: { competitionId: competitionId } })
        .then(function (response) {
            createSquadOptions(response.data);
        })
        .catch(function (error) {
            handleError(error); // Handle error responses appropriately
        });
}

/**
 * Create squad options dropdown based on provided data.
 * @param {Array} jsonArray - Array of club data objects.
 */
function createSquadOptions(jsonArray) {
    const squadDropdown = document.getElementById("dropdownSquads");
    squadDropdown.innerHTML = '';

    const emptyOption = document.createElement('a');
    emptyOption.className = 'dropdown-item';
    emptyOption.textContent = "No selection"
    emptyOption.onclick = function (event) {
        event.preventDefault();
        const dropdownButton = document.getElementById('dropdownMenuSquadsButton');
        dropdownButton.dataset.value = "";
        dropdownButton.textContent = "Squads";
        dropdownButton.classList = "btn btn-secondary dropdown-toggle";
        const dropdownInstance = new bootstrap.Dropdown(squadDropdown);
        dropdownInstance.hide();
    }
    squadDropdown.appendChild(emptyOption);



    jsonArray.forEach((item) => {
        const option = document.createElement('a');
        option.className = 'dropdown-item';
        option.textContent = capitalizeAndReplace(item.club_name);
        option.href = '#';
        option.onclick = function (event) {
            event.preventDefault();
            const dropdownButton = document.getElementById('dropdownMenuSquadsButton');
            dropdownButton.dataset.value = item.club_id;
            dropdownButton.textContent = capitalizeAndReplace(item.club_name);
            dropdownButton.classList = "btn btn-primary dropdown-toggle";
            const dropdownInstance = new bootstrap.Dropdown(squadDropdown);
            dropdownInstance.hide();
        };

        squadDropdown.appendChild(option);
    });
}

/**
 * Create position filter dropdown options based on provided data.
 * @param {Array} jsonArray - Array of position objects with text and value properties.
 */
function createFilterPosition(jsonArray) {
    const dropdownMenu = document.getElementById('dropdownPositions');
    dropdownMenu.innerHTML = '';

    const emptyOption = document.createElement('a');
    emptyOption.className = 'dropdown-item';
    emptyOption.textContent = "No selection"
    emptyOption.onclick = function (event) {
        event.preventDefault();
        const dropdownButton = document.getElementById('dropdownMenuPositionsButton');
        dropdownButton.dataset.value = "";
        dropdownButton.textContent = "Positions";
        dropdownButton.classList = "btn btn-secondary dropdown-toggle";
        const subPositionDropdownButton = document.getElementById("dropdownMenuSubPositionsButton");
        subPositionDropdownButton.dataset.value = "";
        subPositionDropdownButton.textContent = "SubPositions";
        subPositionDropdownButton.classList = "btn btn-secondary dropdown-toggle";
        const dropdownInstance = new bootstrap.Dropdown(dropdownMenu);
        dropdownInstance.hide();
    }
    dropdownMenu.appendChild(emptyOption);

    jsonArray.forEach((position) => {
        const listItem = document.createElement('li');
        const positionItem = document.createElement('a');
        positionItem.className = 'dropdown-item';
        positionItem.textContent = position.text;
        positionItem.onclick = function (event) {
            event.preventDefault();
            const dropdownButton = document.getElementById('dropdownMenuPositionsButton');
            dropdownButton.dataset.value = position.value;
            dropdownButton.textContent = position.text;
            dropdownButton.classList = "btn btn-primary dropdown-toggle";
            const subPositionDropdownButton = document.getElementById("dropdownMenuSubPositionsButton");
            subPositionDropdownButton.dataset.value = "";
            subPositionDropdownButton.textContent = "SubPositions";
            subPositionDropdownButton.classList = "btn btn-secondary dropdown-toggle";
            const dropdownInstance = new bootstrap.Dropdown(dropdownMenu);
            dropdownInstance.hide();
            createFilterSubPosition(position.value);
        };
        listItem.appendChild(positionItem);
        dropdownMenu.appendChild(listItem);
    });
}

/**
 * Create foot filter dropdown options based on provided data.
 * @param {Array} jsonArray - Array of foot objects with text and value properties.
 */
function createFilterFoot(jsonArray) {
    const dropdownMenu = document.getElementById('dropdownFoot');
    dropdownMenu.innerHTML = '';

    const emptyOption = document.createElement('a');
    emptyOption.className = 'dropdown-item';
    emptyOption.textContent = "No selection"
    emptyOption.onclick = function (event) {
        event.preventDefault();
        const dropdownButton = document.getElementById('dropdownMenuFootButton');
        dropdownButton.dataset.value = "";
        dropdownButton.textContent = "Foot";
        dropdownButton.classList = "btn btn-secondary dropdown-toggle";
        const dropdownInstance = new bootstrap.Dropdown(dropdownMenu);
        dropdownInstance.hide();
    }
    dropdownMenu.appendChild(emptyOption);

    jsonArray.forEach((foot) => {
        const listItem = document.createElement('li');
        const footItem = document.createElement('a');
        footItem.className = 'dropdown-item';
        footItem.textContent = foot.text;
        footItem.onclick = function (event) {
            event.preventDefault();
            const dropdownButton = document.getElementById('dropdownMenuFootButton');
            dropdownButton.dataset.value = foot.value;
            dropdownButton.textContent = foot.text;
            dropdownButton.classList = "btn btn-primary dropdown-toggle";
            const dropdownInstance = new bootstrap.Dropdown(dropdownMenu);
            dropdownInstance.hide();
        };
        listItem.appendChild(footItem);
        dropdownMenu.appendChild(listItem);
    });
}

/**
 * Create sub-position filter dropdown options based on selected position.
 * @param {string} position - The selected main position (e.g., Goalkeeper, Defender).
 */
function createFilterSubPosition(position) {
    const subPositionFilter = document.getElementById("dropdownSubPositions");
    subPositionFilter.innerHTML = '';

    const emptyOption = document.createElement('a');
    emptyOption.className = 'dropdown-item';
    emptyOption.textContent = "No selection"
    emptyOption.onclick = function (event) {
        event.preventDefault();
        const dropdownButton = document.getElementById('dropdownMenuSubPositionsButton');
        dropdownButton.dataset.value = "";
        dropdownButton.textContent = "SubPositions";
        dropdownButton.classList = "btn btn-secondary dropdown-toggle";
        const dropdownInstance = new bootstrap.Dropdown(subPositionFilter);
        dropdownInstance.hide();
    }
    subPositionFilter.appendChild(emptyOption);

    // Define sub-positions based on main position
    const subPositions = {
        "Goalkeeper": [],
        "Defender": [
            { text: "LB", value: "Left-Back" },
            { text: "RB", value: "Right-Back" },
            { text: "CB", value: "Centre-Back" }
        ],
        "Midfield": [
            { text: "CDM", value: "Defensive Midfield" },
            { text: "CM", value: "Central Midfield" },
            { text: "CAM", value: "Attacking Midfield" },
            { text: "LM", value: "Left Midfield" },
            { text: "RM", value: "Right Midfield" }
        ],
        "Attack": [
            { text: "LW", value: "Left Winger" },
            { text: "RW", value: "Right Winger" },
            { text: "CF", value: "Centre-Forward" },
            { text: "ST", value: "Second Striker" }
        ]
    };

    // Create sub-position dropdown items
    subPositions[position].forEach(subPos => {
        const listItem = document.createElement('li');
        const subPosItem = document.createElement('a');
        subPosItem.className = 'dropdown-item';
        subPosItem.textContent = subPos.text;
        subPosItem.onclick = function (event) {
            event.preventDefault();
            const dropdownButton = document.getElementById('dropdownMenuSubPositionsButton');
            dropdownButton.dataset.value = subPos.value;
            dropdownButton.textContent = subPos.text;
            dropdownButton.classList = "btn btn-primary dropdown-toggle";
            const dropdownInstance = new bootstrap.Dropdown(subPositionFilter);
            dropdownInstance.hide();
        };

        listItem.appendChild(subPosItem);
        subPositionFilter.appendChild(listItem);
    });
}

/**
 * Perform player search based on selected filters and pagination.
 * @param {function} searchPlayer - Function called to initiate the player search.
 */
function searchPlayerButton() {
    page = 0; // Reset page index to the first page
    searchPlayer(); // Initiate player search
}

/**
 * Perform player search based on selected filters and pagination.
 * @param {function} searchPlayer - Function called to initiate the player search.
 */
function searchPlayer() {
    const competitionId = document.getElementById('dropdownMenuCompetitionsButton').dataset.value || '';
    const clubId = document.getElementById('dropdownMenuSquadsButton').dataset.value || '';
    const nationality = document.getElementById('dropdownMenuCountriesButton').dataset.value || '';
    const position = document.getElementById('dropdownMenuPositionsButton').dataset.value || '';
    const subPosition = document.getElementById('dropdownMenuSubPositionsButton').dataset.value || '';
    const foot = document.getElementById('dropdownMenuFootButton').dataset.value || '';

    // Perform API request to fetch players based on filters and pagination
    axios.get('/players/getPlayersByFilter', { params: { competitionId, clubId, nationality, position, subPosition, foot, page, size: 60 } })
        .then(function (response) {
            pages = response.data.totalPages;
            playerNumber = response.data.totalElements;
            createCards(response.data); // Create player cards based on fetched data
        })
        .catch(function (error) {
            handleError(error); // Handle error responses appropriately
        });
}

/**
 * Create player cards based on the fetched data.
 * @param {Array} jsonArray - Array of player data objects.
 */
function createCards(jsonArray) {
        const container = document.getElementById("SectionAllPlayers");
        // Remove existing cards before adding new ones
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        jsonArray.content.forEach((item, index) => {

            // Create player card
            const card = document.createElement("div");
            card.classList.add("col", "mb-1", "col-md-3", "col-lg-2");
            card.innerHTML = `
            <div class="card border rounded-lg shadow" onclick="openPagePlayerSelected(${jsonArray.content[index].playerId})">
                <img src="${jsonArray.content[index].imageUrl}" class="card-img-top img-fluid rounded" alt="${jsonArray.content[index].name}">
                <div class="card-body">
                    <h5 class="card-title text-center">${jsonArray.content[index].name}</h5>
                </div>
            </div>
        `;

            container.appendChild(card);
        });
        // Scroll to the top of the page
        const element = document.body;
        element.scrollIntoView({ behavior: 'instant', block: 'start' });
}

/**
 * Decrement the page index for player search results.
 * @param {function} decrementIndexFilter - Function to decrement the page index and perform player search.
 */
function decrementIndexFilter() {
    if (page == 1) {
        page--;
        searchPlayer();
        document.getElementById('decrementIndexFilter1').onclick = null;
        document.getElementById('decrementIndexFilter2').onclick = null;
    } else {
        page--;
        searchPlayer();
    }
    if (pages > page) {
        document.getElementById('incrementIndexFilter1').onclick = function () {
            incrementIndexFilter();
        };
        document.getElementById('incrementIndexFilter2').onclick = function () {
            incrementIndexFilter();
        };
    }
}

/**
 * Increment the page index for player search results.
 * @param {function} incrementIndexFilter - Function to increment the page index and perform player search.
 */
function incrementIndexFilter() {
    if (page == pages - 2) {
        page++;
        searchPlayer();
        document.getElementById('incrementIndexFilter1').onclick = null;
        document.getElementById('incrementIndexFilter2').onclick = null;
    } else {
        page++;
        searchPlayer();
    }
    if (page > 0) {
        document.getElementById('decrementIndexFilter1').onclick = function () {
            decrementIndexFilter();
        };
        document.getElementById('decrementIndexFilter2').onclick = function () {
            decrementIndexFilter();
        };
    }
}

/**
 * Open the selected player's page.
 * @param {number} PlayerId - ID of the selected player.
 */
function openPagePlayerSelected(PlayerId) {
    let queryString = '?param=' + encodeURIComponent(PlayerId);
    window.location.href = 'playerSelected.html' + queryString;
}

/**
 * Capitalize the first letter of each word in a string and replace hyphens with spaces.
 * @param {string} string - Input string to be formatted.
 * @returns {string} - Formatted string with capitalized words and hyphens replaced by spaces.
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
 * Handle errors from axios API requests and display appropriate alerts.
 * @param {Object} error - Error object returned from axios.
 */
function handleError(error) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                alert("Error 400: Bad Request");
                break;
            case 404:
                document.getElementById("SectionAllPlayers").innerHTML = "If you haven't found any results, try to reduce the filters.";
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

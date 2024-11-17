// Global variables to store competition ID and club ID
let competitionId;
let clubId;

/**
 * Initialize the squad selected page by fetching club information and player squad.
 */
function init() {
    // Extract competition ID and club ID from URL query parameters
    let param = new URLSearchParams(window.location.search);
    competitionId = param.get('param1');
    clubId = param.get('param2');

    // Fetch information about the selected club
    axios.get('squadSelected/getInfoClubSelected', {params: {clubId: clubId}})
        .then(function (dataR) {
            // Process and display club information
            let jsonString = JSON.stringify(dataR.data);
            let cleanedString = jsonString.substring(2, jsonString.length - 2);
            let infoSquads = cleanedString.split(',');
            console.log(infoSquads);
            // Capitalize and format specific fields
            infoSquads[2] = capitalizeAndReplace(infoSquads[2]); // Team name
            infoSquads[3] = capitalizeAndReplace(infoSquads[3]); // Competition
            infoSquads[9] = capitalizeAndReplace(infoSquads[10]); // Stadium name
            document.getElementById('teamName').innerHTML = capitalizeAndReplace(infoSquads[2]);
            // Display club information on the page
            document.getElementById('infoSquad').innerHTML = "Competition: " + infoSquads[3] + "<br>Stadium name: "
                + infoSquads[9] + "<br>Net Value: " + infoSquads[12];

            // Display club logo
            let img = document.createElement('img');
            img.src = "https://tmssl.akamaized.net/images/wappen/head/" + clubId + ".png?lm=1701079293";
            img.alt = 'Squad imagine';
            let imageContainer = document.getElementById('imageContainerSquad');
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
            imageContainer.appendChild(img);
        })
        .catch(function (error) {
            // Handle different types of errors
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

    // Fetch players in the squad of the selected club
    axios.get('squadSelected/getPlayerSquad', {params: {clubId: clubId}})
        .then(function (dataR) {
            createCards(JSON.stringify(dataR.data)); // Call function to create player cards
        })
        .catch(function (error) {
            // Handle different types of errors
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
 * Create cards for each player in the squad and display them.
 * @param {string} inputString - JSON string containing player data.
 */
function createCards(inputString) {
    const jsonArray = JSON.parse(inputString); // Parse JSON string to array of objects
    const container = document.getElementById("sectionPlayerClub"); // Container where player cards will be appended

    container.innerHTML = ''; // Reset container before populating with new cards

    // Loop through each player in the JSON array and create cards
    jsonArray.forEach((item, index) => {
        const [playerId, name, imageUrl] = item.split(","); // Destructure player data from current item

        // Create card element
        const card = document.createElement("div");
        card.classList.add("col", "mb-1", "col-md-3", "col-lg-2"); // Set column sizes
        card.innerHTML = `
            <div class="card border rounded-lg shadow" onclick="openPagePlayerSelected(${playerId})">
                <img src="${imageUrl}" class="card-img-top img-fluid rounded" alt="${name}">
                <div class="card-body">
                    <h5 class="card-title text-center">${name}</h5>
                </div>
            </div>
        `;

        container.appendChild(card); // Append card to the container
    });
}

/**
 * Capitalize words in a hyphenated string and replace hyphens with spaces.
 * @param {string} string - String to be formatted.
 * @returns {string} - Formatted string with capitalized words and hyphens replaced.
 */
function capitalizeAndReplace(string) {
    let words = string.split('-'); // Split string by hyphens into words

    // Capitalize each word and join with spaces
    for (let i = 0; i < words.length; i++) {
        let capitalizedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        words[i] = capitalizedWord;
    }

    let finalString = words.join(' '); // Join words with spaces

    return finalString; // Return formatted string
}

/**
 * Redirect to the selected player's page.
 * @param {string} playerId - ID of the selected player.
 */
function openPagePlayerSelected(playerId) {
    let queryString = '?param=' + encodeURIComponent(playerId);
    window.location.href = 'playerSelected.html' + queryString; // Redirect to playerSelected.html page with query string
}

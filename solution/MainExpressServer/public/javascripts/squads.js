// Global variable to store competition ID
let competitionId;

/**
 * Initialize the squads page by fetching all clubs for the selected competition.
 * @param {function} init - Function called to initialize the squads page.
 */
function init() {
    // Extract competition ID from URL query parameters
    let param = new URLSearchParams(window.location.search);
    competitionId = param.get('param');

    // Fetch all clubs for the selected competition
    axios.get('/squads/getAllClubsCompetitionSelected', { params: { competitionId: competitionId }})
        .then(function (dataR) {
            createCards(dataR.data); // Call function to create cards for fetched club data
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
 * Redirect to the selected competition's page.
 */
function openPageCompetitionSelected() {
    let queryString = '?param=' + encodeURIComponent(competitionId);
    window.location.href = 'competitionSelected.html' + queryString;
}

/**
 * Redirect to the games page for the selected competition.
 */
function openPageGames() {
    let queryString = '?param=' + encodeURIComponent(competitionId);
    window.location.href = 'games.html' + queryString;
}

/**
 * Create cards for each club in the provided JSON array and display them.
 * @param {array} jsonArray - JSON string containing club data.
 */
function createCards(jsonArray) {

    const container = document.getElementById("SectionAllSquads"); // Container where cards will be appended

    // Reset container before populating with new cards
    container.innerHTML = '';

    // Loop through each club in the JSON array and create cards
    jsonArray.forEach((item, index) => {
        // Create a new row (div) for every 4 cards
        if (index % 4 === 0) {
            const row = document.createElement("div");
            row.classList.add("row", "row-cols-1", "row-cols-md-2", "row-cols-lg-4", "justify-content-center");
            container.appendChild(row);
        }

        const { club_id, club_name } = item; // Destructure club_id and club_name from current item

        // Create card element
        const card = document.createElement("div");
        card.classList.add("col", "mb-4");
        card.style.width = "20%"; // Set width of the card

        // Attach onclick event to redirect to club selected page
        card.onclick = function() {
            openPageClubSelected(club_id);
        };

        // Create card content
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-md-3", "border", "border-2", "rounded", "shadow-lg", "px-3", "py-3");

        // Create image element for club logo
        const img = document.createElement("img");
        img.src = "https://tmssl.akamaized.net/images/wappen/head/" + club_id + ".png?lm=1701079293"; // URL for club logo
        img.classList.add("card-img-top", "img-fluid", "rounded");
        img.alt = club_name;

        // Create card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // Create title for the card
        const title = document.createElement("h5");
        title.classList.add("card-title", "text-center", "mt-5");
        title.textContent = club_name;

        // Append elements to their respective parents
        cardBody.appendChild(title);
        cardContent.appendChild(img);
        cardContent.appendChild(cardBody);
        card.appendChild(cardContent);

        // Append card to the last created row
        container.lastChild.appendChild(card);
    });
}

/**
 * Redirect to the selected club's squad page.
 * @param {string} club_id - ID of the selected club.
 */
function openPageClubSelected(club_id) {
    let queryString = '?param1=' + encodeURIComponent(competitionId) + '&param2=' + encodeURIComponent(club_id);
    window.location.href = 'squadSelected.html' + queryString; // Redirect to squadSelected.html page with query string
}

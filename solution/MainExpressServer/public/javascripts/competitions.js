/**
 * Initializes the application by fetching all competitions data.
 * Makes an HTTP GET request to '/competitions/getAllCompetitions'.
 * On success, calls createCards() with the received data.
 * On failure, handles different error responses and alerts the user.
 */
function init() {
    axios.get('/competitions/getAllCompetitions')
        .then (function (dataR) {
            createCards(dataR.data);
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
 * Creates and displays competition cards from the provided data.
 * @param {Array} jsonArray - An array of competition objects.
 */
function createCards(jsonArray) {
    const container = document.getElementById("SectionAllCompetitions");

    // Reset container
    container.innerHTML = '';

    jsonArray.forEach((item, index) => {
        // Create a new row (div) for every four items
        if (index % 4 === 0) {
            const row = document.createElement("div");
            row.classList.add("row", "row-cols-1", "row-cols-md-2", "row-cols-lg-4", "justify-content-center", "px-2");
            container.appendChild(row);
        }

        // Create the card
        const card = document.createElement("div");
        card.classList.add("col", "mb-4");
        card.style.width = "20%";

        // Set onclick event to open the selected competition page
        card.onclick = function() {
            openPageCompetitionSelected(jsonArray[index].competitionId);
        };

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-md-3","border", "border-2", "rounded", "shadow-lg","px-3", "py-3");

        const img = document.createElement("img");
        img.src = "https://tmssl.akamaized.net/images/logo/header/" + jsonArray[index].competitionId.toLowerCase() + ".png?lm=1521104656";
        img.classList.add("card-img-top", "img-fluid", "rounded");
        img.alt = jsonArray[index].name;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title", "text-center", "mt-5");
        title.textContent = capitalizeAndReplace(jsonArray[index].name);

        cardBody.appendChild(title);
        cardContent.appendChild(img);
        cardContent.appendChild(cardBody);
        card.appendChild(cardContent);

        container.lastChild.appendChild(card);
    });
}

/**
 * Opens the competition selected page with the specified competition ID.
 * @param {string} competitionId - The ID of the selected competition.
 */
function openPageCompetitionSelected(competitionId) {
    let queryString = '?param=' +  encodeURIComponent(competitionId);
    window.location.href = 'competitionSelected.html' + queryString;
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

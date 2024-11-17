let express = require('express'); // Import Express framework
let router = express.Router(); // Create an instance of Express Router
const axios = require('axios'); // Import Axios for making HTTP requests

// Route to render the players view
router.get('/', function(req, res, next) {
    res.render('players', { title: 'Express' }); // Render 'players' view with title 'Express'
});

// Route to fetch all countries from an external service
router.get('/getAllCountries', async (req, res, next) => {
    try {
        const response = await axios.get('http://localhost:8081/getAllCountriesDB'); // Make GET request
        res.status(response.status).json(response.data); // Respond with status and data received
    } catch (error) {
        // Handle errors from Axios or downstream service
        if (error.response) {
            res.status(error.response.status).send(error.response.data); // Error from external service
        } else if (error.request) {
            res.status(500).send('No response received from downstream service'); // No response received
        } else {
            console.error('Error in setting up the request', error.message); // Other errors
            res.status(500).send('Error in setting up the request');
        }
    }
});

// Route to fetch players filtered by various criteria from an external service
router.get('/getPlayersByFilter', async (req, res, next) => {
    // Extract query parameters
    const competitionId = req.query.competitionId;
    const clubId = req.query.clubId;
    const nationality = req.query.nationality;
    const position = req.query.position;
    const subPosition = req.query.subPosition;
    const foot = req.query.foot;
    const page = req.query.page;
    const size = req.query.size;

    // Object to store only non-null parameters
    const params = {};

    // Add non-null parameters to the params object
    if (competitionId) {
        params.competitionId = competitionId;
    }
    if (clubId) {
        params.clubId = clubId;
    }
    if (nationality) {
        params.nationality = nationality;
    }
    if (position) {
        params.position = position;
    }
    if (subPosition) {
        params.subPosition = subPosition;
    }
    if (foot) {
        params.foot = foot;
    }
    params.page = page; // Add page parameter
    params.size = size; // Add size parameter

    try {
        const response = await axios.get('http://localhost:8081/getAllPlayersFiltered', {
            params: params // Pass params object as query parameters
        });
        res.status(response.status).json(response.data); // Respond with status and data received
    } catch (error) {
        // Handle errors from Axios or downstream service
        if (error.response) {
            res.status(error.response.status).send(error.response.data); // Error from external service
        } else if (error.request) {
            res.status(500).send('No response received from downstream service'); // No response received
        } else {
            console.error('Error in setting up the request', error.message); // Other errors
            res.status(500).send('Error in setting up the request');
        }
    }
});

module.exports = router; // Export the router to be used in other parts of the application

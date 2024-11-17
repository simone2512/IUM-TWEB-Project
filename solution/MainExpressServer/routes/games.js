// Import necessary modules
let express = require('express');
let router = express.Router();
const axios = require('axios'); // Import Axios for making HTTP requests

// Route to render games view
router.get('/', function(req, res, next) {
    res.render('games', { title: 'Express' });
});

// Route to fetch all seasons of a competition from MongoDB via HTTP GET request
router.get('/getAllSeasonOfCompetitionMongo', async (req, res, next) => {
    const competitionId = req.query.competitionId; // Extract competitionId from query parameters
    try {
        // Send GET request to external service to fetch all seasons of the competition from MongoDB
        const response = await axios.get('http://localhost:3001/getSeasonsCompetitionMongoDB', {
            params: { competitionId: competitionId } // Pass competitionId as query parameter
        });

        // Respond with the status and data received from the external service
        res.status(response.status).json(response.data);
    } catch (error) {
        // Handle errors from Axios or downstream service
        if (error.response) {
            // If the error came from the external service (response received)
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // If no response received from the external service
            res.status(500).send('No response received from downstream service');
        } else {
            // Other errors (e.g., network errors, bad request setup)
            console.error('Error in setting up the request', error.message);
            res.status(500).send('Error in setting up the request');
        }
    }
});

// Route to fetch rounds of a specific season of a competition from MongoDB via HTTP GET request
router.get('/getRoundsOfSeasonMongo', async (req, res, next) => {
    const competitionId = req.query.competitionId; // Extract competitionId from query parameters
    const season = req.query.season; // Extract season from query parameters
    try {
        // Send GET request to external service to fetch rounds of the specified season from MongoDB
        const response = await axios.get('http://localhost:3001/getRoundsOfSeasonMongoDB', {
            params: { competitionId: competitionId, season: season } // Pass competitionId and season as query parameters
        });

        // Respond with the status and data received from the external service
        res.status(response.status).json(response.data);
    } catch (error) {
        // Handle errors from Axios or downstream service
        if (error.response) {
            // If the error came from the external service (response received)
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // If no response received from the external service
            res.status(500).send('No response received from downstream service');
        } else {
            // Other errors (e.g., network errors, bad request setup)
            console.error('Error in setting up the request', error.message);
            res.status(500).send('Error in setting up the request');
        }
    }
});

// Route to fetch games of a specific round of a season of a competition from MongoDB via HTTP GET request
router.get('/getGamesOfRoundOfSeasonMongo', async (req, res, next) => {
    const competitionId = req.query.competitionId; // Extract competitionId from query parameters
    const season = req.query.season; // Extract season from query parameters
    const round = req.query.round; // Extract round from query parameters
    try {
        // Send GET request to external service to fetch games of the specified round from MongoDB
        const response = await axios.get('http://localhost:3001/getGamesRoundOfSeasonMongoDB', {
            params: { competitionId: competitionId, season: season, round: round } // Pass competitionId, season, and round as query parameters
        });

        if(response.status === 404)
            res.status(404).json(response.data);
        res.status(response.status).json(response.data);
    } catch (error) {
        // Handle errors from Axios or downstream service
        if (error.response) {
            // If the error came from the external service (response received)
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // If no response received from the external service
            res.status(500).send('No response received from downstream service');
        } else {
            // Other errors (e.g., network errors, bad request setup)
            console.error('Error in setting up the request', error.message);
            res.status(500).send('Error in setting up the request');
        }
    }
});

// Export the router so it can be used in other files
module.exports = router;

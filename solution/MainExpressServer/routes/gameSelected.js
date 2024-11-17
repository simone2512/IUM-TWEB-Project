// Import necessary modules
let express = require('express');
let router = express.Router();
const axios = require('axios'); // Import Axios for making HTTP requests

// Route to render gameSelected view
router.get('/', function(req, res, next) {
    res.render('gameSelected', { title: 'Express' });
});

// Route to fetch game information from MongoDB by gameId via HTTP GET request
router.get('/getInfoGameMongo', async (req, res, next) => {
    const gameId = req.query.gameId; // Extract gameId from query parameters
    try {
        // Send GET request to external service to fetch game information by gameId from MongoDB
        const response = await axios.get('http://localhost:3001/getInfoGameDB', {
            params: { gameId: gameId } // Pass gameId as query parameter
        });
        if(response.status === 404)
            res.status(404).json("No game Info found with this GameId");
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

// Route to fetch game event information from MongoDB by gameId via HTTP GET request
router.get('/getInfoGameEventMongo', async (req, res, next) => {
    const gameId = req.query.gameId; // Extract gameId from query parameters
    try {
        // Send GET request to external service to fetch game event information by gameId from MongoDB
        const response = await axios.get('http://localhost:3001/getInfoGameEventDB', {
            params: { gameId: gameId } // Pass gameId as query parameter
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

// Route to fetch player name by player_id from a different service via HTTP GET request
router.get('/getPlayerNameById', async (req, res, next) => {
    const player_id = req.query.player_id; // Extract player_id from query parameters
    try {
        // Send GET request to another external service to fetch player name by player_id
        const response = await axios.get('http://localhost:8081/getPlayerNameById', {
            params: { player_id: player_id } // Pass player_id as query parameter
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

// Export the router so it can be used in other files
module.exports = router;

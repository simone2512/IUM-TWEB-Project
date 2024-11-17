// Import necessary modules
let express = require('express');
let router = express.Router();
const axios = require('axios'); // Import Axios for making HTTP requests

// Route to render competitionSelected view
router.get('/', function(req, res, next) {
    res.render('competitionSelected', { title: 'Express' });
});

// Route to fetch information about a selected competition from a database via HTTP GET request
router.get('/getInfoCompetitionSelected', async (req, res, next) => {
    const competitionId = req.query.competitionId; // Extract competitionId from query parameters
    try {
        // Send GET request to external service to fetch information about the selected competition
        const response = await axios.get('http://localhost:8081/getInfoCompetitionSelectedDB', {
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

// Route to fetch leaderboard information for a selected competition from a MongoDB via HTTP GET request
router.get('/getLeadboardMongo', async (req, res, next) => {
    const competitionId = req.query.competitionId; // Extract competitionId from query parameters
    try {
        // Send GET request to external service to fetch leaderboard information from MongoDB
        const response = await axios.get('http://localhost:3001/getLeadboardMongoDB', {
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

// Route to fetch roll of honour information for a selected competition from MongoDB via HTTP GET request
router.get('/getRollOfHonourMongo', async (req, res, next) => {
    const competitionId = req.query.competitionId; // Extract competitionId from query parameters
    try {
        // Send GET request to external service to fetch roll of honour information from MongoDB
        const response = await axios.get('http://localhost:3001/getRollOfHonourMongoDB', {
            params: { competitionId: competitionId } // Pass competitionId as query parameter
        });

        // Respond with the status and data received from the external service
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

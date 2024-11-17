// Import necessary modules
let express = require('express');
let router = express.Router();
const axios = require('axios'); // Import Axios for making HTTP requests

// Route to render competitions view
router.get('/', function(req, res, next) {
    res.render('competitions', { title: 'Express' });
});

// Route to fetch all competitions from a database via HTTP GET request
router.get('/getAllCompetitions', async (req, res, next) => {
    try {
        // Send GET request to external service to fetch all competitions
        const response = await axios.get('http://localhost:8081/getAllCompetitionsDB');

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

// Route to fetch all domestic competitions from a database via HTTP GET request
router.get('/getAllDomesticCompetitions', async (req, res, next) => {
    try {
        // Send GET request to external service to fetch all domestic competitions
        const response = await axios.get('http://localhost:8081/getAllDomesticCompetitionsDB');

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

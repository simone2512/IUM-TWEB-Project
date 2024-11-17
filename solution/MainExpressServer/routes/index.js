var express = require('express'); // Import Express framework
var router = express.Router(); // Create an instance of Express Router
const axios = require('axios'); // Import Axios for making HTTP requests

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'}); // Render 'index' view with title 'Express'
});

// Route to fetch best players data from an external service
router.get('/getBestPlayers', async (req, res, next) => {
    try {
        const response = await axios.get('http://localhost:8081/getBestPlayersDB'); // Make GET request
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

// Route to fetch best clubs data from an external service
router.get('/getBestClubs', async (req, res, next) => {
    try {
        const response = await axios.get('http://localhost:8081/getBestClubsDB', {}); // Make GET request
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

// Route to fetch best competitions data from an external service
router.get('/getBestCompetitions', async (req, res, next) => {
    try {
        const response = await axios.get('http://localhost:8081/getBestCompetitionsDB', {}); // Make GET request
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

// Route to fetch club value by clubId from an external service
router.get('/getClubValue', async (req, res, next) => {
    try {
        const clubId = req.query.clubId; // Extract clubId from query parameters
        const response = await axios.get('http://localhost:8081/getClubValueDB', {
            params: { clubId: clubId } // Pass clubId as query parameter
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

// Route to fetch competition value by competitionId from an external service
router.get('/getCompetitionValue', async (req, res, next) => {
    try {
        const competitionId = req.query.competitionId; // Extract competitionId from query parameters
        const response = await axios.get('http://localhost:8081/getCompetitionValueDB', {
            params: { competitionId: competitionId } // Pass competitionId as query parameter
        });

        if (response.data.length === 0) {
            res.status(404).send('No data found'); // If no data found, send 404 response
        }

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

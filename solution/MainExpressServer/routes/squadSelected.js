let express = require('express'); // Import Express framework
let router = express.Router(); // Create an instance of Express Router
const axios = require('axios'); // Import Axios for making HTTP requests

// Route to render the squadSelected view
router.get('/', function(req, res, next) {
    res.render('squadSelected', { title: 'Express' }); // Render 'squadSelected' view with title 'Express'
});

// Route to fetch information about a selected club
router.get('/getInfoClubSelected', async (req, res, next) => {
    const clubId = req.query.clubId; // Extract clubId from query parameters
    try {
        const response = await axios.get('http://localhost:8081/getInfoClubSelectedDB', {
            params: { clubId: clubId } // Pass clubId as query parameter to the external service
        });
        res.status(response.status).json(response.data); // Respond with status and data received from external service
    } catch (error) {
        // Handle errors from Axios or downstream service
        if (error.response) {
            res.status(error.response.status).send(error.response.data); // Error response from external service
        } else if (error.request) {
            res.status(500).send('No response received from downstream service'); // No response received
        } else {
            console.error('Error in setting up the request', error.message); // Other errors
            res.status(500).send('Error in setting up the request');
        }
    }
});

// Route to fetch players in a selected squad
router.get('/getPlayerSquad', async (req, res, next) => {
    const clubId = req.query.clubId; // Extract clubId from query parameters
    try {
        const response = await axios.get('http://localhost:8081/getPlayerSquadDB', {
            params: { clubId: clubId } // Pass clubId as query parameter to the external service
        });
        res.status(response.status).json(response.data); // Respond with status and data received from external service
    } catch (error) {
        // Handle errors from Axios or downstream service
        if (error.response) {
            res.status(error.response.status).send(error.response.data); // Error response from external service
        } else if (error.request) {
            res.status(500).send('No response received from downstream service'); // No response received
        } else {
            console.error('Error in setting up the request', error.message); // Other errors
            res.status(500).send('Error in setting up the request');
        }
    }
});

module.exports = router; // Export the router to be used in other parts of the application

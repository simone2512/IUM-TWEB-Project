let express = require('express'); // Import Express framework
let router = express.Router(); // Create an instance of Express Router
const axios = require('axios'); // Import Axios for making HTTP requests

// Route to render the squads view
router.get('/', function(req, res, next) {
    res.render('squads', { title: 'Express' }); // Render 'squads' view with title 'Express'
});

// Route to fetch all clubs for a selected competition
router.get('/getAllClubsCompetitionSelected', async (req, res, next) => {
    const competitionId = req.query.competitionId; // Extract competitionId from query parameters
    try {
        const response = await axios.get('http://localhost:3001/getClubsMongoDB', {
            params: { competitionId: competitionId } // Pass competitionId as query parameter to the external service
        });
        if(response.status === 404)
            res.status(404).json(response.data);
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

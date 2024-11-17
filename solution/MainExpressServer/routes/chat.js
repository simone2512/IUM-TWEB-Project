// Import necessary modules
let express = require('express');
let router = express.Router();
const axios = require('axios'); // Import Axios for making HTTP requests

// Define a route for GET requests to '/'
router.get('/', function(req, res, next) {
    // Render the 'chat' view (assumed to be a template named 'chat')
    // Pass an object with a title property set to 'Express' to the view
    res.render('chat', { title: 'Express' });
});

// Export the router so it can be used in other files
module.exports = router;

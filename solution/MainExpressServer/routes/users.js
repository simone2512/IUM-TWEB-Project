var express = require('express'); // Import the Express framework
var router = express.Router(); // Create an instance of Express Router

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); // Send a response 'respond with a resource' for GET requests to '/'
});

module.exports = router; // Export the router to be used in other parts of the application

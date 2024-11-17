let express = require('express');
let router = express.Router();
const controllerGames = require("../controllers/games"); // Import controller for games
const controllerGameEvents = require("../controllers/game_events"); // Import controller for game events
const controllerGameLineups = require("../controllers/game_lineups"); // Import controller for game lineups
const controllerClubGames = require("../controllers/club_games"); // Import controller for club games
const controllerAppearances = require("../controllers/appearances"); // Import controller for club games

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'}); // Render index page with title 'Express'
});

/* Route to get leaderboard data for a competition from MongoDB */
router.get('/getLeadboardMongoDB', async (req, res, next) => {
    try {
        const competition = req.query.competitionId; // Extract competition ID from query parameters
        const results = await controllerGames.queryLeaderboard(competition); // Call controller method to query leaderboard
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get roll of honour data for a competition from MongoDB */
router.get('/getRollOfHonourMongoDB', async (req, res, next) => {
    try {
        const competition = req.query.competitionId; // Extract competition ID from query parameters
        const results = await controllerGames.queryRollOfHonour(competition); // Call controller method to query roll of honour
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get clubs participating in a competition from MongoDB */
router.get('/getClubsMongoDB', async (req, res, next) => {
    try {
        const competition = req.query.competitionId; // Extract competition ID from query parameters
        const results = await controllerGames.queryClubsCompetitionSelected(competition, 2023); // Call controller method to query clubs
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get information about a specific game from MongoDB */
router.get('/getInfoGameDB', async (req, res, next) => {
    try {
        const gameId = req.query.gameId; // Extract game ID from query parameters
        const results = await controllerGames.queryGameDB(gameId); // Call controller method to query game details
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get game events for a specific game from MongoDB */
router.get('/getInfoGameEventDB', async (req, res, next) => {
    try {
        const gameId = req.query.gameId; // Extract game ID from query parameters
        const results = await controllerGameEvents.queryGameEvent(gameId); // Call controller method to query game events
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get seasons for a specific competition from MongoDB */
router.get('/getSeasonsCompetitionMongoDB', async (req, res, next) => {
    try {
        const competition = req.query.competitionId; // Extract competition ID from query parameters
        const results = await controllerGames.querySeasonsCompetition(competition); // Call controller method to query seasons
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get games for a specific season of a competition from MongoDB */
router.get('/getGamesOfSeasonMongoDB', async (req, res, next) => {
    try {
        const competition = req.query.competitionId; // Extract competition ID from query parameters
        const season = parseInt(req.query.season); // Parse season from query parameters
        const results = await controllerGames.queryGamesOfSeason(competition, season); // Call controller method to query games
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get rounds for a specific season of a competition from MongoDB */
router.get('/getRoundsOfSeasonMongoDB', async (req, res, next) => {
    try {
        const competition = req.query.competitionId; // Extract competition ID from query parameters
        const season = parseInt(req.query.season); // Parse season from query parameters
        const results = await controllerGames.queryRoundsOfSeason(competition, season); // Call controller method to query rounds
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get games for a specific round of a season from MongoDB */
router.get('/getGamesRoundOfSeasonMongoDB', async (req, res, next) => {
    try {
        const competition = req.query.competitionId; // Extract competition ID from query parameters
        const season = parseInt(req.query.season); // Parse season from query parameters
        const round = req.query.round; // Extract round from query parameters
        const results = await controllerGames.queryGamesRoundOfSeason(competition, season, round); // Call controller method to query games
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

/* Route to get player stats for a specific playerId from MongoDB */
router.get('/getPlayerStatsDB', async (req, res, next) => {
    try {
        const playerId = req.query.playerId; // Extract game ID from query parameters
        const results = await controllerAppearances.getPlayerStats(playerId); // Call controller method to query game events
        if(results.length === 0){
            res.status(404).send("No clubs of competition found");
        }else{
            res.status(200).json(results); // Send JSON response with clubs data
        }
    } catch (error) {
        res.status(500).json({ error: error }); // Handle errors with a 500 status code and send JSON response
    }
});

module.exports = router; // Export the router to be used in other parts of the application

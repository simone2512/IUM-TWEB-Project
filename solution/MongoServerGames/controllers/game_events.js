const Model = require('../models/game_events'); // Import the Mongoose model for game events

// Query game events based on game ID and event types (Goals or Cards)
function queryGameEvent(game) {
    return new Promise((resolve, reject) => {
        Model
            .find({
                game_id: game,
                type: { $in: ["Goals", "Cards"] }, // Filter by event types Goals or Cards
            })
            .select('game_id minute description club_id player_id type') // Select specific fields
            .then(results => {
                resolve(results); // Resolve with query results
            })
            .catch(error => {
                reject(error); // Reject with error if query fails
            });
    });
}

module.exports.queryGameEvent = queryGameEvent; // Export the function

const mongoose = require('mongoose');

const Game = new mongoose.Schema(
    {
        game_id: {type: Number, required: true, max: 100},
        competition_id: {type: String, required: true, max: 100},
        season: {type: Number, required: true, max: new Date().getFullYear()},
        round: {type: String, required: true, max: 100},
        date: {type: Date, required: true},
        home_club_id: {type: Number, required: true, max: 100},
        away_club_id: {type: Number, required: true, max: 100},
        home_club_goals: {type: Number, required: true, max: 100},
        away_club_goals: {type: Number, required: true, max: 100},
        home_club_position: {type: Number, required: true, max: 100},
        away_club_position: {type: Number, required: true, max: 100},
        home_club_manager_name: {type: String, required: true, max: 100},
        away_club_manager_name: {type: String, required: true, max: 100},
        stadium: {type: String, required: true, max: 100},
        attendance: {type: Number, required: true, max: 100},
        referee: {type: String, required: true, max: 100},
        url: {type: String, required: true, max: 100},
        home_club_formation: {type: String, required:false, max: 100},
        away_club_formation: {type: String, required:false, max: 100},
        home_club_name: {type: String, required: true, max: 100},
        away_club_name: {type: String, required: true, max: 100},
        aggregate: {type: String, required: true, max: 100},
        competition_type: {type: String, required: true, max: 100},
    }
)
const gameModel = mongoose.model('Game', Game);

// exporting the model
module.exports = gameModel;
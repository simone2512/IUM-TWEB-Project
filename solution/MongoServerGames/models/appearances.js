const mongoose = require("mongoose");


const Appearances = new mongoose.Schema({
    appearance_id: { type: String, required: true, max:100},
    game_id: { type: Number, required: true, max: 100 },
    player_id: { type: Number, required: true, max: 100 },
    player_club_id: { type: Number, required: true },
    player_current_club_id: { type: Number, required: true },
    date: { type: Date, required: true, max: new Date().getFullYear() },
    player_name: { type: String, required: true, maxlength: 100 },
    competition_id: { type: String, required: true, maxlength: 100 },
    yellow_cards: { type: Number, required: true, max: 100 },
    red_cards: { type: Number, required: true, max: 100 },
    goals: { type: Number, required: true, max: 100 },
    assists: { type: Number, required: true, max: 100 },
    minutes_played: { type: Number, required: true, max: 100 }
});


const AppearancesModel = mongoose.model('Appearances', Appearances);

module.exports = AppearancesModel;
const mongoose = require('mongoose');

// Definizione dello schema per la collezione GameEvent
const GameLineups = new mongoose.Schema({
    _id: { type: String, required: true },
    game_lineups_id: { type: String, required: true },
    game_id: { type: Number, required: true },
    club_id: { type: Number, required: true },
    type: { type: String, required: true },
    number: { type: Number, required: true },
    player_id: { type: Number, required: true },
    player_name: { type: String, required: true },
    team_captain: { type: Number, required: true },
    position: { type: String, required: true },
});

// Modello per la collezione GameEvent
const GameLineupsModel = mongoose.model('GameLineups', GameLineups);

// Esporta il modello per consentirne l'uso altrove nel tuo codice
module.exports = GameLineupsModel;

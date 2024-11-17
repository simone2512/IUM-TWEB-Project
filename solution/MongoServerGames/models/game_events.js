const mongoose = require('mongoose');

// Definizione dello schema per la collezione GameEvent
const GameEvent = new mongoose.Schema({
    game_event_id: { type: String, required: true },
    date: { type: Date, required: true },
    game_id: { type: Number, required: true },
    minute: { type: Number, required: true },
    type: { type: String, required: true },
    club_id: { type: Number, required: true },
    player_id: { type: Number, required: true },
    description: { type: String, required: true },
    player_assist_id: {type: Number, required: false},
});

// Modello per la collezione GameEvent
const GameEventModel = mongoose.model('GameEvent', GameEvent);

// Esporta il modello per consentirne l'uso altrove nel tuo codice
module.exports = GameEventModel;

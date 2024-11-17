const mongoose = require('mongoose');

const ClubGames = new mongoose.Schema({
    game_id : {type: String, required: true},
    club_id : {type: String, required: true},
    own_goals : {type: Number, required: true},
    own_position : {type: Number, require: true},
    own_manager_name : {type : String},
    opponent_id : {type: String, require: true},
    opponent_goals :  {type: Number, required: true},
    opponent_position : {type: Number, required: true},
    opponent_manager_name: {type : String},
    hosting : {type : String},
    is_win : {type : String},
});

const ClubGamesModel = mongoose.model('ClubGames', ClubGames);

module.exports = ClubGamesModel;

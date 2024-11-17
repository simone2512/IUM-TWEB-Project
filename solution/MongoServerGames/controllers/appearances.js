const Model = require('../models/appearances');

async function getPlayerStats(playerId) {
    try {
        // Definiamo la data di inizio per il filtro (1 agosto 2023)
        const startDate = new Date('2023-08-01');

        const playerStats = await Model.find({
            player_id: playerId,
            date: { $gte: startDate }
        })
            .select('yellow_cards red_cards goals minutes_played')
            .lean(); // Utilizziamo .lean() per ottenere un oggetto JavaScript semplice

        let total_yellow_cards = 0;
        let total_red_cards = 0;
        let total_goals = 0;
        let total_minutes_played = 0;

        if (playerStats.length > 0) {
            // Calcoliamo le somme dei valori
            total_yellow_cards = playerStats.reduce((acc, stat) => acc + (stat.yellow_cards || 0), 0);
            total_red_cards = playerStats.reduce((acc, stat) => acc + (stat.red_cards || 0), 0);
            total_goals = playerStats.reduce((acc, stat) => acc + (stat.goals || 0), 0);
            total_minutes_played = playerStats.reduce((acc, stat) => acc + (stat.minutes_played || 0), 0);
        }

        return {
            playerId: playerId,
            total_yellow_cards: total_yellow_cards,
            total_red_cards: total_red_cards,
            total_goals: total_goals,
            total_minutes_played: total_minutes_played
        };
    } catch (error) {
        console.error('Error querying player stats:', error);
        throw error; // Throw error if query fails
    }
}

module.exports.getPlayerStats = getPlayerStats;

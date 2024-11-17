const Model = require('../models/games'); // Import the Mongoose model for games

// Query games based on competition ID
function queryCompetition(data) {
    return new Promise((resolve, reject) => {
        Model
            .find()
            .where('competition_id').equals(data)
            .select('game_id Date season home_club_name away_club_name home_club_goals away_club_goals')
            .then(results => {
                resolve(results); // Resolve with query results
            })
            .catch(error => {
                reject(error); // Reject with error if query fails
            });
    });
}
module.exports.queryCompetition = queryCompetition; // Export the function

// Query leaderboard for a competition and season
async function queryLeaderboard(competition) {
    try {
        const [homeClubResults, awayClubResults] = await Promise.all([
            // Aggregate pipeline to calculate stats for home clubs
            Model.aggregate([
                {
                    $match: {
                        competition_id: competition,
                        season: 2023
                    }
                },
                {
                    $group: {
                        _id: "$home_club_name",
                        nome: { $first: "$home_club_name" },
                        punti: {
                            $sum: {
                                $switch: {
                                    branches: [
                                        { case: { $gt: ["$home_club_goals", "$away_club_goals"] }, then: 3 },
                                        { case: { $eq: ["$home_club_goals", "$away_club_goals"] }, then: 1 },
                                        { case: { $lt: ["$home_club_goals", "$away_club_goals"] }, then: 0 }
                                    ],
                                    default: 0
                                }
                            }
                        },
                        partiteGiocate: { $sum: 1 },
                        vittorie: { $sum: { $cond: [{ $gt: ["$home_club_goals", "$away_club_goals"] }, 1, 0] } },
                        pareggi: { $sum: { $cond: [{ $eq: ["$home_club_goals", "$away_club_goals"] }, 1, 0] } },
                        sconfitte: { $sum: { $cond: [{ $lt: ["$home_club_goals", "$away_club_goals"] }, 1, 0] } }
                    }
                }
            ]),
            // Aggregate pipeline to calculate stats for away clubs
            Model.aggregate([
                {
                    $match: {
                        competition_id: competition,
                        season: 2023
                    }
                },
                {
                    $group: {
                        _id: "$away_club_name",
                        nome: { $first: "$away_club_name" },
                        punti: {
                            $sum: {
                                $switch: {
                                    branches: [
                                        { case: { $lt: ["$home_club_goals", "$away_club_goals"] }, then: 3 },
                                        { case: { $eq: ["$home_club_goals", "$away_club_goals"] }, then: 1 },
                                        { case: { $gt: ["$home_club_goals", "$away_club_goals"] }, then: 0 }
                                    ],
                                    default: 0
                                }
                            }
                        },
                        partiteGiocate: { $sum: 1 },
                        vittorie: { $sum: { $cond: [{ $lt: ["$home_club_goals", "$away_club_goals"] }, 1, 0] } },
                        pareggi: { $sum: { $cond: [{ $eq: ["$home_club_goals", "$away_club_goals"] }, 1, 0] } },
                        sconfitte: { $sum: { $cond: [{ $gt: ["$home_club_goals", "$away_club_goals"] }, 1, 0] } }
                    }
                }
            ])
        ]);

        // Merge home and away club results into a single array
        const allResults = [...homeClubResults, ...awayClubResults];

        // Calculate leaderboard based on accumulated stats
        const leaderboard = allResults.reduce((acc, curr) => {
            const existingTeam = acc.find(team => team.nome === curr.nome);
            if (existingTeam) {
                existingTeam.punti += curr.punti;
                existingTeam.partiteGiocate += curr.partiteGiocate;
                existingTeam.vittorie += curr.vittorie;
                existingTeam.pareggi += curr.pareggi;
                existingTeam.sconfitte += curr.sconfitte;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []).sort((a, b) => b.punti - a.punti); // Sort by points in descending order

        return leaderboard; // Return the leaderboard array
    } catch (error) {
        console.error('Error during query execution:', error);
        throw error; // Throw error if query fails
    }
}
module.exports.queryLeaderboard = queryLeaderboard; // Export the function

// Query clubs participating in a specific competition and year
async function queryClubsCompetitionSelected(competitionId, year) {
    try {
        const clubs = await Model.aggregate([
            {
                $match: {
                    competition_id: competitionId,
                    season: year
                }
            },
            {
                $facet: {
                    homeClubs: [
                        {
                            $group: {
                                _id: "$home_club_id",
                                club_id: { $first: "$home_club_id" },
                                club_name: { $first: "$home_club_name" }
                            }
                        }
                    ],
                    awayClubs: [
                        {
                            $group: {
                                _id: "$away_club_id",
                                club_id: { $first: "$away_club_id" },
                                club_name: { $first: "$away_club_name" }
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    clubs: {
                        $setUnion: ["$homeClubs", "$awayClubs"]
                    }
                }
            },
            { $unwind: "$clubs" },
            { $replaceRoot: { newRoot: "$clubs" } },
            {
                $match: {
                    club_name: { $ne: undefined }
                }
            },
            {
                $project: {
                    _id: 0,
                    club_id: 1,
                    club_name: 1
                }
            }
        ]);

        return clubs; // Return the clubs array
    } catch (error) {
        throw error; // Throw error if query fails
    }
}
module.exports.queryClubsCompetitionSelected = queryClubsCompetitionSelected; // Export the function

// Query games of a specific competition and season
async function queryCompetitionGames(competition, season) {
    try {
        const competitionGames = await Model.aggregate([
            {
                $match: {
                    competition_id: competition,
                    season: season
                }
            },
            {
                $sort: { round: -1 } // Sort by round in descending order
            },
            {
                $match: { // Filter games with defined and non-empty club names
                    home_club_name: { $ne: null, $ne: "", $exists: true },
                    away_club_name: { $ne: null, $ne: "", $exists: true }
                }
            },
            {
                $project: { // Select only necessary fields
                    _id: 0,
                    game_id: 1,
                    round: 1,
                    home_club_id: 1,
                    away_club_id: 1,
                    home_club_name: 1,
                    away_club_name: 1,
                    home_club_goals: 1,
                    away_club_goals: 1,
                    date: 1,
                    competition_type: 1
                }
            }
        ]);
        return competitionGames; // Return the array of competition games
    } catch (error) {
        console.error("Error retrieving data for the last 5 matchdays:", error);
        throw error; // Throw error if query fails
    }
}
module.exports.queryCompetitionGames = queryCompetitionGames; // Export the function

// Query details of a specific game by game ID
async function queryGameDB(GameId) {
    try {
        const game = await Model.findOne({ game_id: GameId })
            .select({
                _id: 0,
                game_id: 1,
                round: 1,
                home_club_id: 1,
                away_club_id: 1,
                home_club_name: 1,
                away_club_name: 1,
                home_club_goals: 1,
                away_club_goals: 1,
                date : 1,
                referee: 1,
                stadium: 1,
                attendance: 1,
                competition_id: 1
            });

        if (!game) {
            throw new Error("Game not found"); // Throw error if game is not found
        }
        return game; // Return the game details
    } catch (error) {
        throw error; // Throw error if query fails
    }
}
module.exports.queryGameDB = queryGameDB; // Export the function

// Query roll of honour for a specific competition
async function queryRollOfHonour(competitionId) {
    try {
        const rollOfHonour = await Model.aggregate([
            {
                $match: {
                    competition_id: competitionId,
                    round: 'Final'
                }
            },
            {
                $project: {
                    _id: 0,
                    season: 1,
                    home_club_goals: 1,
                    away_club_goals: 1,
                    home_club_name: 1,
                    away_club_name: 1,
                    home_club_id: 1,
                    away_club_id: 1
                }
            },
            {
                $addFields: {
                    winner_id: {
                        $cond: {
                            if: { $gt: ['$home_club_goals', '$away_club_goals'] },
                            then: '$home_club_id',
                            else: '$away_club_id'
                        }
                    }
                }
            },
            {
                $addFields: {
                    winner: {
                        $cond: {
                            if: { $gt: ['$home_club_goals', '$away_club_goals'] },
                            then: '$home_club_name',
                            else: '$away_club_name'
                        }
                    }
                }
            },
            {
                $sort: { season: 1 } // Sort by season in ascending order
            },
            {
                $project: {
                    season: 1,
                    winner: 1,
                    winner_id: 1
                }
            }
        ]);

        return rollOfHonour; // Return the roll of honour array
    } catch (error) {
        console.error('Error querying roll of honour:', error);
        throw error; // Throw error if query fails
    }
}
module.exports.queryRollOfHonour = queryRollOfHonour; // Export the function

// Query seasons available for a specific competition
async function querySeasonsCompetition(competitionId) {
    try {
        const seasons = await Model.aggregate([
            {
                $match: { competition_id: competitionId }
            },
            {
                $group: { _id: "$season" }
            },
            {
                $sort: { _id: -1 } // Sort seasons in descending order
            },
            {
                $project: { _id: 0, season: "$_id" }
            }
        ]);

        return seasons.map(s => s.season); // Return array of seasons
    } catch (error) {
        console.error('Error fetching seasons:', error);
        throw error; // Throw error if query fails
    }
}
module.exports.querySeasonsCompetition = querySeasonsCompetition; // Export the function

// Query games of a specific season for a competition
async function queryGamesOfSeason(competition, season) {
    try {
        const games = await Model.aggregate([
            {
                $match: { competition_id: competition, season: season }
            }
        ]);

        return games; // Return array of games
    } catch (error) {
        console.error('Error querying games of season:', error);
        throw error; // Throw error if query fails
    }
}
module.exports.queryGamesOfSeason = queryGamesOfSeason; // Export the function

// Query rounds available for a specific season of a competition
async function queryRoundsOfSeason(competition, season) {
    try {
        const rounds = await Model.distinct("round", {
            competition_id: competition,
            season: season
        });
        rounds.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })); // Sort rounds numerically
        return rounds; // Return array of rounds
    } catch (error) {
        console.error('Error querying rounds of season:', error);
        throw error; // Throw error if query fails
    }
}
module.exports.queryRoundsOfSeason = queryRoundsOfSeason; // Export the function

// Query games of a specific round for a season of a competition
async function queryGamesRoundOfSeason(competition, season, round) {
    try {
        const games = await Model.aggregate([
            {
                $match: {
                    competition_id: competition,
                    season: season,
                    round: round
                }
            },
            {
                $match: {
                    home_club_name: { $ne: null, $ne: "", $exists: true },
                    away_club_name: { $ne: null, $ne: "", $exists: true }
                }
            }
        ]);

        return games; // Return array of games for the round
    } catch (error) {
        console.error('Error querying games of season round:', error);
        throw error; // Throw error if query fails
    }
}
module.exports.queryGamesRoundOfSeason = queryGamesRoundOfSeason; // Export the function

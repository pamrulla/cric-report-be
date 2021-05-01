const graphql = require('graphql');
const Player = require('./../models/player');
const Tournament = require('./../models/tournament');
const Match = require('./../models/match');
const Team = require('./../models/team');
const PlayerRating = require('./../models/playerrating');
const PlayerPerformance = require('./../models/playerperformance');
const Bowling = require('./../models/bowling');
const Batting = require('./../models/batting');

const PlayerType = new graphql.GraphQLObjectType({
    name: "Player",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        name: {type: graphql.GraphQLString},
        photo: {type: graphql.GraphQLString},
    })
});

const BattingType = new graphql.GraphQLObjectType({
    name: "Batting",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        teamId: {type: graphql.GraphQLID},
        playerId: {type: graphql.GraphQLID},
        player: {
            type: PlayerType,
            resolve(parent, args) {
                return Player.findById(parent.playerId)
            }
        },
        runs: {type: graphql.GraphQLInt},
        balls: {type: graphql.GraphQLInt},
        fours: {type: graphql.GraphQLInt},
        sixes: {type: graphql.GraphQLInt},
        sr: {type: graphql.GraphQLFloat},
        status: {type: graphql.GraphQLString},
    })
});

const BowlingType = new graphql.GraphQLObjectType({
    name: "Bowling",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        teamId: {type: graphql.GraphQLID},
        playerId: {type: graphql.GraphQLID},
        player: {
            type: PlayerType,
            resolve(parent, args) {
                return Player.findById(parent.playerId)
            }
        },
        overs: {type: graphql.GraphQLFloat},
        runs: {type: graphql.GraphQLInt},
        maindains: {type: graphql.GraphQLInt},
        wickets: {type: graphql.GraphQLInt},
        economy: {type: graphql.GraphQLFloat},
    })
});

const PlayerRatingType = new graphql.GraphQLObjectType({
    name: "PlayerRating",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        teamId: {type: graphql.GraphQLID},
        playerId: {type: graphql.GraphQLID},
        player: {
            type: PlayerType,
            resolve(parent, args) {
                return Player.findById(parent.playerId)
            }
        },
        rating: {type: graphql.GraphQLFloat},
        defaultRating: {type: graphql.GraphQLFloat},
    })
});

const PlayerPerformanceType = new graphql.GraphQLObjectType({
    name: "PlayerPerformance",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        teamId: {type: graphql.GraphQLID},
        playerId: {type: graphql.GraphQLID},
        player: {
            type: PlayerType,
            resolve(parent, args) {
                return Player.findById(parent.playerId)
            }
        },
        performance: {type: graphql.GraphQLList(graphql.GraphQLString)},
    })
});

const TeamType = new graphql.GraphQLObjectType({
    name: "Team",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        matchId: {type: graphql.GraphQLID},
        name: {type: graphql.GraphQLString},
        isWon: {type: graphql.GraphQLBoolean},
        playingIds: {type: graphql.GraphQLList(graphql.GraphQLString)},
        playing: {
            type: graphql.GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({id: { $in: [parent.playerIds],}})
            }
        },
        batting: {
            type: graphql.GraphQLList(BattingType),
            resolve(parent, args) {
                return Batting.find({teamId: parent.id})
            }
        },
        bowling: {
            type: graphql.GraphQLList(BowlingType),
            resolve(parent, args) {
                return Bowling.find({teamId: parent.id})
            }
        },
        rating: {
            type: graphql.GraphQLList(PlayerRatingType),
            resolve(parent, args) {
                return PlayerRating.find({teamId: parent.id})
            }
        },
        performance: {
            type: graphql.GraphQLList(PlayerPerformanceType),
            resolve(parent, args) {
                return PlayerPerformance.find({teamId: parent.id})
            }
        },
        teamRating: {type: graphql.GraphQLFloat},
        count: {type: graphql.GraphQLInt},
        extras: {type: graphql.GraphQLInt},
        total: {type: graphql.GraphQLInt},
        overs: {type: graphql.GraphQLFloat},
    })
});

const TournamentType = new graphql.GraphQLObjectType({
    name: "Tournament",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        year: {type: graphql.GraphQLInt},
        name: {type: graphql.GraphQLString},
        host: {type: graphql.GraphQLString},
    })
});

const MatchType = new graphql.GraphQLObjectType({
    name: "Match",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        tournamentId: {type: graphql.GraphQLID},
        tournament: {
            type: TournamentType,
            resolve(parent, args) {
                return Tournament.findById(parent.tournamentId)
            }
        },
        date: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString},
        result: {type: graphql.GraphQLString},
        teams: {
            type: graphql.GraphQLList(TeamType),
            resolve(parent, args) {
                return Team.find({matchId: parent.id})
            }
        },
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        match: {
            type: MatchType,
            args: {id: {type: graphql.GraphQLID}},
            resolve(parent, args) {
                return Match.findById(args.id);
            }
        },
        matches: {
            type: graphql.GraphQLList(MatchType),
            resolve(parent, args) {
                return Match.find({});
            }
        },
        players: {
            type: graphql.GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({});
            }
        }
    }
});

// Input Types
const BattingInput = new graphql.GraphQLInputObjectType({
    name: "BattingInput",
    fields: () => ({
        playerId: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        runs: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        balls: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        fours: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        sixes: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        sr: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
        status: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
    })
});

const BowlingInput = new graphql.GraphQLInputObjectType({
    name: "BowlingInput",
    fields: () => ({
        playerId: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        overs: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
        runs: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        maindains: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        wickets: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        economy: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
    })
});

const PlayerRatingInput = new graphql.GraphQLInputObjectType({
    name: "PlayerRatingInput",
    fields: () => ({
        playerId: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        defaultRating: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
    })
});

const PlayerPerformanceInput = new graphql.GraphQLInputObjectType({
    name: "PlayerPerformanceInput",
    fields: () => ({
        playerId: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        performance: {type: graphql.GraphQLNonNull(graphql.GraphQLList(graphql.GraphQLString))},
    })
});

const TeamInput = new graphql.GraphQLInputObjectType({
    name: "TeamInput",
    fields: () => ({
        name: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        isWon: {type: graphql.GraphQLNonNull(graphql.GraphQLBoolean)},
        playingIds: {type: graphql.GraphQLNonNull(graphql.GraphQLList(graphql.GraphQLString))},
        teamRating: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
        count: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        extras: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        total: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        overs: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
        batting: {type: graphql.GraphQLNonNull(graphql.GraphQLList(BattingInput))},
        bowling: {type: graphql.GraphQLNonNull(graphql.GraphQLList(BowlingInput))},
        rating: {type: graphql.GraphQLNonNull(graphql.GraphQLList(PlayerRatingInput))},
        performance: {type: graphql.GraphQLNonNull(graphql.GraphQLList(PlayerPerformanceInput))},
    })
});

const MatchInput = new graphql.GraphQLInputObjectType({
    name: "MatchInput",
    fields: () => ({
        tournamentId: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        date: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        name: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        result: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        teams: {type: graphql.GraphQLNonNull(graphql.GraphQLList(TeamInput))},
    })
});

const UploadMatchPayload = new graphql.GraphQLInputObjectType({
    name: "UploadMatchPayload",
    fields: () => ({
        match: {type: graphql.GraphQLNonNull(MatchInput)},
    })
});

const PlayerRatingPayload = new graphql.GraphQLInputObjectType({
    name: "PlayerRatingPayload",
    fields: () => ({
        playerId: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        rating: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
    })
});

const TeamRatingPayload = new graphql.GraphQLInputObjectType({
    name: "TeamRatingPayload",
    fields: () => ({
        id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        teamRating: {type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
        count: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        rating: {type: graphql.GraphQLNonNull(graphql.GraphQLList(PlayerRatingPayload))},
    })
});

const MatchRatingPayload = new graphql.GraphQLInputObjectType({
    name: "MatchRatingPayload",
    fields: () => ({
        id: {type: graphql.GraphQLNonNull(graphql.GraphQLID)},
        teams: {type: graphql.GraphQLNonNull(graphql.GraphQLList(TeamRatingPayload))},
    })
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateRating: {
            type: MatchType,
            args: {
                input: {type: graphql.GraphQLNonNull(MatchRatingPayload)}
            },
            resolve: async (parent, args) => {
                await args.input.teams.forEach(async t => {
                    await Team.updateOne({_id: t.id}, {teamRating: t.teamRating, count: t.count});
                    
                    await t.rating.forEach(async bw => {
                        await PlayerRating.updateOne({teamId: t.id, playerId: bw.playerId, rating: bw.rating});
                    });
                });
                
                return Match.findById(args.input.id);
            }
        },
        uploadMatch: {
            type: MatchType,
            args: {
                input: {type: graphql.GraphQLNonNull(UploadMatchPayload)}
            },
            resolve: async (parent, args) => {
                let match = new Match({
                    tournamentId: args.input.match.tournamentId,
                    date: args.input.match.date,
                    name: args.input.match.name,
                    result: args.input.match.result,
                });
                await match.save();
                await args.input.match.teams.forEach(async t => {
                    let team = new Team({
                        name: t.name,
                        isWon: t.isWon,
                        playingIds: t.playingIds,
                        teamRating: t.teamRating,
                        count: t.count,
                        extras: t.extras,
                        total: t.total,
                        overs: t.overs,
                        matchId: match.id,
                    });
                    await team.save();

                    await t.batting.forEach(async bt => {
                        let batting = new Batting({
                            teamId: team.id,
                            playerId: bt.playerId,
                            runs: bt.runs,
                            balls: bt.balls,
                            fours: bt.fours,
                            sixes: bt.sixes,
                            sr: bt.sr,
                            status: bt.status,
                        });
                        await batting.save();
                    });

                    await t.bowling.forEach(async bw => {
                        let bowling = new Bowling({
                            teamId: team.id,
                            playerId: bw.playerId,
                            overs: bw.overs,
                            runs: bw.runs,
                            maindains: bw.maindains,
                            wickets: bw.wickets,
                            economy: bw.economy,
                        });
                        await bowling.save();
                    });
                    
                    await t.rating.forEach(async bw => {
                        let rating = new PlayerRating({
                            teamId: team.id,
                            playerId: bw.playerId,
                            defaultRating: bw.defaultRating,
                            rating: 0,
                        });
                        await rating.save();
                    });
                    
                    await t.performance.forEach(async bw => {
                        let perf = new PlayerPerformance({
                            teamId: team.id,
                            playerId: bw.playerId,
                            performance: bw.performance,
                        });
                        await perf.save();
                    });
                });
                
                return match;
            }
        },
        addPlayer: {
            type: PlayerType,
            args: {
                name: {type: graphql.GraphQLString},
                photo: {type: graphql.GraphQLString},
            },
            resolve(parent, args) {
                let player = new Player({
                    name: args.name,
                    photo: args.photo,
                });
                return player.save();
            }
        },
        addTournament: {
            type: TournamentType,
            args: {
                name: {type: graphql.GraphQLString},
                host: {type: graphql.GraphQLString},
                year: {type: graphql.GraphQLInt},
            },
            resolve(parent, args) {
                let tournament = new Tournament({
                    name: args.name,
                    host: args.host,
                    year: args.year,
                });
                return tournament.save();
            }
        },
        addTeam: {
            type: TeamType,
            args: {
                matchId: {type: graphql.GraphQLID},
                name: {type: graphql.GraphQLString},
                isWon: {type: graphql.GraphQLBoolean},
                playingIds: {type: graphql.GraphQLList(graphql.GraphQLString)},
                teamRating: {type: graphql.GraphQLFloat},
                count: {type: graphql.GraphQLInt},
                extras: {type: graphql.GraphQLInt},
                total: {type: graphql.GraphQLInt},
                overs: {type: graphql.GraphQLFloat},
            },
            resolve(parent, args) {
                let obj = new Team({
                    matchId: args.matchId,
                    name: args.name,
                    isWon: args.isWon,
                    playingIds: args.playingIds,
                    teamRating: args.teamRating,
                    count: args.count,
                    extras: args.extras,
                    total: args.total,
                    overs: args.overs,
                });
                return obj.save();
            }
        },
        addMatch: {
            type: MatchType,
            args: {
                tournamentId: {type: graphql.GraphQLID},
                date: {type: graphql.GraphQLString},
                name: {type: graphql.GraphQLString},
                result: {type: graphql.GraphQLString},
            },
            resolve(parent, args) {
                let obj = new Match({
                    tournamentId: args.tournamentId,
                    date: args.date,
                    name: args.name,
                    result: args.result,
                });
                return obj.save();
            }
        },
        addPlayerRating: {
            type: TeamType,
            args: {
                teamId: {type: graphql.GraphQLID},
                playerId: {type: graphql.GraphQLID},
                rating: {type: graphql.GraphQLFloat},
                defaultRating: {type: graphql.GraphQLFloat},
            },
            resolve(parent, args) {
                let obj = new PlayerRating({
                    teamId: args.teamId,
                    playerId: args.playerId,
                    rating: args.rating,
                    defaultRating: args.defaultRating,
                });
                return obj.save();
            }
        },
        addPlayerPerformance: {
            type: TeamType,
            args: {
                teamId: {type: graphql.GraphQLID},
                playerId: {type: graphql.GraphQLID},
                performance: {type: graphql.GraphQLList(graphql.GraphQLString)},
            },
            resolve(parent, args) {
                let obj = new PlayerPerformance({
                    teamId: args.teamId,
                    playerId: args.playerId,
                    performance: args.performance,
                });
                return obj.save();
            }
        },
        addBowling: {
            type: TeamType,
            args: {
                teamId: {type: graphql.GraphQLID},
                playerId: {type: graphql.GraphQLID},
                overs: {type: graphql.GraphQLFloat},
                runs: {type: graphql.GraphQLInt},
                maindains: {type: graphql.GraphQLInt},
                wickets: {type: graphql.GraphQLInt},
                economy: {type: graphql.GraphQLFloat},
            },
            resolve(parent, args) {
                let obj = new Bowling({
                    teamId: args.teamId,
                    playerId: args.playerId,
                    overs: args.overs,
                    runs: args.runs,
                    maindains: args.maindains,
                    wickets: args.wickets,
                    economy: args.economy,
                });
                return obj.save();
            }
        },
        addBatting: {
            type: TeamType,
            args: {
                teamId: {type: graphql.GraphQLID},
                playerId: {type: graphql.GraphQLID},
                runs: {type: graphql.GraphQLInt},
                balls: {type: graphql.GraphQLInt},
                fours: {type: graphql.GraphQLInt},
                sixes: {type: graphql.GraphQLInt},
                sr: {type: graphql.GraphQLFloat},
                status: {type: graphql.GraphQLString},
            },
            resolve(parent, args) {
                let obj = new Batting({
                    teamId: args.teamId,
                    playerId: args.playerId,
                    runs: args.runs,
                    balls: args.balls,
                    fours: args.fours,
                    sixes: args.sixes,
                    sr: args.sr,
                    status: args.status,
                });
                return obj.save();
            }
        },
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})

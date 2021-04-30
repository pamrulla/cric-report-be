const graphql = require('graphql');
const _ = require('lodash');
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

const PlayingType = new graphql.GraphQLObjectType({
    name: "Playing",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        teamId: {type: graphql.GraphQLID},
        playerId: {type: graphql.GraphQLID},
        player: {
            type: PlayerType,
            resolve(parent, args) {
                return _.find(players, {id: parent.playerId})
            }
        },
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
                return _.find(players, {id: parent.playerId})
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
                return _.find(players, {id: parent.playerId})
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
                return _.find(players, {id: parent.playerId})
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
                return _.find(players, {id: parent.playerId})
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
            type: graphql.GraphQLList(PlayingType),
            resolve(parent, args) {
                return _.filter(playersList, {teamId: parent.id})
            }
        },
        batting: {
            type: graphql.GraphQLList(BattingType),
            resolve(parent, args) {
                return _.filter(battingData, {teamId: parent.id})
            }
        },
        bowling: {
            type: graphql.GraphQLList(BowlingType),
            resolve(parent, args) {
                return _.filter(bowlingData, {teamId: parent.id})
            }
        },
        rating: {
            type: graphql.GraphQLList(PlayerRatingType),
            resolve(parent, args) {
                return _.filter(bowlingData, {teamId: parent.id})
            }
        },
        performance: {
            type: graphql.GraphQLList(PlayerPerformanceType),
            resolve(parent, args) {
                return _.filter(bowlingData, {teamId: parent.id})
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
            type: graphql.GraphQLList(TournamentType),
            resolve(parent, args) {
                return _.find(teamsData, {id: parent.tournamentId})
            }
        },
        date: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString},
        result: {type: graphql.GraphQLString},
        teams: {
            type: graphql.GraphQLList(TeamType),
            resolve(parent, args) {
                return _.filter(teamsData, {matchId: parent.id})
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
                return _.find(matches, {id: args.id})
            }
        },
        matches: {
            type: graphql.GraphQLList(MatchType),
            resolve(parent, args) {
                return _.pullAll(matches)
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

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
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
        addMatch: {
            type: MatchType,
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
        addTeam: {
            type: TeamType,
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

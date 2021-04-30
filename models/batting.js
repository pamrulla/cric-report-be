const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const battingScheme = new Scheme({
    name: String,
    teamId: String,
    playerId: String,
    runs: Number,
    balls: Number,
    fours: Number,
    sixes: Number,
    sr: Number,
    status: String,
});

module.exports = mongoose.model('Batting', battingScheme);

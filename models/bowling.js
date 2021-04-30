const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const bowlingScheme = new Scheme({
    name: String,
    teamId: String,
    playerId: String,
    overs: Number,
    runs: Number,
    maindains: Number,
    wickets: Number,
    economy: Number,
});

module.exports = mongoose.model('Bowling', bowlingScheme);

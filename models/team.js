const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const teamScheme = new Scheme({
    name: String,
    matchId: String,
    isWon: Boolean,
    result: String,
    teamRating: Number,
    count: Number,
    extras: String,
    total: String,
    overs: Number,
    playingIds: [String],
});

module.exports = mongoose.model('Team', teamScheme);

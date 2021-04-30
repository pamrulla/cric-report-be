const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const playerRatingScheme = new Scheme({
    name: String,
    teamId: String,
    playerId: String,
    rating: Number,
    defaultRating: Number,
});

module.exports = mongoose.model('PlayerRating', playerRatingScheme);

const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const tournamentScheme = new Scheme({
    name: String,
    host: String,
    year: Number,
});

module.exports = mongoose.model('Tournament', tournamentScheme);

const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const matchScheme = new Scheme({
    name: String,
    tournamentId: String,
    date: String,
    result: String,
});

module.exports = mongoose.model('Match', matchScheme);

const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const playerPerformanceScheme = new Scheme({
    name: String,
    teamId: String,
    playerId: String,
    performance: [String],
});

module.exports = mongoose.model('PlayerPerformance', playerPerformanceScheme);

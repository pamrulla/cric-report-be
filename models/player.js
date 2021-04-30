const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const playerScheme = new Scheme({
    name: String,
    photo: String,
});

module.exports = mongoose.model('Player', playerScheme);

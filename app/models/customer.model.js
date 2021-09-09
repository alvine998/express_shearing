const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    nama: String,
    email: String,
    nohp: String,
    password: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', CustomerSchema);

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donationTitle: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    donationUrl: {type: String, required: true},
    owner: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Donation', donationSchema);

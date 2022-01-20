var mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
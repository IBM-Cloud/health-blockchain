var mongoose = require('mongoose');

var ChallengeSchema = mongoose.Schema({
    title: String,
    image: String,
    start: Date,
    end: Date,
    goal: Number,
    unit: String,
    activity: String
});

module.exports = mongoose.model('Challenge', ChallengeSchema);

var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
    "username": String,
    "password": String,
    "online": Boolean,
    "courses": [CourseSchema]
});

var LiveSchema = new Mongoose.Schema({
    "marks": [MarkSchema],
    "elapsed": Number,
    "isLive": Boolean,
    "timeString": String
});

var MarkSchema = new Mongoose.Schema({
    "start": String,
    "end": String,
    "comment": String
});

var CourseSchema = new Mongoose.Schema({
    "code": String,
    "name": String,
    "current": [LiveSchema],
    "archive": [MarkSchema]
});

exports.User = Mongoose.model('User', UserSchema);
exports.Current = Mongoose.model('Current', LiveSchema);
exports.Mark = Mongoose.model('Mark', MarkSchema);
exports.Course = Mongoose.model('Course', CourseSchema);

'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    number: String,
    favorites: [String]
});


userSchema.statics.list = function(sort, cb) {
    var query = User.find({});
    query.sort(sort);
    return query.exec(function(err, rows) {
        if (err) {
            return cb(err);
        }
        return cb(null, rows);
    });
};


var User = mongoose.model('User', userSchema);

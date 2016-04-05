'use strict';

var mongoose = require('mongoose');

var coffeeSchema = mongoose.Schema({
    name: String,
    address: String,
    number: String,
    email: String,
    rating: Number,
    views: Number
});


coffeeSchema.statics.list = function(sort, cb) {
    var query = Coffee.find({});
    query.sort(sort);
    return query.exec(function(err, rows) {
        if (err) {
            return cb(err);
        }
        return cb(null, rows);
    });
};


var Coffee = mongoose.model('Coffee', coffeeSchema);

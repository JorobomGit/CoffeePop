'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    number: String,
    favorites: [String]
});


userSchema.statics.list = function(req, cb) {
    var filtro = {};
    if(req.params.id!=undefined){
        filtro['id'] = req.params.id;
    }

    var query = User.find(filtro);
    var sort = req.query.sort || 'name';
    query.sort(sort);
    return query.exec(function(err, rows) {
        if (err) {
            return cb(err);
        }
        return cb(null, rows);
    });
};


var User = mongoose.model('User', userSchema);

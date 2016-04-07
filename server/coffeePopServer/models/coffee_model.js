'use strict';

var mongoose = require('mongoose');

var coffeeSchema = mongoose.Schema({
    name: String,
    address: String,
    number: String,
    email: String,
    description: String,
    rating: Number,
    views: Number,
    added: Date,
    img_url: String,
    user: String
});


coffeeSchema.statics.list = function(req, cb) {
    var filtro = {};
    if(req.query.id!=undefined){
        filtro['_id'] = req.query.id;
    }
    if(req.query.name!=undefined){
        filtro['name'] = req.query.name;
    }
    console.log("Filtro: ", filtro);
    var query = Coffee.find(filtro);
    var sort = req.query.sort || 'views';
    query.sort([[sort, 'descending']]);
    return query.exec(function(err, rows) {
        if (err) {
            return cb(err);
        }
        return cb(null, rows);
    });
};


var Coffee = mongoose.model('Coffee', coffeeSchema);

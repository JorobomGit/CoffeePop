'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');

var fn = function(req, res) {
    console.log(req);
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password) {
        //Escribe algo en la cabecera
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }

    //Realizamos un find para ver si concuerda
    var filter = {};
    filter['name'] = username;

    var hash = crypto.createHmac('sha256', password)
        .digest('hex');
    filter['password'] = password;

    var query = User.find(filter);

    query.exec(function(err, rows) {
        if (err) {
            console.log(err)
            return;
        }
        //Comprobamos que no hemos obtenido resultados
        if (rows.length == 0) {
            console.log('Login incorrecto');
            res.sendStatus(401);
            return;
        }
        console.log('Login Correcto');
        next();
    });
}


module.exports = fn;

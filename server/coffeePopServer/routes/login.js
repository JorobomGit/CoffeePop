var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var crypto = require('crypto');


/**
 * @api {post} /coffee Post Coffee: Insert coffee into db
 * @apiVersion 1.0.0
 * @apiName PostCoffees
 * @apiGroup Coffees
 *
 * @apiSuccess {String} id  Coffee id (unique).
 * @apiSuccess {String} name  Coffe name.
 * @apiSuccess {String} address   Coffee address.
 * @apiSuccess {String} number  Coffee phone number.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "true",
 *       "name": "Coffe & Tea",
 *       "address": "Street Cofof 132 28383",
 *       "number": "656666666"
 *     }
 *
 * 
 * @apiError (Error 500) DBError Error Database
 * 
 * @apiErrorExample Error-Response-DB:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "result": "false",
 *        "err": "DBError"
 *     }
 */

router.post('/', function(req, res) {


    console.log("Body: ", req.body);
    console.log("Nombre: ", req.body.name);
    console.log("Password: ", req.body.password);

    var username = req.body.name;
    var password = req.body.password;

    /*Con el nombre y contraseña respondemos al cliente si se ha logeado con exito*/
    //Realizamos un find para ver si concuerda
    var filter = {};
    filter['name'] = username;

    console.log(password);
    var hash = crypto.createHmac('sha256', password)
        .digest('hex');
        console.log(hash);
    filter['password'] = hash;

    var query = User.find(filter);

    query.exec(function(err, rows) {
        if (err) {
            console.log(err)
            return;
        }
        //Comprobamos que no hemos obtenido resultados
        if (rows.length == 0) {
            console.log('Login incorrecto');
            res.status(401);
            return;
        }
        console.log('Login Correcto');
        res.status(200).send(rows);
    });
    return;
});

module.exports = router;

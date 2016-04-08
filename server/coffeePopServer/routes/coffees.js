var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Coffee = mongoose.model('Coffee');

var crypto = require('crypto');

/**
 * @api {get} /coffees Get Coffees: Gets coffees from db.
 * @apiVersion 1.0.0
 * @apiName GetCoffees
 * @apiGroup Coffees
 *
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
 * @apiError (Error 500) DBError Database error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "result": "false",
 *        "err": "DBError"
 *     }
 */
router.get('/', function(req, res) {

    Coffee.list(req, function(err, rows) {
        if (err) {
            return res.json({ result: false, err: err });
        }
        //console.log(rows);
        res.json({ result: true, rows: rows });
    });
});


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

    var coffee = new Coffee(req.body);
    console.log(coffee);
    var date = new Date();
    coffee['added'] = date.getTime();
    coffee['views'] = 0;
    console.log(req);
    //coffee['user'] = date.getTime();
    //Lo guardamos en la BD
    coffee.save(function(err, newRow) {
        if (err) {
            return res.json({ result: false, err: err });
        }
        res.json({ result: true, row: newRow });
    });
});

//Coffee update
router.put('/', function(req, res) {
    console.log("REQQQQQ BODY ID")
    console.log(req.body._id);
    var coffee = new Coffee(req.body);
    Coffee.update({ _id: req.body._id }, { $set: coffee },
        function(err, data) {
            if (err) return res.json({ result: false, err: err });
            res.json({ result: true, row: data });
        });
});

module.exports = router;

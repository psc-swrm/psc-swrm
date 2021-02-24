const express = require('express');
const { Sensoren_Test} = require('../model/monitor');

let router = express.Router();

router.get('/stockmaterialdata', function(req, res) {
    let query = {};
    query.sensor_name = {$in: 'StockMaterial'};
    Sensoren_Test.find(query, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    }).sort({_id: -1}).limit(200);
});

router.get('/cuttingtooldata', function(req, res) {
    let query = {};
    query.sensor_name = {$in: 'CuttingTool'};
    Sensoren_Test.find(query, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    }).sort({_id: -1}).limit(200);
});
const collections = ['Sensoren_Test']
router.get('/sensordata', function(req, res) {
    let query = {};
    // query.sensor_name = {$in: 'CuttingTool'};
    let collectionname = req.query.name;
    if (collectionname === 'Sensoren_Test') {
            Sensoren_Test.find(query, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        }).sort({when: 1});
    }else{
        res.status(500).send(err);
    }
});


module.exports = router;

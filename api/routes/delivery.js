const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");

//TODO: Do przetesotwania
router.get('/', function(req, res, next)
{
    Delivery.find(function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    })
});

//TODO: Do przetestowania
router.post('/', function(req, res, next)
{
    var delivery = new Delivery
    ({
        name: req.query.name,
        description: req.query.description,
        price: req.query.price
    });

    delivery.save(function(err, result)
    {
        if(err) return res.sendStatus(500);
        return res.sendStatus(200);
    });
});

module.exports = router;

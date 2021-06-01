const express = require('express');
const router = express.Router();
const Payment = require('../models/product');

//Do przetestowania
router.get('/', function(req, res, next)
{
    Payment.find(function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    });
});

//Do przetestowania
router.post('/', function(req, res, next)
{
    var payment = new Payment
    ({
        description: req.query.description
    });

    payment.save(function(err, result)
    {
        if(err) return res.sendStatus(500);
        return res.sendStatus(200);
    })
});

module.exports = router;

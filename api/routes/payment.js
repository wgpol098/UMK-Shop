const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

//TODO: Zrobić put

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
//TODO: Do post trzeba mieć uprawnienia administratora
router.post('/', function(req, res, next)
{
    var payment = new Payment
    ({
        description: req.query.description
    });

    payment.save(function(err, result)
    {
        if(err) return res.sendStatus(500);
        return res.sendStatus(201);
    })
});

module.exports = router;

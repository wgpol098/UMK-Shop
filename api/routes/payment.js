const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//TODO: Przetestować metody
//TODO: 201 - 204
router.delete('/:id', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE)
    {
        if(mongoose.Types.ObjectId.isValid(req.params.id))
        {
            Payment.findByIdAndDelete(req.params.id, function(err, result)
            {
                if (err) return res.sendStatus(500);
                if (!result) return res.sendStatus(404);
                return res.sendStatus(204);
            });
        }
        else return res.sendStatus(404);
    }
    else res.sendStatus(403);
});

//TODO: Przetestowanie metody
//TODO: 201 - 204
router.put('/:id', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE)
    {
        if(mongoose.Types.ObjectId.isValid(req.params.id))
        {
            Payment.findById(req.params.id, function(err, result)
            {
                if (err) return res.sendStatus(500);
                if (!result) return res.sendStatus(404);
                result.description = req.query.description || result.description;
                result.save(function(err, result)
                {
                    if (err) return res.sendStatus(500);
                    return res.sendStatus(204);
                });
            });
        }
        else return res.sendStatus(404);
    }
    else return res.sendStatus(403);
});

//Metoda działa
router.get('/', function(req, res, next)
{
    Payment.find(function(err, result)
    {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        res.send(result);
    });
});

//Do przetestowania
//TODO: Metoda do przetestowania
//TODO: Dokumentacja - kod 400
router.post('/', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE)
    {
        if (!req.query.description) return res.sendStatus(400);
        var payment = new Payment
        ({
            description: req.query.description
        });
    
        payment.save(function(err, result)
        {
            if(err) return res.sendStatus(500);
            return res.sendStatus(201);
        });
    }
    else return res.sendStatus(403);
});

function authenticateToken(req, res, next) 
{
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) return res.sendStatus(401);
  console.log(authHeader);
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => 
  {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

router.put('/:id', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    const decoded = jwt.decode(authHeader);
    const role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE) 
    {
        if(mongoose.Types.ObjectId.isValid(req.params.id))
        {
            Delivery.findById(req.params.id, function(err, result)
            {
                if (err) return res.sendStatus(500);
                if (!result) return res.sendStatus(404);
                result.name = req.query.name || result.name;
                result.description = req.query.description || result.description;
                result.price = req.query.price || result.price;
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

router.delete('/:id', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    const decoded = jwt.decode(authHeader);
    const role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE) 
    {
        if(mongoose.Types.ObjectId.isValid(req.params.id))
        {
            Delivery.findByIdAndDelete(req.params.id, function(err, result)
            {
                if (err) return res.sendStatus(500);
                if (!result) return res.sendStatus(404);
                return res.sendStatus(204);
            });
        }
        else return res.sendStatus(400);
    }
    else return res.sendStatus(403);
});

router.get('/', function(req, res, next)
{
    Delivery.find(function(err, result)
    {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        res.send(result);
    })
});

router.post('/', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    const decoded = jwt.decode(authHeader);
    const role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE) 
    {
        if (!req.query.name || !req.query.description || !req.query.price) return res.sendStatus(400);
        var delivery = new Delivery
        ({
            name: req.query.name,
            description: req.query.description,
            price: req.query.price
        });
    
        delivery.save(function(err, result)
        {
            if(err) return res.sendStatus(500);
            return res.sendStatus(201);
        });
    }
    else return res.sendStatus(403);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (authHeader == undefined) return res.sendStatus(401);
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

module.exports = router;

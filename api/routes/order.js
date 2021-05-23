const dotenv = require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const User = require('../models/user');

//TODO: Do przemyślenia jaka powinna być dostępność tych metod
router.get('/',function(req, res, next)
{
    Order.find(function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    });
});

router.get('/:id', function(req, res, next)
{
    Order.findById(req.params.id, function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    });
});

router.put('/:id', function(req, res, next)
{
    res.send('putID');
});

//Metoda prawdopodobnie będzie używana przy składaniu zamówienia, więc musi być autoryzacja
router.post('/:id', function(req, res, next)
{
    //email jest unikalny więc w sumie można wyciągnąć z userów usera
    var decoded = jwt.decode(authHeader);
    
    console.log(decodd);

    var order = new Order
    ({
        
    });
    order.save(function(err, result)
    {
        if(err) return res.sendStatus(500);
        return res.sendStatus(200);
    });
    res.send('postID');
});
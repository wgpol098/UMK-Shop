const dotenv = require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

//Dodawanie nowych przedmiotów, ale tylko dla usera, który jest adminem
//Wymagana jest rola admina
router.post('/addproduct', authenticateToken, function (req, res, next)
{
    const authHeader = req.headers['authorization'];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;

    if (role == process.env.ADMIN_ROLE )
    {
        console.log('admin role');
        var product = new Product
        ({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            count: req.body.count
        });

        product.save(function(err, result)
        {
            if(err) return res.sendStatus(500);
            res.sendStatus(200);
        });
    }
    else return res.sendStatus(500);
});

// Pobieranie wszystkich produktów
router.get('/getallproducts', function (req, res, next)
{
    Product.find(function(err, result)
    {
        res.send(result);
    });
});

//Metoda do przetestowania
router.get('/addtocard', function(req, res, next)
{
    var productId = req.body.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product)
    {
        if (err) return res.redirect('/');
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

//Metoda do przetestowania
router.get('/removefromcard', function(req, res, next)
{
    var productId = req.body.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/');
});

function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    if (authHeader == null) return res.sendStatus(401);
    console.log(authHeader);
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) =>
    {
        if(err) return res.sendStatus(403);
        req.user = user
        next();
    });
}

module.exports = router;

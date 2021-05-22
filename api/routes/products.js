const dotenv = require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');


//Usuwanie jednego przedmiotu
router.delete('/:id', authenticateToken, function(req, res)
{
    const authHeader = req.headers['authorization'];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;

    if (role == process.env.ADMIN_ROLE )
    {
        Product.findById(req.params.id).remove(function(err, result)
        {
            if(err) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }
    else res.sendStatus(500);
});

//Pobieranie jedngo przedmiotu
router.get('/:id',function(req, res)
{
    Product.findById(req.params.id, function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    });
});

//Dodawanie nowych przedmiotów, ale tylko dla usera, który jest adminem
//Wymagana jest rola admina
//Wypada zrobić metodę, która na podstawie tokena bada rolę usera
router.post('/', authenticateToken, function (req, res, next)
{
    const authHeader = req.headers['authorization'];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;

    if (role == process.env.ADMIN_ROLE )
    {
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
    //Tutaj powinien znaleźć się inny bład, mówiący, że śmiertelnik nie ma prawa do tej metody
    else return res.sendStatus(500);
});

// Pobieranie wszystkich produktów
// Obsłgiwane jest również filtrowanie
router.get('/', function (req, res, next)
{
    var filter = req.query.filter;
    if(!filter)
    {
        Product.find(function(err, result)
        {
            res.send(result);
        });
    }
    else
    {
        Product.find(JSON.parse(filter), function(err, result)
        {
            res.send(result);
        });
    }
});

//Metoda do przetestowania
router.post('/addtocard', function(req, res, next)
{
    var productId = req.body.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product)
    {
        if (err) return res.sendStatus(500);
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        return sendStatus(200);
    });
});

//Metoda do przetestowania
router.post('/removefromcard', function(req, res, next)
{
    var productId = req.body.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.send(200);
});

function authenticateToken(req, res, next)
{
    // tylko do testów -- później należy to usunąć
    //-----------
    //next();
    //-----------
    const authHeader = req.headers['authorization'];
    if (authHeader == null) return res.sendStatus(401);
    console.log(authHeader);
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) =>
    {
        //Tutaj chyba powinien być error 401
        if(err) return res.sendStatus(403);
        req.user = user
        next();
    });
}

module.exports = router;

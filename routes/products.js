var express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/getallproducts', function (req, res, next)
{
    Product.find(function(err, result)
    {
        res.send(result);
    });
});

//Metoda do przetestowania - nie implementować we front-end
router.get('/add-to-card', function(req, res, next)
{
    var productId = req.body.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product)
    {
        if (err)
        {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

//Metoda do przetestowania - nie implementować we front-end
router.get('/remove', function(req, res, next)
{
    var productId = req.body.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/');
});

module.exports = router;

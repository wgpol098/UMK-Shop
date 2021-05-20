var express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
var router = express.Router();
var Product = require('../models/product');

router.get('/products', function (req, res, next)
{
    console.log('produkty1');
    Product.find(function(err, result)
    {
        res.send(result);
    });
});

module.exports = router;

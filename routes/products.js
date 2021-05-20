var express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
var router = express.Router();
var Product = require('../models/product');

router.get('/getallproducts', function (req, res, next)
{
    Product.find(function(err, result)
    {
        res.send(result);
    });
});

module.exports = router;

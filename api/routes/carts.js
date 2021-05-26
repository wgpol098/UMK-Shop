const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");


//Metoda do przetestowania - została zdebugowana i działa
router.post("/addtocard", function (req, res, next) 
{
  var productId = req.query.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) 
  {
    if (err) return res.sendStatus(500);
    cart.add(product, productId);
    req.session.cart = cart;
    return res.sendStatus(200);
  });
});

//Metoda do przetestowania
router.post("/removefromcard", function (req, res, next) 
{
  var productId = req.body.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.send(200);
});

module.exports = router;

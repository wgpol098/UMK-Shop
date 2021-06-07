const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");

//TODO: Dokumentacja - 400
router.post('/addtocart', function (req, res, next) {
  const productId = req.query.id;
  if (!productId) return res.sendStatus(400);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) return res.sendStatus(500);
    cart.add(product, productId);
    req.session.cart = cart;
    return res.sendStatus(201);
  });
});

//Metoda do przetestowania
//TODO: Dokumentacja - 400
router.post('/removefromcart', function (req, res, next) {
  var productId = req.query.id;
  if (!productId) return res.sendStatus(400);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  return res.sendStatus(201);
});

//Metoda do przetestowania
//TODO: Dokumentacja - 400
router.post('/removeonefromcart', function (req, res, next) {
  var productId = req.query.id;
  if (!productId) return res.sendStatus(400);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduce(productId);
  req.session.cart = cart;
  return res.sendStatus(201);
});

router.get("/", function (req, res, next) {
  if (req.session.cart) res.send(req.session.cart);
  else res.send({});
});

module.exports = router;

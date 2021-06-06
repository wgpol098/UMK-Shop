const dotenv = require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Order = require("../models/order");

// TODO: Do przetesotwania
// TODO: Zrobić dokumentację
router.get('/', authenticateToken, function (req, res, next) 
{
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  
  var page = parseInt(req.query.page, 10) || 0;
  var limit = parseInt(req.query.limit, 10) || 10;
  
  Order.countDocuments({user: decoded._id}, function(err, count)
  {
    if(err) return res.sendStatus(500);
    
    Order.find({user: decoded._id}).skip(page * limit).limit(limit).exec(function(err, result)
    {
      if (err) return res.sendStatus(500);
      res.send({data: result, total: count});
    });
  });
});

//TODO: Do przetesowania
router.get('/:id', function (req, res, next) {
  Order.findById(req.params.id, function (err, result) {
    if (err) return res.sendStatus(500);
    res.send(result);
  });
});

//Usuwanie zamówienia - tylko administrator
//TODO: Zrobić do tego dokumentację
router.delete('/:id', authenticateToken, function(req, res, next)
{
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  const role = decoded.role;

  if (role == process.env.ADMIN_ROLE) 
  {
    Order.findById(req.params.id).remove(function(err, result)
    {
      if (err) return res.sendStatus(500);
      return res.sendStatus(201);
    });
  }
  else return res.sendStatus(403);
});

//Update zamówień
//TODO: Ustalić co może admin a co zwykłu user
//TODO: Zrobić dokumentację
router.put("/:id", authenticateToken, function (req, res, next) 
{  
  Order.findById(req.params.id, function(err, result)
  {
    if (err) return res.sendStatus(500);

    result.date = req.body.date || result.date;
    result.user = req.body.user || result.user;
    result.cart = req.body.cart || result.cart;
    result.address = req.body.address || result.address;
    result.paymentId = req.body.payment_id || result.paymentId;
    result.deliveryId = req.body.delivery_id || result.deliveryId;

    result.save(function(err, result)
    {
      if (err) return res.sendStatus(500);
      return res.sendStatus(201);
    });
  });
});

//TODO: Do dokończenia
//TODO: Zmienić dokumentację
//TODO: Przetestować jak działa dla tych nieobowiązkowych parametrów
router.post("/", authenticateToken, function (req, res, next) 
{
  if(!req.session.cart) return res.sendStatus(500);
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var userID = decoded.id;

  var order = new Order({
    user: userID,
    date: Date.now(),
    cart: req.session.cart,
    status: req.query.status,
    address: req.query.address,
    paymentId: req.query.payment_id,
    deliveryId: req.query.delivery_id
  });
  order.save(function (err, result) {
    if (err) return res.sendStatus(500);
    req.session.cart = {};
    return res.sendStatus(201);
  });
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

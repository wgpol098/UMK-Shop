const dotenv = require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Order = require("../models/order");
const Address = require("../models/address");
const mongoose = require('mongoose');

router.get('/', authenticateToken, function (req, res, next) 
{
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  
  const all = req.query.all;
  const page = parseInt(req.query.page, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;
  
  if (!all || all == "F")
  {
    Order.countDocuments({user: decoded.id}, function(err, count)
    {
      if(err) return res.sendStatus(500);
      
      Order.find({user: decoded.id}).skip(page * limit).limit(limit).exec(function(err, result)
      {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        res.send({data: result, total: count});
      });
    });
  }
  else if (all == "T")
  {
    if (decoded.role == process.env.ADMIN_ROLE)
    {
      Order.countDocuments({}, function(err, count)
      {
        if(err) return res.sendStatus(500);
        
        Order.find().skip(page * limit).limit(limit).exec(function(err, result)
        {
          if (err) return res.sendStatus(500);
          if (!result) return res.sendStatus(404);
          res.send({data: result, total: count});
        });
      });
    }
    else return res.sendStatus(403);
  }
  else return res.sendStatus(500);
});

router.get('/:id', function (req, res, next) 
{
  if(mongoose.Types.ObjectId.isValid(req.params.id))
  {
    Order.findById(req.params.id, function (err, result) {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      res.send(result);
    });
  }
  else return res.sendStatus(404);
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
      Order.findByIdAndDelete(req.params.id, function(err, result)
      {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(204);
      });
    }
    else return res.sendStatus(404);
  }
  else return res.sendStatus(403);
});

router.put("/:id", authenticateToken, function (req, res, next) 
{  
  if(mongoose.Types.ObjectId.isValid(req.params.id))
  {
    Order.findById(req.params.id, function(err, result)
    {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      result.date = req.body.date || result.date;
      result.user = req.body.user || result.user;
      result.cart = req.body.cart || result.cart;
      result.address = req.body.address || result.address;
      result.paymentId = req.body.payment_id || result.paymentId;
      result.deliveryId = req.body.delivery_id || result.deliveryId;
      result.status = req.body.status || result.status;
      
  
      result.save(function(err, result)
      {
        if (err) return res.sendStatus(500);
        return res.sendStatus(204);
      });
    });
  }
  else return res.sendStatus(404);
});

router.post("/", authenticateToken, function (req, res, next) 
{
  if(!req.session.cart) return res.sendStatus(400);
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  const userID = decoded.id;

  if (!userID || !req.query.status || !req.query.payment_id || !req.query.delivery_id
    //Adres, który musi być podany
    || !req.query.zip || !req.query.country || !req.query.street || !req.query.city ) return res.sendStatus(400);

  const address = 
  {
    zip: req.query.zip,
    country: req.query.country,
    street: req.query.street,
    city: req.query.city
  };

  Address.findOne(address, function(err, result)
  {
    if(err) return res.sendStatus(500);
    if(!result)
    {
      var add = new Address(address);
      add.save(function(err, result)
      {
        if(err) return res.sendStatus(500)
        var order = new Order({
          user: userID,
          date: Date.now(),
          cart: req.session.cart,
          status: req.query.status,
          address: add._id,
          paymentId: req.query.payment_id,
          deliveryId: req.query.delivery_id
        });
        
        order.save(function (err, result) {
          if (err) return res.sendStatus(500);
          req.session.cart = {};
          return res.sendStatus(201);
        });
      });
    }
    else
    {
      var order = new Order({
        user: userID,
        date: Date.now(),
        cart: req.session.cart,
        status: req.query.status,
        address: result._id,
        paymentId: req.query.payment_id,
        deliveryId: req.query.delivery_id
      });
      order.save(function (err, result) {
        if (err) return res.sendStatus(500);
        req.session.cart = {};
        return res.sendStatus(201);
      });
    }
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

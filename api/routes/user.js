const dotenv = require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");

router.post("/", function (req, res, next) {
  var role = null;
  const authHeader = req.headers["authorization"];
  if(authHeader)
  {
    const decoded = jwt.decode(authHeader);
    role = decoded.role;
  }

  if(!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.birthdate || !req.body.phone_number ||
   !req.body.password) return res.sendStatus(400);

  var user = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    role: role == process.env.ADMIN_ROLE ? req.body.role : "user",
    birthdate: req.body.birthdate,
    phone_number: req.body.phone_number
  });

  if(req.body.shipping_address_id) user.shipping_address_id = req.body.shipping_address_id;
  if(req.body.invoice_address_id) user.invoice_address_id = req.body.invoice_address_id;
  user.password = user.encryptPassword(req.body.password);

  user.save(function (err, result) {
    if (err) return res.sendStatus(500);
    return res.sendStatus(201);
  });
});

router.put("/edit", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  const email = decoded.email;

  const edit = req.query.edit;

  const new_password = req.body.password
    ? bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null)
    : null;

  if (edit != "T") {
    User.findOne({ email: email }, (err, result) => {
      if (err) return res.sendStatus(500);
      result.role =
        decoded.role == process.env.ADMIN_ROLE
          ? req.body.role || result.role
          : result.role;
      result.email = req.body.email || result.email;
      result.first_name = req.body.first_name || result.first_name;
      result.last_name = req.body.last_name || result.last_name;
      result.birthdate = req.body.birthdate || result.birthdate;
      result.phone_number = req.body.phone_number || result.phone_number;
      result.password = new_password || result.password;
      result.shipping_address_id =
        req.body.shiping_address_id || result.shipping_address_id;
      result.invoice_address_id =
        req.body.invoice_address_id || result.invoice_address_id;

      result.save(function (err, result) {
        if (err) return res.sendStatus(500);
        return res.sendStatus(204);
      });
    });
  } else {
    User.findOne({ email: req.body.email }, (err, result) => {
      if (err) return res.sendStatus(500);
      result.role =
        decoded.role == process.env.ADMIN_ROLE
          ? req.body.role || result.role
          : result.role;
      result.email = req.body.email || result.email;
      result.first_name = req.body.first_name || result.first_name;
      result.last_name = req.body.last_name || result.last_name;
      result.birthdate = req.body.birthdate || result.birthdate;
      result.phone_number = req.body.phone_number || result.phone_number;
      result.password = new_password || result.password;
      result.shipping_address_id =
        req.body.shiping_address_id || result.shipping_address_id;
      result.invoice_address_id =
        req.body.invoice_address_id || result.invoice_address_id;

      result.save(function (err, result) {
        if (err) return res.sendStatus(500);
        return res.sendStatus(204);
      });
    });
  }
});

router.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) return res.sendStatus(400);

  User.findOne({ email: email }, function (err, result) {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    if (!result.validPassword(password)) return res.sendStatus(401);

    const userModel = {
      email: email,
      id: result._id,
      role: result.role,
    };

    const accessToken = jwt.sign(userModel, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "120m",
    });
    res.json({ accessToken: accessToken });
  });
});

router.get("/", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  const all = req.query.all;
  if (all == undefined || all == "F") {
    User.find({ email: decoded.email }, function (err, user) {
      if (err) return res.sendStatus(500);
      if (!user) return res.SendStatus(404);
      res.send(user);
    });
  } else if (all == "T") {
    if (decoded.role == process.env.ADMIN_ROLE) {
      User.find(function (err, result) {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        res.send(result);
      });
    } else return res.sendStatus(403);
  } else return res.sendStatus(500);
});

router.get("/:id", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  if (decoded.role == process.env.ADMIN_ROLE) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, function (err, result) {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        res.send(result);
      });
    } else return res.sendStatus(404);
  } else return res.sendStatus(403);
});

router.delete("/:id", authenticateToken, function (req, res) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id).remove(function (err, result) {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(204);
      });
    } else return res.sendStatus(404);
  } else res.sendStatus(403);
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

const dotenv = require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require('mongoose');

//Rejestraca nowego usera -- zwykłego śmiertelnika
router.post("/", function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);

  var user = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    role: decoded.role == process.env.ADMIN_ROLE ? req.body.role : "user",
    birthdate: req.body.birthdate,
    phone_number: req.body.phone_number,
    shipping_address_id: req.body.shipping_address_id,
    invoice_address_id: req.body.invoice_address_id,
  });
  user.password = user.encryptPassword(req.body.password);

  user.save(function (err, result) {
    if (err) return res.sendStatus(500);
    return res.sendStatus(201);
  });
});

//PUT user
//TODO: to test
//TODO: Dodanie możliwości, żeby administrator również mógł modyfikować te dane
//TODO: Tylko user z hasłem powinien posiadać dostęp do swoich danych, a nie na podstawie emaila
router.put("/edit", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var email = decoded.email;

  const edit = req.query.edit;

  let new_password = req.body.password
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

//TODO: Opisać w dokumentacji
router.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) return res.sendStatus(400);

  //Email w bazie danych jest unikalny
  User.findOne({ email: email }, function (err, result) {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    if (!result.validPassword(password)) return res.sendStatus(500);

    const userModel = {
      email: email,
      id: result._id,
      role: result.role,
    };

    //Np. tak można wygenerować tokeny
    //console.log(require('crypto').randomBytes(64).toString('hex'));
    const accessToken = jwt.sign(userModel, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "120m",
    });
    res.json({ accessToken: accessToken });
  });
});

//Metoda zwracająca informacje o userze albo userach jeśli jesteś administratorem
//Dostępna jedynie dla administarora
//TODO: 404
router.get("/", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  const all = req.query.all;
  if (all == undefined || all == "F") {
    User.find({ email: decoded.email }, function (err, user) {
      if (err) return res.sendStatus(500);
      if(!user) return res.SendStatus(404);
      res.send(user);
    });
  } else if (all == "T") {
    if (decoded.role == process.env.ADMIN_ROLE) {
      User.find(function (err, result) {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(404);
        res.send(result);
      });
    } else return res.sendStatus(403);
  } else return res.sendStatus(500);
});

//GET user/:id
//TODO: 404
router.get("/:id", authenticateToken, function (req, res, next) 
{
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  if (decoded.role == process.env.ADMIN_ROLE) 
  {
    if(mongoose.Types.ObjectId.isValid(req.params.id))
    {
      User.findById(req.params.id, function (err, result) {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        res.send(result);
      });
    }
    else return res.sendStatus(404);
  } 
  else return res.sendStatus(403);
});

//DELETE User
//TODO: to test
//TODO 201 - 204
router.delete("/:id", authenticateToken, function (req, res) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) 
  {
    if(mongoose.Types.ObjectId.isValid(req.params.id))
    {
      User.findById(req.params.id).remove(function (err, result) 
      {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(204);
      });
    }
    else return res.sendStatus(404);
  } 
  else res.sendStatus(403);
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

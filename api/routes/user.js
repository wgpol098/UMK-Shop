const dotenv = require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

//Rejestraca nowego usera -- zwykłego śmiertelnika
router.post("/", function (req, res, next) {
  var user = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    role: "user",
    birthdate: req.body.birthdate,
    phone_number: req.body.phone_number,
    shipping_address_id: req.body.shipping_address_id,
    invoice_address_id: req.body.invoice_address_id
  });
  user.password = user.encryptPassword(req.body.password);

  //email musi być unikalny -- jest to uwzględnione w modelu
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

  let new_password = req.body.password
    ? bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null)
    : null;

  console.log(new_password);

  User.findOne({ email: email }, (err, result) => {
    if (err) return res.sendStatus(500);
    result.email = req.body.email || result.email;
    result.first_name = req.body.first_name || result.first_name;
    result.last_name = req.body.last_name || result.last_name;
    result.birthdate = req.body.birthdate || result.birthdate;
    result.phone_number = req.body.phone_number || result.phone_number;
    result.password = new_password || result.password;
    result.shipping_address_id = req.body.shiping_address_id || result.shipping_address_id;
    result.invoice_address_id = req.body.invoice_address_id || result.invoice_address_id;

    result.save(function (err, result) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(201);
    });
  });
});

//TODO: Opisać w dokumentacji
router.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (email == undefined || password == undefined) return res.sendStatus(500);

  //Email w bazie danych jest unikalny
  User.findOne({ email: email }, function (err, result) 
  {
    if (err) return res.sendStatus(500);
    if (result == null) return res.sendStatus(500);
    if (!result.validPassword(password)) return res.sendStatus(500);

    const userModel = {
      email: email,
      id: result[0]._id,
      role: result[0].role,
    };

    console.log(userModel);
    //Np. tak można wygenerować tokeny
    //console.log(require('crypto').randomBytes(64).toString('hex'));
    const accessToken = jwt.sign(userModel, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20m",
    });
    res.json({ accessToken: accessToken });
  });
});


//Metoda zwracająca informacje o userze albo userach jeśli jesteś administratorem
//Dostępna jedynie dla administarora
router.get("/", authenticateToken, function(err, res, next)
{
  if (err) return res.sendStatus(500);
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);

  const all = req.query.all;
  if (all == undefined || all == 'F')
  {
    User.find({ email: decoded.email }, function (err, user) {
      if (err) return res.sendStatus(500);
      res.send(user);
    });
  }
  else if(all == 'T')
  {
    if(decoded.role == process.env.ADMIN_ROLE)
    {
      User.find(function(err, result)
      {
        if (err) return res.sendStatus(500);
        res.send(result);
      });
    }
    else return res.sendStatus(403);
  }
  else return res.sendStatus(500);
});

//Wylogowywanie -- ale ono coś słabo działa - wystarczy czyścić ciasteczka usera
//Albo dodawać token do blacklisty
//TODO: Opisać w dokumentacji
router.post("/logout", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  jwt.destroy(authHeader);
  console.log("dziala");
  return res.sendStatus(200);
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

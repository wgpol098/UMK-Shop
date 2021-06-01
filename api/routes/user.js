const dotenv = require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Rejestraca nowego usera -- zwykłego śmiertelnika
router.post("/register", function (req, res, next) {
  var user = new User({
    email: req.body.email,
    first_name: req.body.FirstName,
    last_name: req.body.LastName,
    role: "user",
    birthdate: req.body.birthdate,
    phone_number: req.body.phone_number
  });
  user.password = user.encryptPassword(req.body.password);

  //email musi być unikalny -- jest to uwzględnione w modelu
  user.save(function (err, result) {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

//TODO: Zwracanie odpowiednich kodów błedów
router.post("/login", function (req, res, next) 
{
  const email = req.body.email;
  const password = req.body.password;

  if(email == undefined || password == undefined) return res.sendStatus(500);

  //Email w bazie danych jest unikalny  
  User.find({ email: email}, function (err, result) 
  {
    if (err) return res.sendStatus(500);
    if (result == null) return res.sendStatus(500);
    if (result.length == 0) return res.sendStatus(500);
    if(!result[0].validPassword(password)) return res.sendStatus(500);

    const userModel = 
    {
      email: email,
      id: result._id,
      role: result.role,
    };
    //Np. tak można wygenerować tokeny
    //console.log(require('crypto').randomBytes(64).toString('hex'));
    const accessToken = jwt.sign(userModel, process.env.ACCESS_TOKEN_SECRET, 
    {
      expiresIn: "20m",
    });
    res.json({ accessToken: accessToken });
  });
});

//Zwraca informacje o userze
router.get("/profile", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var email = decoded.email;

  //TODO: Tutaj nie powinnien być zwracany ciąg z hasłem
  User.find({ email: email }, function (err, user) {
    if (err) return res.sendStatus(500);
    res.send(user);
  });
});

//Wylogowywanie -- ale ono coś słabo działa - wystarczy czyścić ciasteczka usera
//Albo dodawać token do blacklisty
router.post("/logout", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  jwt.destroy(authHeader);
  console.log("dziala");
  return res.sendStatus(200);
});

function authenticateToken(req, res, next) 
{
  const authHeader = req.headers["authorization"];
  if (authHeader == null) return res.sendStatus(401);
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = router;

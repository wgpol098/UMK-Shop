const dotenv = require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Rejestraca nowego usera -- zwykłego śmiertelnika
// nie admina
router.post("/register", function (req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    role: "user",
  });

  //Trzeba sprwadzać czy user nie istnieje już w bazie danych
  //Nie można dodawać emaila, który istnieje w bazie danych

  user.save(function (err, result) {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

//Na razie login zwraca zawsze token, niezależnie od email i password
router.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email: email, password: password }, function (err, user) {
    if (err) return res.sendStatus(500);

    if (user == null) console.log("error");

    // trzeba wyciągać id danego usera
    // Trzeba kontrolować czy zwrócony został jeden wynik
    console.log(user[0]._id);

    //Do tokenu możliwe jest wrzucenie wielu informacji
    const userModel = {
      email: email,
      id: user[0]._id,
      role: "admin"
    };
    //Np. tak można wygenerować tokeny
    //console.log(require('crypto').randomBytes(64).toString('hex'));
    const accessToken = jwt.sign(userModel, process.env.ACCESS_TOKEN_SECRET, {
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) return res.sendStatus(401);
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

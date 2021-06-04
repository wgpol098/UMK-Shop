const dotenv = require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");
const User = require("../models/user");

//TODO: Do przemyślenia jaka powinna być dostępność tych metod
//TODO: User powinien mieć dostęp tylko do swoich zamówień
// Trzeba tutaj zrobić, żeby tylko zalogowana osoba miała dostęp do tej metody
// TODO: Do przetesotwania
router.get("/", function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var userID = decoded.id;
  console.log(userID);

  Order.find({ user: userID }, function (err, result) {
    if (err) return res.sendStatus(500);
    res.send(result);
  });
});

//TODO: Do przetesowania
router.get("/:id", function (req, res, next) {
  Order.findById(req.params.id, function (err, result) {
    if (err) return res.sendStatus(500);
    res.send(result);
  });
});
//TODO: Powinien modyfikować, a jak nie ma to dodawać
router.put("/:id", function (req, res, next) {
  res.send("putID");
});

//TODO: Metoda prawdopodobnie będzie używana przy składaniu zamówienia, więc musi być autoryzacja
//TODO: Do dokończenia
//TODO: Metodę może wywołać tylko zalogowany user
router.post("/", function (req, res, next) {
  //email jest unikalny więc w sumie można wyciągnąć z userów usera
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var userID = decoded.id;
  console.log(userID);

  //TODO: Pobieranie nieobowiązkowych argumentów
  //pobieranie PaymentId

  var order = new Order({
    user: userID,
    date: Date.now(),
    cart: req.session.cart,
    status: req.query.status,
  });
  order.save(function (err, result) {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

module.exports = router;

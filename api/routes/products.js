const dotenv = require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Product = require("../models/product");

//Usuwanie jednego przedmiotu
router.delete("/:id", authenticateToken, function (req, res) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) {
    Product.findById(req.params.id).remove(function (err, result) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(201);
    });
  } else res.sendStatus(403);
});

//Pobieranie jedngo przedmiotu
router.get("/:id", function (req, res) {
  Product.findById(req.params.id, function (err, result) {
    if (err) return res.sendStatus(500);
    res.send(result);
  });
});

//Edytowanie istniejących przedmiotów
router.put("/:id", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) {
    Product.findById(req.params.id, function (err, result) {
      if (err) return res.sendStatus(500);
      result.title = req.body.title || result.title;
      result.description = req.body.description || result.description;
      result.price = req.body.price || result.price;
      result.count = req.body.count || result.count;

      result.save(function (err, result) {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200);
      });
    });
  } else return res.sendStatus(500);
});

//Dodawanie nowych przedmiotów, ale tylko dla usera, który jest adminem
//Wymagana jest rola admina
//Wypada zrobić metodę, która na podstawie tokena bada rolę usera
//TODO: Przetestować co się stanie jak nie podamy wszystkich wymaganych danych
router.post("/", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) {
    var product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      count: req.body.count,
    });

    product.save(function (err, result) {
      if (err) return res.sendStatus(500);
      res.sendStatus(200);
    });
  }
  //Tutaj powinien znaleźć się inny bład, mówiący, że śmiertelnik nie ma prawa do tej metody
  else return res.sendStatus(500);
});

// Pobieranie wszystkich produktów
// Obsłgiwane jest również filtrowanie
// Obsługiwane jest również stronicowanie
// TODO: Zrobić na końcu zwracanie ile jest wszystkich produktów
router.get("/", function (req, res, next) {
  var filter = req.query.filter;
  var page = parseInt(req.query.page, 10) || 0;
  var limit = parseInt(req.query.limit, 10) || 10;

  if (!filter) {
    Product.find()
      .skip(page * limit)
      .limit(limit)
      .exec(function (err, result) {
        console.log("dziala");
        if (err) return res.sendStatus(500);
        res.send(result);
      });
  } else {
    Product.find(JSON.parse(filter))
      .skip(page * limit)
      .limit(limit)
      .exec(function (err, result) {
        if (err) return res.sendStatus(500);
        res.send(result);
      });
  }
});

function authenticateToken(req, res, next) {
  // tylko do testów -- później należy to usunąć
  //-----------
  //next();
  //-----------
  const authHeader = req.headers["authorization"];
  if (authHeader == null) return res.sendStatus(401);
  console.log(authHeader);
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //Tutaj chyba powinien być error 401
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

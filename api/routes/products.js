const dotenv = require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");
const { json } = require("express");

//Usuwanie jednego przedmiotu
router.delete("/:id", authenticateToken, function (req, res) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) {
    Product.findById(req.params.id).remove(function (err, result) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(200);
    });
  } else res.sendStatus(500);
});

//Pobieranie jedngo przedmiotu
router.get("/:id", function (req, res) {
  Product.findById(req.params.id, function (err, result) {
    if (err) return res.sendStatus(500);
    res.send(result);
  });
});

//TODO: Edytowanie istniejących przedmiotów
router.put("/:id", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) {
    res.send("updating");
    Product.findOneAndUpdate();
  }
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
router.get("/", function (req, res, next) {
  var range = req.query.range
    ? JSON.parse(req.query.range) || [0, 10]
    : [0, 10];

  var filter = req.query.filter;

  let total = 0;

  var query = Product.find().skip(5).limit(10);//TODO skip/limit doesnt work
  console.log(query);
  query.exec(function (err, result) {
    console.log(result.length);
  });

  if (!filter) {
    Product.find().exec(function (err, result) {
      if (err) return res.sendStatus(500);
      total = result && result.length;
    });
    Product.find()
      .skip(range[0])
      .limit(range[1])
      .exec(function (err, result) {
        if (err) return res.sendStatus(500);
        res.send({ data: result, total: total });
      });
  } else {
    Product.find().exec(function (err, result) {
      if (err) return res.sendStatus(500);
      total = result && result.length;
    });
    Product.find()
      .skip(range[0])
      .limit(range[1])
      .exec(function (err, result) {
        if (err) return res.sendStatus(500);
        res.send({ data: result, total: total });
      });
  }
});

//Metoda do przetestowania
router.post("/addtocard", function (req, res, next) {
  var productId = req.body.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) return res.sendStatus(500);
    cart.add(product, product.id);
    req.session.cart = cart;
    return sendStatus(200);
  });
});

//Metoda do przetestowania
router.post("/removefromcard", function (req, res, next) {
  var productId = req.body.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.send(200);
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

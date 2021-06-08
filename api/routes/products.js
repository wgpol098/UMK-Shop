const dotenv = require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Product = require("../models/product");

//Usuwanie jednego przedmiotu
//TODO: 201 - 204
router.delete("/:id", authenticateToken, function (req, res) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (role == process.env.ADMIN_ROLE) {
    Product.findById(req.params.id).remove(function (err, result) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(204);
    });
  } else res.sendStatus(403);
});

//Edytowanie istniejących przedmiotów
//TODO: 201 - 204
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
      result.imagePath = req.body.imagePath || result;

      result.save(function (err, result) {
        if (err) return res.sendStatus(500);
        return res.sendStatus(204);
      });
    });
  } else return res.sendStatus(403);
});

//Dodawanie nowych przedmiotów
//Wymagana jest rola admina
//TODO: Dokuemntacja - kod 400
router.post("/", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;

  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.price ||
    !req.body.count
  )
    return res.sendStatus(400);
  if (role == process.env.ADMIN_ROLE) {
    var product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      count: req.body.count,
      imagePath: req.body.imagePath ? req.body.imagePath : null,
    });

    product.save(function (err, result) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(201);
    });
  } else return res.sendStatus(403);
});

//Pobieranie jedngo przedmiotu
router.get("/:id", function (req, res) {
  Product.findById(req.params.id, function (err, result) {
    if (err) return res.sendStatus(500);
    res.send(result);
  });
});

//Pobieranie listy produktów
router.get("/", function (req, res, next) {
  var filter = req.query.filter;
  var page = parseInt(req.query.page, 10) || 0;
  var limit = parseInt(req.query.limit, 10) || 10;

  Product.countDocuments({}, function (err, count) {
    if (err) return res.sendStatus(500);
    if (!filter) {
      Product.find()
        .lean()
        .skip(page * limit)
        .limit(limit)
        .exec(function (err, result) {
          if (err) return res.sendStatus(500);
          return res.send({ data: result, total: count });
        });
    } else {
      Product.find(JSON.parse(filter))
        .skip(page * limit)
        .limit(limit)
        .exec(function (err, result) {
          if (err) return res.sendStatus(500);
          result.total = count;
          res.send({ data: result, total: count });
        });
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) return res.sendStatus(401);
  console.log(authHeader);
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

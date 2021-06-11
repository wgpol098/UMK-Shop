const express = require("express");
const router = express.Router();
const Address = require("../models/address");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Metoda działa
router.delete("/:id", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  var decoded = jwt.decode(authHeader);
  var role = decoded.role;
  if (role == process.env.ADMIN_ROLE) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      Address.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) return res.sendStatus(500);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(204);
      });
    } else return res.sendStatus(404);
  } else return res.sendStatus(403);
});

//Metoda działa
// TODO: Zmienić w dokumentacji - kod błędu 201 na 204
// TODO: Najpierw szuka adresu -- jeśli istnieje to nic nie robi
// TOOD: Jeśli adres nie istnieje to go dodaje
router.put("/:id", function (req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Address.findById(req.params.id, function (err, result) {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      if (req.query.city) result.city = req.query.city;
      if (req.query.street) result.street = req.query.street;
      if (req.query.zip) result.zip = req.query.zip;
      if (req.query.country) result.country = req.query.country;

      result.save(function (err, result) {
        if (err) return res.sendStatus(500);
        return res.status(200).send(result);
      });
    });
  } else return res.status(200).send(result);
});

//Dodawanie adresu - do przetestowania
//TODO: Najpierw powinno sprwadzać czy dany adres istnieje
//Jeśli istnieje to nie ma sensu dublować adresów
//TODO: Dokumentacja - kod 400
//Adres jest dodawany tylko jeśli istnieje
//Bez sensu byłoby ciągłe dublowanie adresów
router.post("/", function (req, res, next) {
  if (
    !req.query.city ||
    !req.query.street ||
    !req.query.zip ||
    !req.query.country
  )
    return res.sendStatus(400);

  const json = {
    city: req.query.city,
    street: req.query.street,
    zip: req.query.zip,
    country: req.query.country,
  };

  Address.findOne(json, function (err, result) {
    var address = new Address(json);
    if (err) return res.sendStatus(500);
    if (!result) {
      address.save(function (err, result) {
        if (err) return res.sendStatus(500);
        return res.status(201).send(result);
      });
    } else {
      return res.status(201).send(result);
    }
  });
});

//Pobieranie wszystkich adresów - do przetesowania
//TODO: Filtrowanie m.in po user id
//TODO: 404
router.get("/", function (req, res, next) {
  Address.find(function (err, result) {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    res.send(result);
  });
});

//Pobieranie adresu o danym id - do przetesowania
//TODO: 404
router.get("/:id", function (req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Address.findById(req.params.id, function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (!result) return res.sendStatus(404);
      res.send(result);
    });
  } else res.sendStatus(404);
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

const express = require("express");
const router = express.Router();
const Address = require("../models/address");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.delete("/:id", authenticateToken, function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const decoded = jwt.decode(authHeader);
  const role = decoded.role;
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
  } else return res.status(200);
});

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

router.get("/", function (req, res, next) {
  Address.find(function (err, result) {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    res.send(result);
  });
});

router.get("/:id", function (req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Address.findById(req.params.id, function (err, result) {
      if (err) {
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
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

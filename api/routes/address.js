const express = require("express");
const router = express.Router();
const Address = require("../models/address");

//TODO: Przetestowanie metody
router.delete('/:id', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;
    if (role == process.env.ADMIN_ROLE) 
    {
        if(req.params.id == undefined) return res.sendStatus(400);
        Address.findById(req.params.id).remove(function(err, result)
        {
            if (err) return res.sendStatus(500);
            return res.sendStatus(201);
        });
    }
    else return res.sendStatus(403);
});

//TODO: Przetestowanie metody
router.put('/:id', function(req, res, next)
{
    Address.findById(req.params.id, function(err, result)
    {
        result.city = req.query.city || result.city;
        result.street = req.query.street || result.street;
        result.zip = req.query.zip || result.zip;
        result.country = req.query.country || result.country;

        result.save(function(err, result)
        {
            if (err) return res.sendStatus(500);
            return res.sendStatus(201);
        });
    });
});

//Dodawanie adresu - do przetestowania
//TODO: Najpierw powinno sprwadzać czy dany adres istnieje
//Jeśli istnieje to nie ma sensu dublować adresów
//TODO: Dokumentacja - kod 400
router.post('/', function(req, res, next)
{
    if (req.query.city == undefined || req.query.street == undefined || req.query.zip == undefined || req.query.country == undefined) return res.sendStatus(400);
    var address = new Address
    ({
        city: req.query.city,
        street: req.query.street,
        zip: req.query.zip,
        country: req.query.country
    });

    address.save(function(err, result)
    {
        if(err) return res.sendStatus(500);
        return res.sendStatus(201);
    });
});

//Pobieranie wszystkich adresów - do przetesowania
//TODO: Filtrowanie m.in po user id
router.get('/', function(req, res, next)
{
    Address.find(function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    });
});

//Pobieranie adresu o danym id - do przetesowania
router.get('/:id', function(req, res, next)
{
    Address.findById(req.params.id, function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    });
});

function authenticateToken(req, res, next) 
{
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) return res.sendStatus(401);
  console.log(authHeader);
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => 
  {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

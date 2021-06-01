const express = require("express");
const router = express.Router();
const Address = require("../models/address");

//Dodawanie adresu - do przetestowania
//TODO: Najpierw powinno sprwadzać czy dany adres istnieje
//Jeśli istnieje to nie ma sensu dublować adresów
router.post('/', function(req, res, next)
{
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
        return res.sendStatus(200);
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

module.exports = router;

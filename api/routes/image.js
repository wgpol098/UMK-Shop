const express = require("express");
const router = express.Router();
const fs = require('fs');

//Metoda odpowiedzialna za dodawanie zdjęcia
//TODO: Do przetestowania
//TODO: Zrobić dokumentację
router.post('/', function(req, res, next)
{
    console.log(req.files.image);
    
    const path = req.files.image.name;

    req.files.image.mv("./img/" + path, function(err)
    {
        if (err) return res.sendStatus(500);
        res.send(path);
    })
});

module.exports = router;

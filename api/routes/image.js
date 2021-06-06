const express = require("express");
const router = express.Router();
const fs = require('fs');

//Metoda odpowiedzialna za dodawanie zdjęcia
//TODO: Do przetestowania
//TODO: Zrobić dokumentację
router.post('/', function(req, res, next)
{
    console.log(req.files.image);
    
    const path = '../img/' + req.files.image.name;

    fs.writeFile(path, req.files.image,function(err)
    {
        if (err) return res.sendStatus(500);
        res.send({filepath: path});
    });
});

module.exports = router;

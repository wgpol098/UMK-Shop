const express = require("express");
const router = express.Router();

//Metoda odpowiedzialna za dodawanie zdjęcia
//TODO: Do przetestowania
//TODO: Zrobić dokumentację
router.post('/', function(req, res, next)
{
    const path = "./img/" + req.files.image.name;

    req.files.image.mv(path, function(err)
    {
        if (err) return res.sendStatus(500);
        res.send({filepaht: path});
    })
});

module.exports = router;

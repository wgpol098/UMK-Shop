var dotenv = require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user')

//Na razie login zwraca zawsze token, niezależnie od email i password
router.get('/login', function(req, res, next)
{
    const email = req.body.email;
    const password = req.body.password;

    User.find({ email: email }, function(err, user)
    {
        if(err) return res.sendStatus(500);

        if(user == null)
        {
            console.log("error");
        }
        console.log(user);

        //Do tokenu możliwe jest wrzucenie wielu informacji
        const userModel = { name: email, role: 'admin'};
        //Np. tak można wygenerować tokeny
        //console.log(require('crypto').randomBytes(64).toString('hex'));
        const accessToken = jwt.sign(userModel, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m' });
        res.json({ accessToken: accessToken });
    });
});

//będzie zwracało informacje o userze
router.get('/profile', authenticateToken, function (req, res, next)
{
    res.send('answer');
});

function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    var TokenArray = jwt.decode(authHeader, { complete: true });
    console.log(TokenArray);
    if (authHeader == null) return res.sendStatus(401);
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) =>
    {
        if(err) return res.sendStatus(403);
        req.user = user
        next();
    });
}

module.exports = router;

const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

//TODO: Dodać do dokuemntacji
//TODO: Przetestować metody
router.delete('/:id', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE)
    {
        Payment.findById(req.params.id).remove(function(err, result)
        {
            if (err) return res.sendStatus(500);
            return res.sendStatus(201);
        });
    }
    else res.sendStatus(403);
});

//TODO: Dodać do dokumentacji
//TODO: Przetestowanie metody
router.put('/:id', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE)
    {
        Payment.findById(req.params.id, function(err, result)
        {
            if (err) return res.sendStatus(500);
            
            result.description = req.query.description || result.description;
            result.save(function(err, result)
            {
                if (err) return res.sendStatus(500);
                return res.sendStatus(201);
            });
        });
    }
    else return res.sendStatus(403);
});

//Do przetestowania
router.get('/', function(req, res, next)
{
    Payment.find(function(err, result)
    {
        if(err) return res.sendStatus(500);
        res.send(result);
    });
});

//Do przetestowania
//TODO: Do post trzeba mieć uprawnienia administratora
//TODO: Dokumentacja do mziany
//TODO: Metoda do przetestowania
router.post('/', authenticateToken, function(req, res, next)
{
    const authHeader = req.headers["authorization"];
    var decoded = jwt.decode(authHeader);
    var role = decoded.role;
  
    if (role == process.env.ADMIN_ROLE)
    {
        var payment = new Payment
        ({
            description: req.query.description
        });
    
        payment.save(function(err, result)
        {
            if(err) return res.sendStatus(500);
            return res.sendStatus(201);
        });
    }
    else return res.sendStatus(403);
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

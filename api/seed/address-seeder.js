const Address = require('../models/address');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/umkshop', { useUnifiedTopology: true, useNewUrlParser: true });


//TODO: Dodanie seed adresów
var addresses =
[
    new Address
    ({
        country: "Poland",
        city: "Toruń",
        zip: "87-100",
        street: "Czerwona Droga 1/6"
    }),
    new Address
    ({
        country: "Poland",
        city: "Toruń",
        zip: "87-100",
        street: "Świętego Józefa 53-59"
    }),
    new Address
    ({
        country: "Poland",
        city: "Toruń",
        zip: "87-100",
        street: "Kociewska 30A"
    }),
    new Address
    ({
        country: "Poland",
        city: "Toruń",
        zip: "87-100",
        street: "Marii Skłodowskiej-Curie 73"
    })
];

//Zapisywanie adresów
var done = 0;
for(var i = 0; i < products.length; i++)
{
    addresses[i].save(function(err, result)
    {
        done++;
        if(done === products.lenght)
        {
            exit();
        }
    });
}


function exit()
{
    mongoose.disconnect();
};
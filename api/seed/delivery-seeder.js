const Delivery = require('../models/delivery');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/umkshop', { useUnifiedTopology: true, useNewUrlParser: true });


var deliveries = 
[
    new Delivery
    ({
        name: "Poczta Polska",
        description: "Paczka zostanie dostarczona przez listonosza",
        price: 10
    }),
    new Delivery
    ({
        name: "Odbiór osobisty",
        description: "Odbiór osobisty w rektoracie UMK",
        price: 0
    })
];

//Zapisywanie sposobu dostaw
//db.deliveries
var done = 0;
for(var i = 0; i < deliveries.length; i++)
{
    deliveries[i].save(function(err, result)
    {
        done++;
        if(done === deliveries.lenght)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
};

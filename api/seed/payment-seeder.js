const Payment = require('../models/payment');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/umkshop', { useUnifiedTopology: true, useNewUrlParser: true });

var payments =
[
    new Payment
    ({
        description: "Wpłata na konto"
    }),
    new Payment
    ({
        description: "Płatność przy odbiorze"
    })
];


//Zapisywanie rodzajów płatności
//db.payments
var done = 0;
for(var i = 0; i < payments.length; i++)
{
    payments[i].save(function(err, result)
    {
        done++;
        if(done === payments.lenght)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
};

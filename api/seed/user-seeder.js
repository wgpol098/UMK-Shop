const User = require('../models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/umkshop', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

var tmp = new User();
var password = tmp.encryptPassword('admin');

var users =
[
    new User
    ({
        email: 'admin',
        password: password,
        first_name: 'Andrzej',
        last_name: 'Gołota',
        role: 'admin',
        birthdate: '2000-12-12',
        phone_number: '123-123-123'
    }),
    new User
    ({
        email: 'user',
        password: password,
        first_name: 'Andrii',
        last_name: 'Taki',
        role: 'user',
        birthdate: '2000-12-12',
        phone_number: '123-123-123'
    })
];

//Zapisywanie userów
var done = 0;
for(var i = 0; i < users.length; i++)
{
    users[i].save(function(err, result)
    {
        done++;
        if(done === users.lenght)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
};
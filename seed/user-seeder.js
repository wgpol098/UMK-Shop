var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/umkshop', { useUnifiedTopology: true, useNewUrlParser: true });

var users =
[
    new User
    ({
        email: 'admin',
        password: 'admin',
        role: 'A'
    }),
    new User
    ({
        email: 'user',
        password: 'user',
        role: 'U'
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
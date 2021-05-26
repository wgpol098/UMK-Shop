const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema
({
    email: {type: String, required: true},
    password: {type: String, required: true},
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    role: {type: String, required: true}
    //TODO:
    //Data urodzenia
    //Numer telefonu
    //Zapasowy email
    //Adres do faktury
    //Lista adresów do wysyłki
});

userSchema.methods.encryptPassword = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);
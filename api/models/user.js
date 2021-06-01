const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//TODO: Dodać tablicę: agreements

var userSchema = new Schema
(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        role: {type: String, required: true},
        birthdate: {type: String, required: true},
        phone_number: {type: String, required: true},
        shipping_address_id: {type: Schema.Types.ObjectId},
        invoice_address_id: {type: Schema.Types.ObjectId}
    }
);

userSchema.methods.encryptPassword = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);

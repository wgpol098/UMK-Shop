const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema
({
    city: {type: String, required: true},
    //Ulica i numer domu
    street: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true}
});

module.exports = mongoose.model('Address', schema);

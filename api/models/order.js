const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema
({
    date: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User'},
    cart: {type: Object, required: true},
    address: {type: Schema.Types.ObjectId, ref:'Address'},
    name: {type: String, required: true},
    //Trzeba zrobić słownikowy dokument z tymi płatnościami -- będzie wygodniej
    paymentId: {type: String, required: true},
    status: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);
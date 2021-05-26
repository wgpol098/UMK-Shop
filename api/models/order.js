const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema
({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    cart: {type: Object, required: true},
    //To będzie odnośnik do adresu -- referencja -- to inaczej te tabele będą się bardzo mocno powiększać
    address: {type, String,required: true},
    name: {type: String, required: true},
    //Albo zrobić to inaczej, albo zrobić do tego jakąś sensowną tabelę
    paymentId: {type: String, required: true},
    status: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);
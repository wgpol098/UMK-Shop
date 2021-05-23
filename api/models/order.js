const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema
({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    //tutaj raczej powinna być referencja na cart -- ale zobaczymy
    cart: {type: Object, required: true},
    //Tutaj powinien być zapisywany adres -- niezależny od akutalnego adrsu user -- bo ten może ulegać zmianie
    address: {type, String,required: true},
    name: {type: String, required: true},
    //Albo zrobić to inaczej, albo zrobić do tego jakąś sensowną tabelę
    paymentId: {type: String, required: true},
    status: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);
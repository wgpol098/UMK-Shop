const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema
(
    {
        date: {type: Date, required: true},
        user: {type: Schema.Types.ObjectId, ref:'User'},
        cart: {type: Object, required: true},
        //nieobowiazkowe
        address: {type: Schema.Types.ObjectId, ref:'Address'},
        //nieobowiązkowe
        paymentId: {type: String},
        status: {type: String, required: true},
        //nieobowiązkowe
        deliveryId: {type: Schema.Types.ObjectId, ref:'Delivery'}
    }
);

module.exports = mongoose.model('Order', schema);

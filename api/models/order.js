const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema
(
    {
        date: {type: Date, required: true, default: Date.now()},
        user: {type: Schema.Types.ObjectId, ref:'User'},
        cart: {type: Object, required: true},
        address: {type: Schema.Types.ObjectId, ref:'Address'},
        paymentId: {type: String},
        status: {type: String, required: true},
        deliveryId: {type: Schema.Types.ObjectId, ref:'Delivery'}
    }
);

module.exports = mongoose.model('Order', schema);

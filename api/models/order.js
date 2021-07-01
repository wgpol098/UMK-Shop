const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema
(
    {
        date: {type: Date, required: true},
        user: {type: Schema.Types.ObjectId, ref:'User'},
        cart: {type: Object, required: true},
        address: {type: Schema.Types.ObjectId, ref:'Address'},
        paymentId: {type: Schema.Types.ObjectId, ref:'Payment'},
        status: {type: String, required: true},
        deliveryId: {type: Schema.Types.ObjectId, ref:'Delivery'}
    }
);

module.exports = mongoose.model('Order', schema);

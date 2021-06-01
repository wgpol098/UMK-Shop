const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        imagePath: {type: String, required: false},
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        count: {type: Number, required: true}
    }
);


module.exports = mongoose.model('Product', schema);

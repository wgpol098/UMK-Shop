var mongoose = require('mongoose');
var Shema = mongoose.Schema;

var schema = new mongoose.Schema(
    {
        //imagePath: {type: String, required: true},
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        count: {type: Number, required: true}
    }
);


module.exports = mongoose.model('Product', schema);

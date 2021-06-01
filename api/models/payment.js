const mongoose = require('mongoose');

var schema = new mongoose.Schema
(
    {
        description: {type: String, required: true}
    }
);

module.exports = mongoose.model('Payment', schema);

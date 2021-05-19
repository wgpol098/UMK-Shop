const mongoose = require("mongoose");
var Schema = moongoose.Schema;

var userSchema = new Schema
({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Users', userSchema);
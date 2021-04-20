const mongoose = require('mongoose');

const twojaNazwaSchema = new mongoose.Schema({
    // https://mongoosejs.com/docs/guide.html#definition
});

const twojaNazwa = mongoose.model('twojaNazwa', twojaNazwaSchema);

module.exports = {twojaNazwa};


const mongoose = require('mongoose');
mongoose.connect('pathToYourMongodb',
		 { //ustawienia https://mongoosejs.com/
		 });

module.exports = {mongoose};

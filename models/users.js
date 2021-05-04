const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
  // https://mongoosejs.com/docs/guide.html#definition
  name: String,
});

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {},
});

UserSchema.pre("save", function (next) {
  // Zapisz uzytkownia z zabezpieczonym hasłem w bazie
  // https://www.npmjs.com/package/bcrypt
  bcrypt.hash(user.password, SALT_ROUNDS);
});

UserSchema.methods.generateJWT = function () {
  // generowanie tokena
  // https://www.npmjs.com/package/jsonwebtoken
  // https://mongodb.github.io/node-mongodb-native/3.6/api/
  jwt.sign({ _id: user._id }, "123");
};

UserSchema.methods.removeToken = function (token) {
  // usuwanie tokena
  // https://mongodb.github.io/node-mongodb-native/3.6/api/
};

UserSchema.statics.findByToken = function (token) {
  // Znajdź użytkownia na podstawie tokena
  // https://mongodb.github.io/node-mongodb-native/3.6/api/
};

UserSchema.statics.checkCredentials = function (email, pass) {
  // sprawdzanie, czy dany użytkownik jest w bazie.
  // https://mongodb.github.io/node-mongodb-native/3.6/api/
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const MongoStore = require("connect-mongodb-session")(session);
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv").config();

var store = new MongoStore({
  uri: "mongodb://localhost:27017/umkshop",
  collection: "mySessions",
});

var routes = require("./routes/products");
var userRoutes = require("./routes/user");
var cartRoutes = require("./routes/carts");

const PORT = process.env.PORT || 3010;
var app = express();

mongoose
  .connect("mongodb://localhost:27017/umkshop", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((client) => {
    console.log("Connected to Database");
  })
  .catch((err) => console.error(err));

app.use(cors({ origin: process.env.FRONT_ENTRYPOINT, credentials: true }));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use("/user", userRoutes);
app.use("/carts", cartRoutes);
app.use("/products", routes);

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send("error");
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.status("error");
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});

module.exports = app;

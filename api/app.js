const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const routes = require("./routes/products");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/carts");
const addressRoutes = require("./routes/address");
const deliveryRoutes = require("./routes/delivery");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");
const ImageRoutes = require("./routes/image");

const PORT = process.env.PORT || 3010;
var app = express();

mongoose
  .connect("mongodb://localhost:27017/umkshop", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => 
  {
    console.log("Connected to Database");
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
        cookie: { maxAge: 180 * 60 * 1000 },
      })
    );
    app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : './img'
  }));
    app.use("/user", userRoutes);
    app.use("/carts", cartRoutes);
    app.use("/products", routes);
    app.use("/address", addressRoutes);
    app.use("/payment", paymentRoutes);
    app.use("/delivery", deliveryRoutes);
    app.use("/order", orderRoutes);
    app.use("/image", ImageRoutes);

    app.use(function (req, res, next) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    if (app.get("env") === "development") {
      app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.send("error");
      });
    }

    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.status("error");
    });

    app.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    });

  })
  .catch((err) => console.error(err));


module.exports = app;

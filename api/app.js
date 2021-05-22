var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongodb-session')(session);
var jwt = require('jsonwebtoken');
var cors = require('cors');
require('dotenv').config();

var store = new MongoStore({
  uri: 'mongodb://localhost:27017/umkshop',
  collection: 'mySessions'
});

var routes = require('./routes/products');
var userRoutes = require('./routes/user');

const PORT = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost:27017/umkshop', { useUnifiedTopology: true, useNewUrlParser: true }).then((client) => 
{
  console.log("Connected to Database");
}).catch((err) => console.error(err));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret', 
  resave:false, 
  saveUninitialized: false, 
  store: store,
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use('/user', userRoutes);
app.use('/products', routes);

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error');
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.status('error');
});


app.listen(PORT, () => 
{
    console.log(`server is running on port http://localhost:${PORT}`);
});


module.exports = app;

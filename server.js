const url = require("url");
const express = require("express");
const bodyParser = require("body-parser");

//const { ObjectId } = require("mongodb");
//const { mongoose } = require("./db/mongoose.js");
//const { Resources } = require("./models/resources.js");
//const { Users } = require("./models/users.js");

const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT || 3004;
const app = express();

const credentials = require("./credentials");

MongoClient.connect(credentials.dbLink, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("users-test");
    const usersCollection = db.collection("users");

    // Wspracie dla obsługi danych w formacie JSON
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/users", (req, res) => {
      console.log(req.body);
      usersCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(req.body);
        })
        .catch((error) => console.error(error));
    });

    ////

    app.post("/registration", (req, res) => {
      // rejestracja użytkownika
      // instrukcja
      res.header("Authorization", user.token);
    });

    app.post("/login", (req, res) => {
      // logowanie użytkownika
      // instrukcja
      res.header("Authorization", user.token);
    });

    app.delete("/logout", (req, res) => {
      // wylogowanie użytkownika
      // instrukcja
    });

    app.get("/users", (req, res) => {
      // lista użytkowników
      // instrukcja
    });

    app.get("/users/:id", (req, res) => {
      // informacje o użytkowniku o określnym id
      // instrukcja
    });

    app.get("/resources", (req, res) => {
      const createdBy = req.header("Authorization");
      // wyciąganie danych z bazy.
      // instrukcja
    });

    app.get("/resources/:id", (req, res) => {
      const createdBy = req.header("Authorization");
      // wyciąganie elementu id z bazy.
      // instrukcja
    });

    app.post("/resources", (req, res) => {
      const createdBy = req.header("Authorization");
      // dodawanie elementu do bazy.
      // instrukcja
    });

    app.delete("/resources/:id", (req, res) => {
      const createdBy = req.header("Authorization");
      // usuwanie elementu id z bazy.
      // instrukcja
    });

    app.put("/resources/:id", (req, res) => {
      const createdBy = req.header("Authorization");
      // aktualizacja elementu id
      // intrukcja
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

module.exports = { app };

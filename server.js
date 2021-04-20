const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');

const { ObjectId } = require('mongodb');
const { mongoose } = require('./db/mongoose.js');
const { Resources } = require('./models/resources.js');
const { Users } = require('./models/users.js');

const PORT = process.env.PORT || 3000;
const app = express();

// Wspracie dla obsługi danych w formacie JSON
app.use(bodyParser.json());


app.post('/registration', (req,res) => {
    // rejestracja użytkownika
    // instrukcja
    res.header('Authorization',user.token);
});

app.post('/login', (req, res) => {
    // logowanie użytkownika
    // instrukcja
    res.header('Authorization',user.token);
});

app.delete('/logout', (req, res) => {
    // wylogowanie użytkownika
    // instrukcja
});

app.get('/users', (req,res) => {
    // lista użytkowników
    // instrukcja
});

app.get('/users/:id', (req,res) => {
    // informacje o użytkowniku o określnym id
    // instrukcja
});

app.get('/resources', (req,res) => {
    const createdBy = req.header('Authorization');
    // wyciąganie danych z bazy.
    // instrukcja
});

app.get('/resources/:id', (req,res) => {
    const createdBy = req.header('Authorization');
    // wyciąganie elementu id z bazy. 
    // instrukcja
});

app.post('/resources', (req,res) => {
    const createdBy = req.header('Authorization');
    // dodawanie elementu do bazy.
    // instrukcja
});

app.delete('/resources/:id', (req,res) => {
    const createdBy = req.header('Authorization');
    // usuwanie elementu id z bazy.
    // instrukcja
});

app.put('/resources/:id', (req,res) => {
    const createdBy = req.header('Authorization');
    // aktualizacja elementu id
    // intrukcja
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {app};

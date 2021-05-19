var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/umkshop');

var products = 
[
    new Product(
    {
        title: 'Torba programu "absolwent UMK"',
        description: 'Torba Programu "Absolwent UMK". Z jednym uchem oraz dnem.',
        price: 20
    }),
    new Product(
    {
        title: "Maska ochronna UMK",
        description: "Maska ochronna UMK",
        price: 9
    }),
    new Product(
    {
        title: "Komin UMK",
        description: "Komin UMK, z zausznikami - funkcja zakrycia ust oraz nosa.",
        price: 15
    }),
    new Product(
    {
        title: "Plecak UMK",
        description: "Plecak z logo UMK, dostępny w wersji polskiej oraz angielskiej. Plecak posiada szelki oraz uszy, dzięki czemu można go nosić również w formie torby.",
        price: 30
    }),
    new Product(
    {
        title: "Czapka baseballówka",
        description: "Czapka baseballówka. Regulowane, metalowe zapięcie, logo w wersji polskiej oraz angielskiej.",
        price: 30
    }),
    new Product(
    {
        title: "Magnesy z Mikołajem Kopernikiem",
        description: "Magnesy z wizerunkiem Mikołaja Kopernika dostępne w czterech wersjach.",
        price: 15
    }),
    new Product(
    {
        title: "Skarpety UMK",
        description: 'Skarpety z logo UMK. Dostępne rozmiary: 35-37, 38-40, 41-43, 44-46.',
        price: 18
    }),
    new Product(
    {
        title: "Pendrive Mikołaj Kopernik",
        description: 'Pendrive o pojemności 32 GB w kształcie Mikołaja Kopernika.',
        price: 39
    }),
    new Product(
    {
        title: "Filiżanka z logo UMK",
        description: 'Filiżanka Venezia Set 200 ml z logo w wersji polskiej lub angielskiej.',
        price: 40
    }),
    new Product(
    {
        title: "Kubek z logo UMK",
        description: 'Kubek z logo UMK w wersji polskiej lub angielskiej.',
        price: 13.50
    }),
];


//Zapisywanie produktów
var done = 0;
for(var i = 0; i < products.length; i++)
{
    products[i].save(function(err, result)
    {
        if(done === products.lenght)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
};
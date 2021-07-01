const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/umkshop', { useUnifiedTopology: true, useNewUrlParser: true });

var products = 
[
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: 'Torba programu "absolwent UMK"',
        description: 'Torba Programu "Absolwent UMK". Z jednym uchem oraz dnem.',
        price: 20,
        count: 10
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Maska ochronna UMK",
        description: "Maska ochronna UMK",
        price: 9,
        count: 15
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Komin UMK",
        description: "Komin UMK, z zausznikami - funkcja zakrycia ust oraz nosa.",
        price: 15,
        count: 98
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Plecak UMK",
        description: "Plecak z logo UMK, dostępny w wersji polskiej oraz angielskiej. Plecak posiada szelki oraz uszy, dzięki czemu można go nosić również w formie torby.",
        price: 30,
        count: 52
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Czapka baseballówka",
        description: "Czapka baseballówka. Regulowane, metalowe zapięcie, logo w wersji polskiej oraz angielskiej.",
        price: 30,
        count: 33
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Magnesy z Mikołajem Kopernikiem",
        description: "Magnesy z wizerunkiem Mikołaja Kopernika dostępne w czterech wersjach.",
        price: 15,
        count: 63
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Skarpety UMK",
        description: 'Skarpety z logo UMK. Dostępne rozmiary: 35-37, 38-40, 41-43, 44-46.',
        price: 18,
        count: 11
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Pendrive Mikołaj Kopernik",
        description: 'Pendrive o pojemności 32 GB w kształcie Mikołaja Kopernika.',
        price: 39,
        count: 431
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Filiżanka z logo UMK",
        description: 'Filiżanka Venezia Set 200 ml z logo w wersji polskiej lub angielskiej.',
        price: 40,
        count: 123
    }),
    new Product(
    {
        imagePath: 'https://www.umk.pl/uslugi/materialy/indyw/maseczka/maseczka.jpg',
        title: "Kubek z logo UMK",
        description: 'Kubek z logo UMK w wersji polskiej lub angielskiej.',
        price: 13.50,
        count: 945
    }),
];


//Zapisywanie produktów
var done = 0;
for(var i = 0; i < products.length; i++)
{
    products[i].save(function(err, result)
    {
        done++;
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
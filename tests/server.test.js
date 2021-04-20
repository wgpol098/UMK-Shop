const request = require('supertest');
const {app} = require('./../server.js');
const {Resources} = require('./../models/resources.js');
const {ObjectId} = require('mongodb');

describe('POST /resources', () => {
    test('powinno zapisać do bazy danych dokument', (done) => {
	// instrukcja
    });
    test('powinno nie zapisać do bazy danych dokument', (done) => {
	// instrukcja
    });
});

describe('GET /resources', () => {
    test('powinno zwrócić listę dokumnetów z bazy danych', (done) => {
	// instrukcja
    });
});
describe('GET /resources/:id', () => {
    test('powinno zwrócić dokument o szukanym id', (done) => {
	// instrukcja
    });
    test('powinno zrówić kod 404, gdy id niepoprawne', (done) => {
	// instrukcja
    });
    test('powinno zrówić kod 404, gdy id nie ma w bazie danych', (done) => {
	// instrukcja
    });

});

describe('DELETE /resources/:id', () => {
    test('powinno usunąć dokument o szukanym id', (done) => {
	// instrukcja
    });
    test('powinno zrówić kod 404, gdy id niepoprawne', (done) => {
	// instrukcja
    });
    test('powinno zrówić kod 404, gdy id nie ma w bazie danych', (done) => {
	// instrukcja
    });
});

describe('PUT /resources/:id', () => {
    test('powinno uaktualnić dane w dokumencie o szukanym id', (done) => {
	// instrukcja
    });
    test('powinno zrówić kod 404, gdy id niepoprawne', (done) => {
	// instrukcja
    });
});


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET products', () => {
    it('Powinno zwrócić wszystkie produkty podzielone na pages  - kod 200', (done) => {
      chai.request(server)
          .get('/products')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
            done();
          });
    });
});

//DONE
describe('/POST products', () => {
  var product = {};
  it('Nie powinno wykonać post - kod 401 - brak uprawnień', (done) => {
    chai.request(server)
        .post('/products')
        .send(product)
        .end((err, res) => {
              res.should.have.status(401);
          done();
        });
  });

  it('Nie powinno wykonać post - kod 400 - bad request', (done) => {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      const token = res.body.accessToken;
      res.should.have.status(200);
      chai.request(server)
        .post('/products')
        .set('authorization',token)
        .send(product)
        .end((err, res) => {
              res.should.have.status(400);
          done();
        });
    });
  });

  var product1 = 
  {
    title: 'nowy produkt',
    description: 'opis nowego produktu',
    price: 123,
    count: 300
  };

  it('Nie powinno wykonać post - kod 201 - poprawnie dodano produkt do bazy danych', (done) => {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      const token = res.body.accessToken;
      res.should.have.status(200);
      chai.request(server)
        .post('/products')
        .set('authorization',token)
        .send(product1)
        .end((err, res) => 
        {
          res.should.have.status(201);
          done();
        });
    });
  });
});

describe('/GET user', () => {
  it('Powinno zwrócić błąd 401, gdy jesteśmy niezalogowani', (done) => {
    chai.request(server)
        .get('/user')
        .end((err, res) => {
              res.should.have.status(401);
          done();
        });
  });
});

describe('/GET payment', () => {
  it('Powinno zwrócić wszystkie payment - kod 200', (done) => {
    chai.request(server)
        .get('/payment')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

describe('/GET order', () => {
  it('Powinno zwrócić 401 - user jest niezalogowany', (done) => {
    chai.request(server)
        .get('/order')
        .end((err, res) => {
              res.should.have.status(401);
          done();
        });
  });
});

describe('/GET delivery', () => {
  it('Powinno zwrócić wszystkie delivery - kod 200 ', (done) => {
    chai.request(server)
        .get('/delivery')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

describe('/GET cart', () => {
  it('Powinno zwrócić koszyk - kod 200', (done) => {
    chai.request(server)
        .get('/cart')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

describe('/GET address', () => {
  it('Powinno zwrócić wszystkie adresy - kod 200', (done) => {
    chai.request(server)
        .get('/address')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});
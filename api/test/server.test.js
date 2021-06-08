//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET products', () => {
    it('Powinno zwrócić wszystkie produkty - kod 200', (done) => {
      chai.request(server)
          .get('/products')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
            done();
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
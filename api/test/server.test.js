//Require the dev-dependencies
const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
const { insertMany } = require('../models/user');
let should = chai.should();

chai.use(chaiHttp);

//TODO: TEST Z FILTREM
describe('/GET products', () => {
    it('Powinno zwrócić pierwszą stronę z 10 produktami  - kod 200', (done) => {
      chai.request(server)
          .get('/products')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.should.have.length(10);
            done();
          });
    });

    it('Powinno zwrócić pierwszą stronę z 20 produktami  - kod 200', (done) => {
      chai.request(server)
          .get('/products?limit=20')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.should.have.length(20);
            done();
          });
    });
});

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

  it('Nie powinno wykonać post - kod 400 - błąd w żądaniu', (done) => {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;
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

  it('Powinno wykonać post - kod 201 - poprawnie dodano produkt do bazy danych', (done) => {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;
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

describe('/PUT products', () =>
{
  it('Nie powinno wykonać PUT - kod 401 - brak uprawnień', (done) => {
    chai.request(server)
        .get('/products')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.data.should.be.a('array');
              res.body.data.should.have.length(10);

              const item = res.body.data[0]._id;
              chai.request(server)
                  .put('/products/' + item)
                  .end((err, res) => {
                    res.should.have.status(401);
                    done();
                  });
        });
  });

  //TODO: Ta metoda coś nie działa - do przetestowania
  it('Powinno wykonać PUT - kod 204', (done) => {
  chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
    res.should.have.status(200);
    const token = res.body.accessToken;

    chai.request(server)
    .get('/products')
    .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.should.have.length(10);

          const item = res.body.data[0]._id;
          chai.request(server)
              .put('/products/' + item)
              .set('authorization', token)
              .end((err, res) => {
                res.should.have.status(204);
                done();
              });
    });
  });
});
});


describe('/DELETE products', () =>
{
  it('Nie powinno usunąć elementu z bazy danych - kod 401 - brak uprawnień', (done) =>
  {
    chai.request(server).get('/products').end((err, res) =>
    {
      res.should.have.status(200);
      res.body.data.should.be.a('array');
      res.body.data.should.have.length(10);

      const item = res.body.data[0]._id;
      chai.request(server).delete('/products/' + item).end((err, res) =>
      {
        res.should.have.status(401);
        done();
      });
    });
  });

  it('Powinno usunąć element z bazy danych - kod 204', (done) =>
  {
    chai.request(server).get('/products').end((err, res) =>
    {
      res.should.have.status(200);
      res.body.data.should.be.a('array');
      res.body.data.should.have.length(10);

      const item = res.body.data[0]._id;

      chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
        res.should.have.status(200);
        const token = res.body.accessToken;

        chai.request(server).delete('/products/' + item).set('authorization',token).end((err, res) =>
        {
          res.should.have.status(204);
  
          chai.request(server).get('/products/' + item).end((err, res) =>
          {
            res.should.have.status(404);
            done();
          });
        });
      });
    });
  });
});


//---------------------------USER
//TODO: TESTY

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

describe('/POST user', () => 
{
  it('Nie powinno dodać usera do bazy - błędne dane', (done) => 
  {
    done();
  });

  it('Powinno dodać usera do bazy', (done) =>
  {
    done();
  });
});

describe('/PUT user/edit', () =>
{
  it('Nie powinno edytować usera - brak uprawnień', (done) =>
  {
    done();
  });

  it('Powinno edytować usera - kod 204', (done) =>
  {
    done();
  });
});

describe('/POST user/login', () =>
{
  it('Nie powinno zalogowac - user nie istnieje', (done) =>
  {
    done();
  });

  it('Powinno zalogowac usera - kod 200', (done) =>
  {
    done();
  });
});

describe('DELETE user', () =>
{
  it('Nie powinno usunac usera - brak uprawnien', (done) =>
  {
    done();
  });

  it('Powinno usunąć usera - kod 204', (done) =>
  {
    done();
  });
});

//---------------------------PAYMENT
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

describe('/POST payment', () =>
{
  it('Nie powinno dodać nowego elementu do payment - kod 401 - brak uprawnień', (done) => 
  {
      chai.request(server).post('/payment').end((err, res)=>
      {
        res.should.have.status(401);
        done();
      });
  });

  it('Nie powinno dodać nowego elementu do payment - kod 400 - złe dane', (done) => 
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).post('/payment').set('authorization', token).end((err, res)=>
      {
        res.should.have.status(400);
        done();
      });
    });
  });

  it('Powinno dodać nowy element do payment - kod 201', (done) => 
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).post('/payment' + '?description=Nowy sposob platnosci').set('authorization', token).end((err, res)=>
      {
        res.should.have.status(201);
        done();
      });
    });
  });
});

describe('/DELETE payment', () =>
{
  it('Nie powinno usunąć payment - kod 401 - brak uprawnień', (done) =>
  {
    chai.request(server).get('/payment').end((err, res) => 
    {
      res.should.have.status(200);

      var item = res.body[0]._id;
      
      chai.request(server).delete('/payment/' + item).end((err, res) => 
      {
        res.should.have.status(401);
        done();
      });
    });
  });

  it('Powinno usunąć payment - kod 204', (done) =>
  {
    chai.request(server).get('/payment').end((err, res) => 
    {
      res.should.have.status(200);

      const item = res.body[0]._id;
      
      chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
        res.should.have.status(200);
        const token = res.body.accessToken;

        chai.request(server).delete('/payment/' + item).set('authorization', token).end((err, res) => 
        {
          res.should.have.status(204);
          done();
        });
      });
    });
  });
});

describe('/PUT payment', () => 
{
  it('Nie powinno edytować payment - brak uprawnień', (done) =>
  {
    chai.request(server).get('/payment').end((err, res) => 
    {
      res.should.have.status(200);
      
      const item = res.body[0]._id;

      chai.request(server).put('/payment/' + item).end((err, res) => 
      {
        res.should.have.status(401);
        done();
      });
    });
  });

  it('Powinno edytować payment - kod 204', (done) =>
  {
    chai.request(server).get('/payment').end((err, res) => 
    {
      res.should.have.status(200);
      
      const item = res.body[0]._id;

      chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
        res.should.have.status(200);
        const token = res.body.accessToken;
        
        chai.request(server).put('/payment/' + item).set('authorization', token).end((err, res) => 
        {
          res.should.have.status(204);
          done();
        });
      });
    });
  });
});

//---------------------------ORDER
describe('/GET order', () => {
  it('Powinno zwrócić 401 - user jest niezalogowany', (done) => {
    chai.request(server)
        .get('/order')
        .end((err, res) => {
              res.should.have.status(401);
          done();
        });
  });

  it('Powinno zwrócić przedmioty zamówione przez użytkownika', (done) => 
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server)
      .get('/order')
      .set('authorization', token)
      .end((err, res) => {
            res.should.have.status(200);
        done();
      });
    });
  });
});

describe('/POST order', () =>
{
  it('Nie powinno wykonać post do order - brak uprawnień', (done) =>
  {
    chai.request(server).post('/order').end((err, res)=>
    {
      res.should.have.status(401);
      done();
    });
  });

  it('Nie powinno wykonać post do order - błędne zapytanie', (done) =>
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).post('/order').set('authorization', token).end((err, res)=>
      {
        res.should.have.status(400);
        done();
      });
    });
  });

  //TODO: VSEVOLOD - MUSISZ KOSZYK UWZGLĘDNIĆ- TY UMIESZ- JA NIE
  it('Powinno dodać obiekt do order - kod 204', (done) =>
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).get('/delivery').end((err, res) => 
      {
        res.should.have.status(200);
        const delivery = res.body[0]._id;

        chai.request(server).get('/payment').end((err, res) => 
        {
          res.should.have.status(200);
          const payment = res.body[0]._id;

          chai.request(server).post('/order' + '?payment_id=' + payment + '&delivery_id=' + delivery + '&status=1&zip=123&country=polska&street=ulica&city=warszawa').set('authorization', token).end((err, res) =>
          {
            res.should.have.status(204);
            done();
          });
        });
      });
    });
  });
});

//TODO: Do dokończenia jak będę miał dane do przetestowania
describe('/DELETE order', () =>
{
  it('Nie powinno usunąć zamówienie - brak uprawnień', (done) => 
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).get('/order').end((err, res) => 
      {
        res.should.have.status(200);
        
        const order = res.body[0]._id;
        done();
      });
    });
  });
});

//---------------------------DELIVERY
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

describe('/POST delivery',() =>
{
  it('Nie powinno dodać nowego delivery - brak uprawnień', (done) =>
  {
    chai.request(server).post('/delivery').end((err, res) => 
    {
      res.should.have.status(401);
      done();
    });
  });

  it('Nie powinno dodać nowego delivery - złe zapytanie', (done) =>
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).post('/delivery').set('authorization', token).end((err, res) => 
      {
        res.should.have.status(400);
        done();
      });
    });
  });

  it('Powinno dodać nową opcję dostawy - kod 201', (done) =>
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).post('/delivery' + "?name=nowa dostawa&description=jest to nowa opcja dostawy&price=12").set('authorization', token).end((err, res) => 
      {
        res.should.have.status(201);
        done();
      });
    });
  });
});

describe('/PUT delivery', () =>
{
  it('Nie powinno edytować opcji dostaw - brak dostępu', (done) =>
  {
    chai.request(server).get('/delivery').end((err, res) =>
    {
      res.should.have.status(200);
      const item = res.body[0]._id;
      chai.request(server).put('/delivery/' + item).end((err, res) => 
      {
        res.should.have.status(401);
        done();
      });
    });
  });

  it('Powinno zedytować opcje dostawy - kod 204', (done) =>
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).get('/delivery').end((err, res) =>
      {
        res.should.have.status(200);
        const item = res.body[0]._id;
        chai.request(server).put('/delivery/' + item).set('authorization',token).end((err, res) => 
        {
          res.should.have.status(204);
          done();
        });
      });
    });
  });
});

describe('/DELETE delivery', () =>
{
  it('Nie powinno usunąć opcji dostawy - brak uprawnień', (done) => 
  {
    chai.request(server).get('/delivery').end((err, res) => 
    {
      res.should.have.status(200);
      const item = res.body[0]._id;
      chai.request(server).delete('/delivery/' + item).end((err, res) =>
      {
        res.should.have.status(401);
        done();
      });
    });
  });

  it('Powinno usunąć opcje dostawy - kod 204', (done) => 
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;
      chai.request(server).get('/delivery').end((err, res) => 
      {
        res.should.have.status(200);
        const item = res.body[0]._id;
        chai.request(server).delete('/delivery/' + item).set('authorization', token).end((err, res) =>
        {
          res.should.have.status(204);
          done();
        });
      });
    });
  });
});

//---------------------------CART
//TODO: VSEVOLOD DOKOŃCZYSZ TO - W SZCZEGÓLNOŚCI DELETE
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

describe('/POST cart/addtocart', () => {
  it('Powinno dodać przedmiot do koszyka', (done) => 
  {
    chai.request(server).get('/products').end((err, res) => 
    {
        res.should.have.status(200);
        var item = res.body.data[0]._id;
        chai.request(server).post('/cart/addtocart?id=' + item).end((err, res) =>
        {
          res.should.have.status(201);
          done();
        });
    });
  });
});

describe('/DELETE cart/removefromcart', () =>
{
  it('Powinno usunąć przedmiot z koszyka', (done) =>
  {
    chai.request(server).get('/cart').end((err, res) =>
    {
      console.log(res.body);
      done();
    });
  });
});

//---------------------------ADDRESS
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

describe('/POST address', () =>
{
  it('Nie powinno dodać adresu - błędne parametry', (done) =>
  {
    chai.request(server).post('/address').end((err, res) => 
    {
      res.should.have.status(400);
      done();
    });
  });

  //TODO: Ustalić co tu jest źle i zrobić assercje otrzymanych danych bo zostało to zmienione
  it('Powinno dodać adres - kod 204', (done) =>
  {
    chai.request(server).post('/address' + "?city=Warszawa&zip=123123street=sienkiewicza&country=polska").end((err, res) => 
    {
      res.should.have.status(204);
      done();
    });
  });
});

describe('/DELETE address', () =>
{
  it('Nie powinno usunąć adresu - brak uprawnień', (done) =>
  {
    chai.request(server).get('/address').end((err, res) => 
    {
      const item = res.body[0]._id;

      chai.request(server).delete('/address/' + item).end((err, res) =>
      {
        res.should.have.status(401);
      });
      done();
    });
  });

  it('Powinno usunąć adres - kod - 204', (done) =>
  {
    chai.request(server).post('/user/login').send({email: 'admin', password: 'admin'}).end((err, res) => {
      res.should.have.status(200);
      const token = res.body.accessToken;

      chai.request(server).get('/address').end((err, res) => 
      {
        res.should.have.status(200);
        const item = res.body[0]._id;
  
        chai.request(server).delete('/address/' + item).set('authorization', token).end((err, res) =>
        {
          res.should.have.status(204);
          done();
        });
      });
    });
  });
});

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const expect = chai.expect;
const Client = require('../../models/client');
const Provider = require('../../models/provider');
chai.use(chaiHttp);

/**
 * Constants
 */
const API_URL = '/api/v1';

/**
 * API tests
 */
describe('API', () => {
  /**
   * Cleanup database before tests
   */
  before(() => {
    return Promise.all([
      Client.remove(),
      Provider.remove()
    ]);
  });

  /**
   * Clients
   */
  describe('Clients', () => {
    /**
     * /POST clients
     */
    describe('/POST clients', () => {
      it('should not add client without name', () => {
        let client = {
          email: 'john@company.com',
          phone: '+777',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not add client without email', () => {
        let client = {
          name: 'John',
          phone: '+777',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not add client without phone', () => {
        let client = {
          name: 'John',
          email: 'john@company.com',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not add client with bad email', () => {
        let client = {
          name: 'John',
          email: 'johnWithBadEmail',
          phone: '+777',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not add client with bad phone', () => {
        let client = {
          name: 'John',
          email: 'john@company.com',
          phone: 'badPhone',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should add new client', () => {
        let client = {
          name: 'John',
          email: 'john@company.com',
          phone: '+777',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'John');
            expect(res.body).to.have.property('email', 'john@company.com');
            expect(res.body).to.have.property('phone', '+777');
            expect(res.body).to.have.property('providers');
            expect(res.body.providers.length).to.be.eq(0);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should add new client', () => {
        let client = {
          name: 'James',
          email: 'james@company.com',
          phone: '+333',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'James');
            expect(res.body).to.have.property('email', 'james@company.com');
            expect(res.body).to.have.property('phone', '+333');
            expect(res.body).to.have.property('providers');
            expect(res.body.providers.length).to.be.eq(0);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not add client with existing email', () => {
        let client = {
          name: 'James',
          email: 'john@company.com',
          phone: '+333',
          providers: []
        };
        return chai.request(app)
          .post(`${API_URL}/clients`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', 'Email already registered');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /GET clients
     */
    describe('/GET clients', () => {
      it('should return clients list', () => {
        return chai.request(app)
          .get(`${API_URL}/clients`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eq(2);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /GET/:id clients
     */
    describe('/GET/:id clients', () => {
      it('should return client', async () => {
        let clientJohn = await Client.findOne({ name: 'John' });
        let id = clientJohn.id;
        return chai.request(app)
          .get(`${API_URL}/clients/${id}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body.name).to.be.eq('John');
            expect(res.body.email).to.be.eq('john@company.com');
            expect(res.body.phone).to.be.eq('+777');
            expect(res.body.providers).to.be.an('array');
            expect(res.body.providers.length).to.be.eq(0);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /PUT/:id clients
     */
    describe('/PUT/:id clients', () => {
      it('should not update client with wrong id', () => {
        let id = 123;
        let client = {
          name: 'John Travolta',
          email: 'abc@test.com'
        };
        return chai.request(app)
          .put(`${API_URL}/clients/${id}`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(500);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not update client with existing email', async () => {
        let clientJohn = await Client.findOne({ name: 'John' });
        let id = clientJohn.id;
        let client = {
          email: 'james@company.com'
        };
        return chai.request(app)
          .put(`${API_URL}/clients/${id}`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', 'Email already registered');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not update client with bad email', async () => {
        let clientJohn = await Client.findOne({ name: 'John' });
        let id = clientJohn.id;
        let client = {
          email: 'johnWithBadEmail'
        };
        return chai.request(app)
          .put(`${API_URL}/clients/${id}`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not update client with bad phone', async () => {
        let clientJohn = await Client.findOne({ name: 'John' });
        let id = clientJohn.id;
        let client = {
          phone: 'badPhone'
        };
        return chai.request(app)
          .put(`${API_URL}/clients/${id}`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should update client john', async () => {
        let clientJohn = await Client.findOne({ name: 'John' });
        let id = clientJohn.id;
        let client = {
          name: 'John Travolta',
          email: 'john.travolta@company.com',
          phone: '+999'
        };
        return chai.request(app)
          .put(`${API_URL}/clients/${id}`)
          .send(client)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'John Travolta');
            expect(res.body).to.have.property('email', 'john.travolta@company.com');
            expect(res.body).to.have.property('phone', '+999');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /DELETE/:id clients
     */
    describe('/DELETE/:id clients', () => {
      it('should delete client', async () => {
        let clientJohn = await Client.findOne({ name: 'John Travolta' });
        let id = clientJohn.id;
        return chai.request(app)
          .delete(`${API_URL}/clients/${id}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'John Travolta');
            expect(res.body).to.have.property('email', 'john.travolta@company.com');
            expect(res.body).to.have.property('phone', '+999');
            expect(res.body).to.have.property('providers');
            expect(res.body.providers.length).to.be.eq(0);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });
  });

  /**
   * Providers
   */
  describe('Providers', () => {
    /**
     * /POST providers
     */
    describe('/POST providers', () => {
      it('should not add provider without name', () => {
        let provider = {};
        return chai.request(app)
          .post(`${API_URL}/providers`)
          .send(provider)
          .then(res => {
            expect(res).to.have.status(400);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should add provider', () => {
        let provider = {
          name: 'abc'
        };
        return chai.request(app)
          .post(`${API_URL}/providers`)
          .send(provider)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'abc');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should add provider', () => {
        let provider = {
          name: 'xyz'
        };
        return chai.request(app)
          .post(`${API_URL}/providers`)
          .send(provider)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'xyz');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not add provider with existing name', () => {
        let provider = {
          name: 'abc'
        };
        return chai.request(app)
          .post(`${API_URL}/providers`)
          .send(provider)
          .then(res => {
            expect(res).to.have.status(409);
            expect(res.body).to.have.property('message', 'Name already exists');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /GET providers
     */
    describe('/GET providers', () => {
      it('should return providers list', () => {
        return chai.request(app)
          .get(`${API_URL}/providers`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eq(2);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /GET/:id providers
     */
    describe('/GET/:id providers', () => {
      it('should return provider', async () => {
        let providerAbc = await Provider.findOne({ name: 'abc' });
        let id = providerAbc.id;
        return chai.request(app)
          .get(`${API_URL}/providers/${id}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body.name).to.be.eq('abc');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /PUT/:id providers
     */
    describe('/PUT/:id providers', () => {
      it('should not update provider with wrong id', () => {
        let id = 123;
        let provider = {
          name: 'abcd',
        };
        return chai.request(app)
          .put(`${API_URL}/providers/${id}`)
          .send(provider)
          .then(res => {
            expect(res).to.have.status(500);
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should not update provider with existing name', async () => {
        let providerAbc = await Provider.findOne({ name: 'abc' });
        let id = providerAbc.id;
        let provider = {
          name: 'xyz'
        };
        return chai.request(app)
          .put(`${API_URL}/providers/${id}`)
          .send(provider)
          .then(res => {
            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', 'Name already exists');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });

      it('should update provider', async () => {
        let providerAbc = await Provider.findOne({ name: 'abc' });
        let id = providerAbc.id;
        let provider = {
          name: 'abc def'
        };
        return chai.request(app)
          .put(`${API_URL}/providers/${id}`)
          .send(provider)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'abc def');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });

    /**
     * /DELETE/:id providers
     */
    describe('/DELETE/:id providers', () => {
      it('should delete provider', async () => {
        let providerAbc = await Provider.findOne({ name: 'abc def' });
        let id = providerAbc.id;
        return chai.request(app)
          .delete(`${API_URL}/providers/${id}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'abc def');
          })
          .catch(err => {
            expect(err).to.be.null;
          });
      });
    });
  });
});

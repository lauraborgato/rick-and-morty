import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'reflect-metadata';
import TYPES from '../../src/helpers/types';
import container from '../../src/helpers/utils/inversify.config';
import UserServicesStub from '../serviceStubs/userServiceStub';
import { users, server } from '../serviceStubs/userStub';

chai.use(chaiHttp);
let should = chai.should();

describe('Auth Controller', () => {
  beforeEach((done) => { 
    users.splice(0, users.length);
    container.rebind<UserServicesStub>(TYPES.AuthService).to(UserServicesStub).inSingletonScope()
    users.push( {
      _id: 'FakeID',
      name: "Jon",
      email: "jon@gmail.com",
      password: "thisIsAPasswordTest",
      favouriteCharacters: [1,2,3,4]
    });
    users.push( {
      _id: '123457',
      name: "Angi",
      email: "angi@gmail.com",
      password: "thisIsAPasswordTest",
      favouriteCharacters: []
    });

    done();
  });

  
  describe('api/auth/signup', () => {
    it('it should create user succesfully and return session data', (done) => {
      chai.request(server)
        .post('/api/auth/signup')
        .set('Content-Type', 'application/json')
        .send({
          name: "Peter",
          email: "peter@gmail.com",
          password: "successSignup",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body.token.length).to.be.greaterThan(0);
          res.body.should.property('expiresIn');
          expect(res.body.expiresIn).to.be.a('number');
          expect(res.body.expiresIn).to.be.greaterThan(0);
          res.body.should.property('id');
          expect(res.body.token).to.be.a('string');
          expect(res.body.token.length).to.be.greaterThan(0);
          done();
        });
    });

    it('it should fail user already exists', (done) => {
      chai.request(server)
        .post('/api/auth/signup')
        .set('Content-Type', 'application/json')
        .send({
          name: "Jon",
          email: "jon@gmail.com",
          password: "thisIsAPasswordTest",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message.length).to.be.greaterThan(0);
          expect(res.body.message).to.be.equal('User name or password already exits');
          done();
        });
    });
  });

  describe('api/auth/login', () => {
    it('it should verify the user succesfully and return session data', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          name: "Jon",
          email: "jon@gmail.com",
          password: "thisIsAPasswordTest",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body.token.length).to.be.greaterThan(0);
          res.body.should.property('expiresIn');
          expect(res.body.expiresIn).to.be.a('number');
          expect(res.body.expiresIn).to.be.greaterThan(0);
          res.body.should.property('id');
          expect(res.body.id).to.be.a('string'); 
          expect(res.body.id.length).to.be.greaterThan(0);
          done();
        });
    });

    it('it should fail user dosen\'t exists', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          name: "Rick",
          email: "rick@gmail.com",
          password: "notSuccessLogin",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message.length).to.be.greaterThan(0);
          expect(res.body.message).to.be.equal('User name or password are incorrect');
          done();
        });
    });

    it('it should fail incorrect password', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          name: "Jon",
          email: "jon@gmail.com",
          password: 'incorrectPass'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message.length).to.be.greaterThan(0);
          expect(res.body.message).to.be.equal('User name or password are incorrect');
          done();
        });
    });
  })
});
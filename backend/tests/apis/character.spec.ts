import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'reflect-metadata';
import TYPES from '../../src/helpers/types';
import container from '../../src/helpers/utils/inversify.config';
import UserServicesStub from '../serviceStubs/userServiceStub';
import { CharacterServiceStub } from '../serviceStubs/characterServiceStub';
import jwt from 'jsonwebtoken';
import { secretString } from '../../src/helpers/utils/config';
import { users, server } from '../serviceStubs/userStub';
import { CharacterController } from '../../src/controller/character';

chai.use(chaiHttp);
let should = chai.should();

describe('Character Controller', () => {
  const getValidToken = (user: any) => {
    return jwt.sign({ email: user.email, userId: user._id }, secretString, { expiresIn: '1h' });
  }

  const getValidTokenAndChangeId = (user: any, index: number) => {
    const token = jwt.sign({ email: user.email, userId: user._id }, secretString, { expiresIn: '1h' });
    users[index]._id = 'UpdatedID';
    return token;
  }

  const stubCharacter = {
    id: 1
  };

  beforeEach((done) => { 
    users.splice(0, users.length);
    container.rebind<UserServicesStub>(TYPES.AuthService).to(UserServicesStub).inSingletonScope()
    container.rebind<CharacterServiceStub>(TYPES.CharacterService).to(CharacterServiceStub).inSingletonScope()
    container.rebind<CharacterController>(TYPES.CharacterController).to(CharacterController).inSingletonScope()
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

  describe('api/characters', () => {
    it('it should return unauthorize user', (done) => {
      chai.request(server)
        .get('/api/characters')
        .set('Content-Type', 'application/json')
        .set("Authorization", "Bearer shuldFailInvalidToken")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message.length).to.be.greaterThan(0);
          expect(res.body.message).to.be.equal('You are not authenticated');
        });
      done();
    });

    it('it should return a list of characters that should contain favourites', (done) => {
      chai.request(server)
        .get('/api/characters')
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${getValidToken(users[0])}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('pages');
          expect(res.body.pages).to.be.a('number');
          expect(res.body.pages).to.be.greaterThan(0);
          res.body.should.have.property('characters');
          expect(res.body.characters).to.be.a('Array');
          expect(res.body.characters.length).to.be.equal(20);
          const fav = res.body.characters.filter((char: any) => {
            return char.isFav
          });
          expect(fav.length).to.be.greaterThan(0);
          done();
        });
    });

    it('it should return a list of characters that should not contain favourites', (done) => {
      chai.request(server)
        .get('/api/characters')
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${getValidToken(users[1])}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('pages');
          expect(res.body.pages).to.be.a('number');
          expect(res.body.pages).to.be.greaterThan(0);
          res.body.should.have.property('characters');
          expect(res.body.characters).to.be.a('Array');
          expect(res.body.characters.length).to.be.equal(20);
          const fav = res.body.characters.filter((char: any) => {
            return char.isFav
          });
          expect(fav.length).to.be.equal(0);
          done();
        });
    });

    it('it should fail', (done) => {
      chai.request(server)
        .get('/api/characters')
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${getValidTokenAndChangeId(users[1], 1)}`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message.length).to.be.greaterThan(0);
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });
  });
  describe('api/characters/:id', () => {
    it('it should return unauthorize user', (done) => {
      chai.request(server)
        .get(`/api/characters/${stubCharacter.id}`)
        .set('Content-Type', 'application/json')
        .set("Authorization", "Bearer shuldFailInvalidToken")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message.length).to.be.greaterThan(0);
          expect(res.body.message).to.be.equal('You are not authenticated');
        });
      done();
    });

    it('it should return a character ditails by id', (done) => {
      chai.request(server)
        .get('/api/characters/1')
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${getValidToken(users[0])}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('character');
          expect(res.body.character).to.be.a('object');
          expect(res.body.character.id).to.be.a('number');
          expect(res.body.character.name).to.be.a('string');
          expect(res.body.character.status).to.be.a('string');
          expect(res.body.character.species).to.be.a('string');
          expect(res.body.character.type).to.be.a('string');
          expect(res.body.character.gender).to.be.a('string');
          expect(res.body.character.origin).to.be.a('string');
          expect(res.body.character.location).to.be.a('string');
          expect(res.body.character.image).to.be.a('string');
          expect(res.body.character.isFav).to.be.a('boolean');
          res.body.should.have.property('origin');
          expect(res.body.origin).to.be.a('object');
          expect(res.body.origin.id).to.be.a('number');
          expect(res.body.origin.type).to.be.a('string');
          expect(res.body.origin.name).to.be.a('string');
          expect(res.body.origin.dimension).to.be.a('string');
          res.body.should.have.property('location');
          expect(res.body.location).to.be.a('object');
          expect(res.body.location.id).to.be.a('number');
          expect(res.body.location.type).to.be.a('string');
          expect(res.body.location.name).to.be.a('string');
          expect(res.body.location.dimension).to.be.a('string');
          res.body.should.have.property('episode');
          expect(res.body.episode).to.be.a('Array');
          done();
        });
    });
  });
});
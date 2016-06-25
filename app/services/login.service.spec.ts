/**
 * Created by Franz on 5/14/2016.
 */
import bunyan = require('bunyan');
import should = require ('should');
import mongoPool = require('bsh-mongo-pool');
import Q = require('q');
import {Db} from 'mongodb';
import {Session} from 'bsh-shared/security';
import bshToken = require('bsh-token');
import {createToken} from 'bsh-token';
import bshMongoToken = require ('bsh-mongo-token');
import {RestStatusCodes} from '../util/restStatusCodes';
import {StatusedError} from '../util/StatusedError';
import {Injector} from './../injection/injector';
import {USER_DAO_INJECTION_KEY} from '../util/injectionConstants';
import {MockUserDAO} from '../dao/user/mock.user.dao';
import {LoginService} from './login.service';
import {config} from '../config/config';

let log = config.getConfiguredLog('login.service.spec.ts');

bshToken.implementation(bshMongoToken);

const testInjector:Injector = new Injector();
testInjector.register(USER_DAO_INJECTION_KEY, new MockUserDAO());
let loginService = testInjector.instantiate(LoginService);

before(function (done) {
  mongoPool.init(config.env.mongoURI, {})
    .then(function (db:Db) {
      done();
    }, function (err) {
      done();
    });
});

describe('Login Tests', function() {
  it('should login', function () {
    return createToken('security')
      .then(function (token) {
        return loginService.login(token, 'security', {username: 'dzemen05@gmail.com', password: 'Ohanzee1!'})
          .then(function (session:Session) {
            should.exist(session);
            (session.user.username).should.be.equal('dzemen05@gmail.com');
            return true;
          });
      });
  });
  it('should not login due to wrong email', function () {
    return createToken('security')
      .then(function (token) {
        return loginService.login(token, 'security', {username: 'dzemen06@gmail.com', password: 'Ohanzee1!'})
          .then(function (session:Session) {
            should.not.exist(session);
            return;
          }, function (err) {
            err.should.instanceOf(StatusedError);
            err.statusCode.should.equal(RestStatusCodes.Forbidden);
            return;
          });
      });
  });
});





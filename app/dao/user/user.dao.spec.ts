/**
 * Created by Franz on 5/14/2016.
 */

import should = require('should');
import {UserDAO} from './user.dao';
import {IUser} from './../../shapes/IUser';
import mongoPool = require('bsh-mongo-pool');
import Q = require('q');
import {Db} from 'mongodb';
import {config} from './../../config/config';

let userDAO = new UserDAO();

before(function (done) {
  mongoPool.init(config.env.mongoURI, {})
    .then(function (db:Db) {
      done();
    }, function (err) {
      done();
    });
});

describe('Get User Tests', function() {
  it('should get user by login', function () {
    return userDAO.getUserByCredential({username: 'dzemen05@gmail.com', password:'Ohanzee1!'},'security')
      .then(function(user:IUser) {
        should.exist(user);
        (user.username).should.equal('dzemen05@gmail.com');
        return true;
      });
  });
  it('should not get user by login', function () {
    return userDAO.getUserByCredential({username: 'dzemen05@gmail.com', password:'Ohanzee1!'},'viteedo1')
      .then(function(user:IUser) {
        should.not.exist(user);
        return true;
      });
  });
});





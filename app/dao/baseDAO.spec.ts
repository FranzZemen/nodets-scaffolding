/**
 * Created by Franz on 5/21/2016.
 */
import should = require('should');
import mongoPool = require('bsh-mongo-pool');
import Q = require('q');
import {Db} from 'mongodb';
import {BaseDAO} from "./baseDAO";

interface IDummy {
  myKey: string;
  dummy: string;
}

var baseDAO: BaseDAO<IDummy>;

before(function(done) {
  mongoPool.init('mongodb://localhost/bsh-test', {})
    .then(function (db:Db) {
      db.collection('baseDAOTest')
        .insertOne({myKey:'someKey',dummy:'Some Dummy'})
        .then(function(result) {
          if (result.insertedCount != 1) {
            console.error('Cannot insert a record for testing');
            done();
          }
          done();
        }, function (err) {
          console.error(err);
          done();
        })
    })
});


after(function (done) {
  mongoPool.db()
    .collection('baseDAOTest')
    .deleteOne({myKey:'someKey'})
    .then(function (result) {
      if (result.deletedCount != 1) {
        console.error('Cannot delete a record for testing');
        done();
      }
      done();
    }, function (err){
      console.error(err);
      done();
    })
});

describe('Test BaseDAO', function() {
  it ('should find user by primary key', function () {
    baseDAO = new BaseDAO<IDummy>('baseDAOTest','myKey');
    return baseDAO.findByPrimaryKey('someKey')
      .then(function (myDummy: IDummy) {
        should.exist(myDummy);
        should.exist(myDummy.dummy);
        myDummy.dummy.should.equal('Some Dummy');
        return true;
      });
  });
});
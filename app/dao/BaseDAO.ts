/**
 * Created by Franz on 5/21/2016.
 */

import mongoPool = require('bsh-mongo-pool');
import Q = require('q');
import bunyan = require('bunyan');
import {MongoError} from "~bsh-typings~mongodb/mongodb";
import {IBaseDAO} from "./iBaseDAO";

export class BaseDAO<T> implements IBaseDAO<T> {
  protected logOptions;
  protected log;
  
  constructor(protected collection:string, protected primaryKeyField: string) {
    this.logOptions = {name: collection + '.dao', level:'info'};
    this.log = bunyan.createLogger(this.logOptions);
  }

  findByPrimaryKey(key:string) : Q.Promise<T> {
    let self = this;
    let deferred = Q.defer<T>();
    let query = {};
    query[this.primaryKeyField] = key;
    mongoPool.db()
      .collection(this.collection)
      .find(query)
      .limit(1)
      .next()
      .then(function (i) {
        if(self.logOptions.level === 'trace') {
          self.log.trace({primaryKey: key, result:i}, 'findByPrimaryKey');
        }
        deferred.resolve(i);
      }, function (err: MongoError) {
        self.log.error(err);
        deferred.reject('findByPrimaryKey failed to be found');
      });
    return deferred.promise;
  }
  
}
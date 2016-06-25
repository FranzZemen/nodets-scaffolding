/**
 * Created by Franz on 5/14/2016.
 */
import mongoPool = require('bsh-mongo-pool');
import Q = require('q');
import bunyan = require('bunyan');
import {MongoError} from 'mongodb';
import {IUserDAO} from './iuser.dao.ts';
import {BaseDAO} from "../BaseDAO";
import {IUser} from "../../shapes/IUser";
import {ILoginCredential} from "../../security/ILoginCredential";

let logOptions = {name:'user.dao', level:'info'};
let log = bunyan.createLogger(logOptions);

export class UserDAO extends BaseDAO<IUser> implements IUserDAO {
  constructor() {
    super('users','bid');
  }

  getUserByCredential(credential:ILoginCredential, appContext:string):Q.Promise<IUser> {
    var self = this;
    var deferred = Q.defer<IUser>();
    mongoPool.db().collection(self.collection)
      .find(
        {username: credential.username, password: credential.password, appContexts: { $elemMatch: {$eq: appContext}}},
        {password: 0, appContexts: 0})
      .limit(1)
      .next()
      .then(function (user:IUser) {
        if(logOptions.level === 'trace') {
          log.trace({credential:credential,user:user},'getUserByCredential');
        }
        deferred.resolve(user);
      }, function (err: MongoError) {
        log.error(err);
        deferred.reject('User failed to be found');
      });
    return deferred.promise;
  }
}

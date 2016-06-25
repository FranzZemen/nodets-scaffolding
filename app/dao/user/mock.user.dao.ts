/**
 * Created by Franz on 5/13/2016.
 * 
 * For use with unit tests from higher level classes.  Provide to the injector in those tests.
 */

import Q = require('q');
import {ILoginCredential} from '../../security/ILoginCredential';
import {RestStatusCodes} from '../../util/restStatusCodes';
import {StatusedError} from '../../util/StatusedError';
import {IUser} from '../../shapes/IUser';
import {IUserDAO} from './iuser.dao.ts';
import {BaseDAO} from "../BaseDAO";

export class MockUserDAO extends BaseDAO<IUser> implements IUserDAO {
  constructor() {
    super('users','bid');
  }

  getUserByCredential(credential:ILoginCredential, appContext:string):Q.Promise<IUser> {
    try {
      console.log('In getUserByCredentials');
      let deferred = Q.defer<IUser>();
      if (!credential || !credential.username || !credential.password || !appContext) {
        deferred.reject(new StatusedError(RestStatusCodes.BadData, 'Bad Data'));
      } else if (credential.username === 'dzemen05@gmail.com' && credential.password === 'Ohanzee1!' && appContext === 'security') {
        deferred.resolve(
          {
            _id: '5737105fea78e88fb264a619',
            username: 'dzemen05@gmail.com',
            email: 'dzemen05@gmail.com',
            insertDate: 1463226807167,
            updateDate: 1463226807167,
            roles: ['admin'],
            org: {name: 'artmonkey.gallery'}
          }
        )
      } else {
        deferred.resolve(null);
      }
      return deferred.promise;
    } catch (err) {
      console.log(err);
    }
  }
}


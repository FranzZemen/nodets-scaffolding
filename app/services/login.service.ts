/**
 * Created by Franz on 5/13/2016.
 */
import Q = require('q');
import bunyan = require('bunyan');
import {IUser} from 'bsh-shared/model';
import {ILoginCredential, Session} from 'bsh-shared/security';
import {createToken,checkToken,deleteToken} from 'bsh-token';
import {RestStatusCodes,StatusedError} from 'bsh-shared/util';
import {IUserDAO} from '../dao/user/iuser.dao';
import {USER_DAO_INJECTION_KEY} from "../util/injectionConstants";
import {inject} from './../injection/inject';

let logOptions = {name:'login.service', level:'info'};
let log = bunyan.createLogger(logOptions);

export class LoginService {
  @inject(USER_DAO_INJECTION_KEY)
  userDAO: IUserDAO;
  constructor () {}
  login(token:string, appContext:string, credential:ILoginCredential) : Q.Promise<Session> {
    var self = this;
    var deferred = Q.defer<Session>();
    let loggedInUser:IUser;
    checkToken(token)
      .then(function(tokenBack) {
        if(tokenBack === null) {
          let msg = 'Invalid or expired unauthenticated token...controller should have blocked this';
          log.error(msg);
          deferred.reject(new StatusedError(RestStatusCodes.Expired,msg));
        } else {
          log.trace('Token checked');
          log.trace('userDAO: ' + self.userDAO ? 'exists' : 'undefined');
          return self.userDAO.getUserByCredential(credential, appContext)
        }
      })
      .then(function(user:IUser) {
        if (user == null) {
          log.trace('Forbidden: ' + credential.username);
          deferred.reject(new StatusedError(RestStatusCodes.Forbidden));
        } else {
          log.trace('User found with credential');
          loggedInUser = user;
          return createToken(appContext, user.username, user.roles);
        }
      })
      .then(function(authenticatedToken) {
        if (authenticatedToken) {
          deleteToken(token); // Don't care for result.
          let session = new Session(loggedInUser,authenticatedToken);
          deferred.resolve(session);
          return true;
        } else {
          deferred.reject(new StatusedError(RestStatusCodes.ServerError, 'null authenticated token'));
        }
      });
    return deferred.promise;
  }
}

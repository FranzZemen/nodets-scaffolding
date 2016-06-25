/**
 * Created by Franz on 4/30/2016.
 */
import bunyan = require ('bunyan');
import {Request} from 'express';
import {Response} from 'express';
import {createToken} from 'bsh-token';
import {RestStatusCodes} from './../util/restStatusCodes';
import {StatusedError} from './../util/StatusedError';
import {ALPHANUMERIC_REGEX, TOKEN_REGEX} from './../util/rejex';
import {LoginService} from '../services/login.service';
import {inject} from '../injection/inject';
import {LOGIN_SERVICE_INJECTION_KEY} from '../util/injectionConstants';
import {globalInjector} from '../injections';
import {LoginCredential} from "../security/LoginCredential";
import {Session} from "../security/Session";

let log = bunyan.createLogger({name:'security.controller', level:'trace'});

export class SecurityController {
  @inject(LOGIN_SERVICE_INJECTION_KEY)
  loginService:LoginService;
  unauthenticatedToken(req:Request, res:Response) {
    let appContext:string = req.params.context;
    // Don't allow no contexts even though we could support it.  Caller should know the context.
    if (appContext && ALPHANUMERIC_REGEX.test(appContext)) {
      log.trace('unauthenticatedToken for context ' + appContext);
      createToken(appContext)
        .then(function (token) {
          log.trace('unauthenticatedToken for context ' + appContext + ' results in token ' + token);
          res.status(RestStatusCodes.Success).send({token: token});
        }, function (err) {
          log.error(err);
          res.status(RestStatusCodes.ServerError).send('Server Error');
        });
    } else {
      log.trace('unauthenticatedToken doesn"t have a context');
      res.status(RestStatusCodes.BadData).send('No context');
    }
  }

  /**
   * Caller requests an authenticated token, passing in a valid unauthenticated token and credentials.
   * This is essentially the login function.
   * @param req
   * @param res
   */
 authenticatedToken(req:Request, res:Response) {

    let appContext:string = req.params.context;
    let token:string = req.body.token;

    let credential:LoginCredential = new LoginCredential(req.body.credential);

    if (ALPHANUMERIC_REGEX.test(appContext) && TOKEN_REGEX.test(token) && credential.validate()) {
      this.loginService.login(token,appContext,credential)
        .then(function(session:Session) {
          res.status(RestStatusCodes.Success).send(session);
        }, function(err) {
          log.error(err);
          if (err instanceof StatusedError) {
            res.status(err.statusCode).send('Error');
          }
        })
    } else {
      log.trace('unauthenticatedToken doesn"t have a context');
      res.status(RestStatusCodes.BadData).send('Invalid data');
    }

    // Don't allow no contexts even though we could support it.  Caller should know the context.
    /*
    if (appContext) {
      log.trace('authenticatedToken for context ' + appContext);
      ///checkToken()
      createToken(appContext)
        .then(function (token) {
          log.trace('unauthenticatedToken for context ' + appContext + ' results in token ' + token);
          res.status(200).send({token: token});
        }, function (err) {
          log.error(err);
        });
    } else {
      log.trace('unauthenticatedToken doesn"t have a context');
      res.status(400).send('Invalid');
    }*/
  }
}

let securityController = globalInjector.instantiate(SecurityController);

export function unauthenticatedToken(req:Request, res:Response) {
  securityController.unauthenticatedToken(req,res);
}
export function authenticatedToken(req:Request, res:Response){
  securityController.authenticatedToken(req,res);
}
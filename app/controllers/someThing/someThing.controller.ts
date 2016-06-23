/**
 * Created by Franz on 5/28/2016.
 */

import {Request} from 'express';
import {Response} from 'express';
import {checkToken} from 'bsh-token';
import {LoginCredential,Session} from 'bsh-shared/security';
import {RestStatusCodes, StatusedError, ALPHANUMERIC_REGEX, TOKEN_REGEX} from 'bsh-shared/util';
import {getRole,RoleEnum} from 'bsh-shared/security';
import bunyan = require ('bunyan');
import {inject} from '../../injection/inject';
import {LOGIN_SERVICE_INJECTION_KEY} from '../../util/injectionConstants';
import {globalInjector} from '../../injections';
import {EventTemplate} from 'bsh-shared/model';

let log = bunyan.createLogger({name:'eventTemplates.controller', level:'trace'});

export class SomeThingController {

  listSomeThings(req:Request, res:Response) {
  }

  saveSomeThing(req:Request, res:Response) {
    log.debug('Start someThing');
    let appContext:string = req.params.context;
    let token:string = req.body.token;
    let pullList:string = req.body.pullList;
    if (ALPHANUMERIC_REGEX.test(appContext) && TOKEN_REGEX.test(token)) {
      checkToken(token, getRole(RoleEnum.Admin),true)
        .then(function (found) {
          if (found) {
            let eventTemplate:EventTemplate = req.body.eventTemplate;
            log.debug({appContext: appContext, token: token, eventTemplate: eventTemplate}, 'someThing');
            res.status(RestStatusCodes.Success).send('Ok');
          } else {
            log.debug({appContext: appContext, token: token}, 'unauthorized someThing');
            res.status(RestStatusCodes.Unauthorized).send('Unauthorized');
          }
        }, function(err) {
          log.error(err);
          if (err instanceof StatusedError) {
            res.status(err.statusCode).send('Error');
          } else {
            res.status(RestStatusCodes.ServerError).send('Server Error');
          }
        })
    }
  }


  /**
   * Caller requests an authenticated token, passing in a valid unauthenticated token and credentials.
   * This is essentially the login function.
   * @param req
   * @param res
   */
  /*
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
  }*/
}

let someThingsController = globalInjector.instantiate(SomeThingController);

export function listSomeThings(req:Request, res:Response) {
  someThingsController.listSomeThings(req,res);
}
export function saveEventTemplate(req:Request, res:Response){
  someThingsController.saveSomeThing(req,res);
}
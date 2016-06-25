/**
 * Created by Franz on 5/28/2016.
 */


import {Request} from 'express';
import {Response} from 'express';
import {inject} from '../../injection/inject';
import {globalInjector} from '../../injections';
import {ALPHANUMERIC_REGEX} from "../../util/rejex";
import {TOKEN_REGEX} from "../../util/rejex";
import {config} from '../../config/config';
import {RestStatusCodes} from "../../util/restStatusCodes";
import {StatusedError} from "../../util/StatusedError";
import {SOMETHING_SERVICE_INJECTION_KEY} from "../../util/injectionConstants";
import {SomeThingService} from "../../services/someThing.service";

let log = config.getConfiguredLog('someThing.controller');

export class SomeThingController {

  @inject(SOMETHING_SERVICE_INJECTION_KEY)
  somethingService:SomeThingService;

  getSomething(req:Request, res:Response)  {
    log.debug('getSomething');
    this.somethingService.getSomethig()
    .then(function (something) {
      res.status(200).send({something:something});
    }, function (err) {
      res.status(500).send(err.message);
    });
  }
}
let someThingsController = globalInjector.instantiate(SomeThingController);

export function getSomething(req:Request, res:Response) {
  someThingsController.getSomething(req,res);
}
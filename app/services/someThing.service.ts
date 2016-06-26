/**
 * Created by franzzemen on 6/25/16.
 */
import Q = require('q');
import {Client} from 'node-rest-client';
import {config} from '../config/config';
import defer = Q.defer;

let log = config.getConfiguredLog('someThing.service');


export class SomeThingService {
  constructor() {}

  getSomethig() : Q.Promise<string> {
    let deferred = Q.defer<string>();
    let client = new Client();
    client.on('error', function (err) {
      log.error(err);
      deferred.reject(err);
    });
    client.get('http://localhost:9090/something', function (data, response) {
      log.debug({data:data});
      deferred.resolve(data);
    }).on('error', function (err) {
      log.error(err);
      deferred.reject(err);
    });
    return deferred.promise;
  }
}
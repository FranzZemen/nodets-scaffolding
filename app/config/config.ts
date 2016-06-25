/**
 * Created by franzzemen on 6/25/16.
 *
 * Root configuration.
 *
 * Environment specific configurations are determined as follows:
 *
 * If NODE_ENV is set in the environment, then env/[NODE_ENV].json is merged in.  For example if NODE_ENV=production,
 * then env/production.json is merged in.  If NODE_ENV is NOT set, then dev/dev.json is merged in.  Note that dev.json
 * is NOT kept in git, only dev.sample.json.  Each developer should setup their own dev.json.  In this way we can create new
 * target environments only needing to create a new configuration in the env subfolder.
 *
 * You only need to specify overrides for this root configuration, following the identical hierarchy.
 *
 * IF NO match is found in the env folder, than the defaults in this class are used (configEnv).
 */

import fs = require('fs');
import bunyan = require('bunyan');
import {Logger} from 'bunyan';
import path = require('path');
import _ = require('lodash')


class Config {
  private log:Logger;
  private loggers = [];
  env = {
    port: 9000,
    mongoURI : 'mongodb://localhost/dev',
    log: {
      defaut: {
        name: 'willBeReplacedByFramwork',
        level:'info'
      },
      overrides: [
        {
          name: 'Config',
          level: 'debug'
        }
      ]
    },
    rest: {
      restServer:'',
      services: {

      }
    }
  };

  constructor(envName?:string) {
    let localEnvConfig;
    if (!envName) {
      envName = process.env['NODE_ENV'];
      if (!envName) {
        envName = 'dev';
      }
    }
    if (envName) {
      try {
        localEnvConfig = fs.readFileSync('./app/config/env/' + envName + '.json', {encoding: 'utf8'});
      } catch (err) {
        console.log('Error reading environment file env/' + envName + 'json: ' + err.message);
        throw err;
      }
    }
    _.merge(this.env, localEnvConfig);
    this.log = this.getConfiguredLog('Config');
    this.log.debug({envConfig: this.env});
  }

  getConfiguredLog(context:string) :Logger {
    let configuredLog = _.find(this.loggers, {name:context});
    if (!configuredLog) {
      let bunyanConfig = _.find(this.env.log.overrides, {name:context});
      if (!bunyanConfig) {
        bunyanConfig = this.env.log.defaut;
        bunyanConfig.name = context;
      }
      configuredLog = {name:context, log:bunyan.createLogger(bunyanConfig)};
      this.loggers.push(configuredLog);
    }
    return configuredLog.log;
  }
}

let config = new Config();
export {config};
/**
 * Created by Franz on 4/30/2016.
 */
import bunyan = require('bunyan');
import express = require('express');
import {config} from './config/config';
import mongoPool = require('bsh-mongo-pool');
import {Db} from "mongodb";
import {Request} from 'express';
import {Response} from "express";
import {NextFunction} from "express";
import bodyParser = require('body-parser');
import bshToken = require('bsh-token');
import bshMongoToken = require('bsh-mongo-token');
import {registerGlobalInjections} from "./injections";
registerGlobalInjections();
// Must be imported AFTER injections are registered.
import topRouter from './routes/topRouter';

const log = config.getConfiguredLog('app');


mongoPool.init(config.env.mongoURI,{})
  .then(function(db:Db) {
    log.info('Successfully initialized mongo at ' + config.env.mongoURI);
  }, function (err) {
    log.error(err.message);
    process.exit(1);
  });
bshToken.implementation(bshMongoToken);


function logMiddleware(req:Request,res:Response, next:NextFunction) {
  log.info('Request: ' + req.originalUrl);
  next();
}



let app = express();
app.use(bodyParser.json());
app.use(logMiddleware);
app.use(topRouter);


app.listen(config.env.port,function () {
  log.info('Server started on ' + config.env.port);
});




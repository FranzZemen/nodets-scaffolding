/**
 * Created by Franz on 4/30/2016.
 */
import express = require('express');
import {Router} from "express";
import securityRouter from './securityRouter';
import someThingRouter from './someThingRouter';

let topRouter:Router = express.Router();

topRouter.use('/api/security', securityRouter);
topRouter.use('/api/something', someThingRouter);

export default topRouter;

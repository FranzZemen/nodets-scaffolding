/**
 * Created by Franz on 4/30/2016.
 */
import express = require('express');
import {Router} from 'express';
import {authenticatedToken,unauthenticatedToken} from './../controllers/security.controller';

let securityRouter:Router = express.Router();

securityRouter.get('/tokens/:context', unauthenticatedToken);
securityRouter.post('/tokens/:context', authenticatedToken);

export default securityRouter;

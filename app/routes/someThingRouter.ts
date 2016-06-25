/**
 * Created by Franz on 4/30/2016.
 */
import express = require('express');
import {Router} from 'express';
import {getSomething} from '../controllers/someThing/someThing.controller';

let someThing:Router = express.Router();

someThing.get('/', getSomething);

export default someThing;

/**
 * Created by Franz on 4/30/2016.
 */
import express = require('express');
import {Router} from 'express';
import {listSomeThings,saveEventTemplate} from '../controllers/someThing/someThing.controller';

let someThing:Router = express.Router();

someThing.get('/someThing/:context', listSomeThings);
someThing.post('/someThing/:context', saveEventTemplate);

export default someThing;

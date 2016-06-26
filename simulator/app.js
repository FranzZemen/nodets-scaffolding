
var log = require('bunyan').createLogger({name:'simulator', level:'info'});
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());

var port = 9090;

app.get('/something', function (req, res) {
  res.set('Content-Type','application/json');
  res.status(200).send({message:'Hello World!!!'});
});

app.listen(port,function () {
  log.info('Simulator started on ' + port);
});




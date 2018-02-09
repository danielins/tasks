var express = require('express'),
    path = require('path'),
    load = require('express-load'),
    routes = require('../app/routes'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator');

module.exports = () => {

  var app = express();

  app.set('clientPath', path.join(__dirname, '../..', 'client'));

  app.use( express.static(app.get('clientPath')) );

  app.use(bodyParser.json());

  app.use(expressValidator());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Acesss-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  routes(app);

  return app;

};

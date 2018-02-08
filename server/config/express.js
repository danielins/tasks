var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator');


module.exports = () => {

  var app = express();

  app.use( express.static('./app/public') );

  app.set('view engine', 'ejs');

  app.set('views', './app/views');

  app.use(bodyParser.urlenconded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());

  load('routes', {cwd: 'app'}).then('data').into(app);

  app.use((req, res, next) => {
    res.status(404).render('erros/404');
    next();
  });

  app.use((erro, req, res, next) => {
    if ( process.env.NODE_ENV === 'production' ){
      res.status(404).render('erros/500');
      return false;
    }
    next(erro);
  });

  return app;

};

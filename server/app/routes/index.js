var api = require('../api');

module.exports = (app) => {

  app.get('/', function(req, res){
    api.allTasks(req, res);
  });

  app.get('/tasks', function(req, res){
    api.allTasks(req, res);
  });

  app.get('/tasks/:id', (req, res) => {
  	let id = req.params.id;
  	api.getTask(id, req, res);
  });

}
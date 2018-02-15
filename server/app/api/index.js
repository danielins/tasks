var dbConnection = require('../data/dbConnection');
var tasksClass = require('../data/tasks');
var api = {};

api.allTasks = (req, res) => {

  const connection = dbConnection();

  const tasks = new tasksClass(connection);

  tasks.allTasks((err, results, fields) => {
    res.json(results);
  });

  connection.end();

}

api.getTask = (id, req, res) => {

  const connection = dbConnection();

  const tasks = new tasksClass(connection);

  tasks.getTask(id, (err, results, fields) => {
    res.json(results);
  });

  connection.end();

}


module.exports = api;
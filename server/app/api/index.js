var api = {};


api.tasks = (req, res) => {

  const connection = app.data.dbConnection();

  const tasks = new app.data.tasks(connection);

  tasks.show((err, results, fields) => {
    console.log(results);
    res.json(results);
  });

  connection.end();

}


module.exports = api;

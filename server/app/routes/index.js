module.exports = (app) => {

  app.get('/tasks', (req, res, next) => {

    const conn = app.data.dbConnection();

    const tasks = new app.data.tasks(conn);

    tasks.show((error, results) => {

      if ( error ) {
        return next(error);
      }

      res.format({
        json: function(){
          res.json(results);
        }
      });

    });

    conn.end();

  });

}

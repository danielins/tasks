var SQL = require('mysql');


function createDBConnection(){

  /**
  if ( prcess.env.NODE_ENV === 'test' ) {
    return SQL.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'daniel',
      database: 'tasks_test'
    });
  }
  */

  return SQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'daniel',
    database: 'tasks'
  });

}

module.exports = function(){
  return createDBConnection;
}

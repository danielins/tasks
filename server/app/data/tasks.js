function TasksBase(connection){
  this._connection = connection;
}

TasksBase.prototype.show = callback => {
  this._connection.query('select * from tasks', callback);
}

TasksBase.prototype.save = (newTask, callback) => {
  this._connection.query('insert into tasks set ?', newTask, callback);
}

module.exports = function(){
  return TasksBase;
}

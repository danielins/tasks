class TasksBase {

	constructor(connection){
		this._connection = connection;
	}

	allTasks(callback){
		this._connection.query('select * from tasks', callback);
	}

	getTask(taskId, callback){
		this._connection.query(`select * from tasks where id = ${taskId}`, callback);
	}

	save(newTask, callback){
		this._connection.query('insert into tasks set ?', newTask, callback);
	}

}

module.exports = TasksBase;
class TasksBase {

	constructor(connection){
		this._connection = connection;
	}

	allTasks(callback){
		this._connection.query(`
			select
				t.*,
				c.name as clientName,
				p.name as projectName
			from
				tasks t
			inner join
				clients c on t.client = c.id
			left join
				projects p on t.project = p.id
			`, callback);
	}

	getTask(taskId, callback){
		this._connection.query(`select * from tasks where id = ${taskId}`, callback);
	}

	save(newTask, callback){
		this._connection.query('insert into tasks set ?', newTask, callback);
	}

}

module.exports = TasksBase;
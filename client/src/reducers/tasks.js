import * as Types from '../actions/actionTypes';

const initialTasks = [];

export const tasks = (state = initialTasks, action) => {

	const {
		type,
		tasks
	} = action;

	switch ( type ) {

		case Types.ADD_TASKS:

			let newTaskState = state.slice();

			tasks.forEach(task => {
				const exists = state.find(foundTask => foundTask.id === task.id) ? true : false;
				if ( !exists && !task.deleted ){
					newTaskState.push(task);
				}
			});

			return newTaskState;

		default:
			return state;

	}

}
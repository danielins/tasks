import * as Types from './actionTypes';
import * as API from '../utils/API';

export const addTasks = tasks => ({
	type: Types.ADD_TASKS,
	tasks
});

export function fetchTasks(dispatch){
	API.getTasks()
	.then((tasks) => dispatch( addTasks(tasks) ));
}
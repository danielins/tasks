import * as Types from '../actions/actionTypes';

const initialTasks = [];

export const tasks = (state = initialTasks, action) => {

	switch(action.type) {

		case Types.ADD_TASKS:
			return state.concat( action.tasks );

		default:
			return state;

	}

}
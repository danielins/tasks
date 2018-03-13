import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTasks } from '../../actions';

import { getFormattedDate } from '../../utils/DateHelper';

class TaskTable extends Component {

	constructor(props){

		super(props);

		/**
		 * Initial state of the component
		 * loading {Boolean} true if the data hasn't been fetched yet.
		 * tasks {Array of Objects} the data of the component. each object is a task.
		 */
		this.state = {
			loading: true,
			orderBy: 'dataFinal',
			filterBy: [],
			filterValue: '',
			tasks: []
		}

	}

	componentDidMount() {

		this.props.fetchTasks();

	}

	componentWillReceiveProps(newProps){

		// When the props with the tasks data will be set,
		// updates the loading flag state also
		this.setState({ tasks: newProps.tasks, loading: false });

	}


	filterBy(column){

		this.setState((prevState) => {

			prevState.filterBy.push(column);

			return {
				filterBy: prevState.filterBy
			}
		});

	}


	render(){

		const { tasks, loading, filterBy } = this.state;

		// if it still loading (waiting to fetch the tasks data)
		// shows loading component instead
		if ( loading ) {
			return <div>Loading tasks...</div>
		}

		if ( tasks.length ) {
			return (
					<div>
					{(() => {
						if ( filterBy.length ) {
							return <p>Filtrando por: { filterBy.join(',') }</p>;
						}
					})()}
					<table>
						<thead>
							<tr>
								<th>
									OS
								</th>
								<th>
									Task
									<input type="text" id="filter_task" placeholder="Filter by Task Name" onChange={ () => this.filterBy('task') } />
								</th>
								<th>
									Client
								</th>
								<th>
									Project
								</th>
								<th>
									Done by
								</th>
								<th title="DD/MM/YYYY">
									Start Date
								</th>
								<th>
									Conclusion Date
								</th>
							</tr>
						</thead>
						<tbody>
							{
								tasks.map(task =>
									<tr key={ task.id }>
										<td>{ task.id }</td>
										<td>{ task.task }</td>
										<td>{ task.clientName }</td>
										<td>{ task.projectName }</td>
										<td>{ task.userName }</td>
										<td>{ getFormattedDate(task.dataInicio) }</td>
										<td>{ getFormattedDate(task.dataFim) }</td>
									</tr>
								)
							}
						</tbody>
					</table>
					</div>
			)
		} else {
			return (
				// if not
				<table>
					<tbody>
						<tr>
							<td>
								No active tasks.
							</td>
						</tr>
					</tbody>
				</table>
			)
		}

	} // render()

}


function mapStateToProps({tasks}){
  return {
    tasks
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchTasks: () => fetchTasks(dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
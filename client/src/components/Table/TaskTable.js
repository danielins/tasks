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
			sortBy: 'id',
			filterBy: [],
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


	addFilter(column){

		this.setState((prevState) => {

			let $field = document.querySelector(`#filter_${column}`);

			// checks the value of the filter
			if ( $field.value !== "" ) {

				// adds the column name to the array of filtered columns if isn't there
				if ( prevState.filterBy.findIndex(x => x === column) < 0 ) {
					prevState.filterBy.push(column);
				}

			// if the are no filter, removes the column of the array
			} else {

				let index = prevState.filterBy.indexOf(column);

				if ( index > -1 ) {
					prevState.filterBy.splice(index, 1);
				}

			}

			return {
				filterBy: prevState.filterBy
			}
		});

	}


	filterTasks(tasks){

		const filters = this.state.filterBy;

		if ( filters.length === 0 ) return tasks;

		function filterByColumn(task){

			// must become true for the task to be removed from the list
			let filtered = false;

			filters.forEach(filter => {

				let $field = document.querySelector(`#filter_${filter}`);

				if ( task[filter] ) {
					if ( task[filter].toString().toLowerCase().indexOf( $field.value.toLowerCase() ) !== -1 ) {
						filtered = true;
					}
				}

			});

			return filtered;

		}

		return tasks.filter(filterByColumn);

	}


	sortTasks(tasks, propSort = this.state.sortBy, asc = true){

		return tasks.sort((a, b) => {
			if ( a[propSort] === null ) {
				return 1;
			}
			if ( b[propSort] === null ) {
				return -1;
			}
			if ( a[propSort] < b[propSort] ){
				return -1;
			}
			if ( a[propSort] > b[propSort] ){
				return 1;
			}
			return 0;
		});

	}


	render(){

		const { tasks, loading, filterBy } = this.state;

		// if it still loading (waiting to fetch the tasks data)
		// shows loading component instead
		if ( loading ) {
			return <div>Loading tasks...</div>
		}

		const filteredTasks = this.sortTasks(this.filterTasks(tasks));

		if ( tasks.length ) {
			return (
					<div>
					{(() => {
						if ( filterBy.length ) {
							return <p>Filtrando por: { filterBy.join(', ') }</p>;
						}
					})()}
					<table>
						<thead>
							<tr>
								<th onClick={ () => { this.setState({sortBy: 'id'})} }>
									OS<br/>
									<input type="text" id="filter_id" placeholder="Filter by OS" onChange={ () => this.addFilter('id') } />
								</th>
								<th onClick={ () => { this.setState({sortBy: 'task'})} }>
									Task<br/>
									<input type="text" id="filter_task" placeholder="Filter by Task Name" onChange={ () => this.addFilter('task') } />
								</th>
								<th onClick={ () => { this.setState({sortBy: 'clientName'})} }>
									Client<br/>
									<input type="text" id="filter_clientName" placeholder="Filter by Client Name" onChange={ () => this.addFilter('clientName') } />
								</th>
								<th onClick={ () => { this.setState({sortBy: 'projectName'})} }>
									Project<br/>
									<input type="text" id="filter_projectName" placeholder="Filter by Project Name" onChange={ () => this.addFilter('projectName') } />
								</th>
								<th onClick={ () => { this.setState({sortBy: 'userName'})} }>
									Done by<br/>
									<input type="text" id="filter_userName" placeholder="Filter by User Name" onChange={ () => this.addFilter('userName') } />
								</th>
								<th title="DD/MM/YYYY" onClick={ () => { this.setState({sortBy: 'dataInicio'})} }>
									Start Date<br/>
									<input type="text" id="filter_dataInicio" placeholder="Filter by Start Date" onChange={ () => this.addFilter('dataInicio') } />
								</th>
								<th onClick={ () => { this.setState({sortBy: 'dataFim'})} }>
									Conclusion Date<br/>
									<input type="text" id="filter_dataFim" placeholder="Filter by Conclusion Date" onChange={ () => this.addFilter('dataFim') } />
								</th>
							</tr>
						</thead>
						<tbody>
							{
								filteredTasks.map(task =>
									<tr key={ task.id }>
										<td align="center">{ task.id }</td>
										<td>{ task.task }</td>
										<td align="center">{ task.clientName }</td>
										<td align="center">{ task.projectName }</td>
										<td align="center">{ task.userName }</td>
										<td align="center">{ getFormattedDate(task.dataInicio) }</td>
										<td align="center">{ getFormattedDate(task.dataFim) }</td>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTasks } from '../../actions';

class TaskTable extends Component {

	constructor(props){

		super(props);

		this.state = {
			orderBy: 'dataFinal',
			tasks: []
		}

	}

	componentDidMount() {

		this.props.fetchTasks();

	}

	componentWillReceiveProps(newProps){

		this.setState({ tasks: newProps.tasks });

	}


	render(){

		const { tasks } = this.state;

		if ( tasks.length ) {
			return (
					<table>
						<thead>
							<tr>
								<th>
									OS
								</th>
								<th>
									Tarefa
								</th>
								<th>
									Cliente
								</th>
								<th>
									Projeto
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
									</tr>
								)
							}
						</tbody>
					</table>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTasks } from './actions';

class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      orderBy: 'dataFinal',
      tasks: []
    }

  }

  componentDidMount() { this.props.fetchTasks(); }

  componentWillReceiveProps(newProps){ this.setState({ tasks: newProps.tasks }); }

  render() {

    const { tasks } = this.state;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Tarefa
              </th>
              <th>
                Cliente
              </th>
            </tr>
          </thead>
          <tbody>
            { tasks.length
              ?
                tasks.map(task => 
                  <tr key={ task.id }>
                    <td>{ task.task }</td>
                    <td>{ task.client }</td>
                  </tr>
                )
              : 
              <tr>
                <td colSpan="2">No active tasks.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    );
 
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

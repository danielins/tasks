import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskTable from '../Table/TaskTable';

class Index extends Component {

  render() {

    return (
      <div>
        <TaskTable />
      </div>
    );
 
  } // render()

}

function mapStateToProps({tasks}){
  return {
    tasks
  }
}

export default connect(mapStateToProps)(Index);
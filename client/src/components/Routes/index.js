import React, { Component } from 'react';
import { Route } from 'react-router';

import Index from '../Index/';

export default class Routes extends Component{

	render() {

		return (
			<div>
				<Route exact path="/" component={Index} />
				<Route exact path="/help" component={Index} />
			</div>
		);

	}

}
// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// console.log("Importing children components...");
import Home from './home/home.js';
import Video from './video/video.js';
import History from './history/history.js';

// console.log("Importing presentational modules...");
import './client.css';

class Client extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/video/:id" component={Video} />
					<Route exact path="/history" component={History} />
				</Switch>
			</Router>
		);
	}
}
	
export default Client;

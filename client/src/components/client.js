// console.log("Importing fundamental modules...");
import React, { Component } from 'react';

// console.log("Importing children components...");
import Home from './home/home.js';

// console.log("Importing presentational modules...");
import './client.css';

class Client extends Component {
	render() {
		return (
			<div className="Client">
				<Home />
			</div>
		);
	}
}

export default Client;

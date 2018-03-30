// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
// console.log("Importing presentational modules...");
import Thumbnail from './thumbnail/thumbnail.js';
// import logo from '../logo.svg';
import './videoCarousel.css';

class Home extends Component {
	
	render() {
		return (
			<div className="video-carousel">
				<ul className="items">
					<Thumbnail />
				</ul>
			</div>
		);
	}
}

export default Home;

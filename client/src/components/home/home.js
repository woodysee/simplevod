// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import Header from '../header/header.js';
import VideoCarousel from './videoCarousel/videoCarousel.js';
// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './home.css';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<Header />
				<VideoCarousel />
			</div>
		);
	}
}

export default Home;

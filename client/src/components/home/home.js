// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import VideoCarousel from './videoCarousel/videoCarousel.js';
// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './home.css';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<div className="navbar">
					<ul className="links">
						<li className="link-wrapper">
							<Link className="link" to="/">Home</Link>
						</li>
						<li className="link-wrapper">
							<Link className="link" to="/history">History</Link>
						</li>
					</ul>
				</div>
				<VideoCarousel />
			</div>
		);
	}
}

export default Home;

// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { Link } from "react-router-dom";
// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './header.css';

class Header extends Component {
	render() {
		return (
			<div className="Header">
				<div className="navbar">
					<div className="left-side">
						<Link className="title" to="/">Home</Link>
					</div>
					<ul className="right-side">
						<li className="link-wrapper">
							<Link className="link" to="/history">History</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Header;

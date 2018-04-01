// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './header.css';

class Header extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			page: this.props.page
		}
	}
	
	render() {
		
		const currentPage = 'video';
		
		const renderHeaderLinks = (page, block) => {
			switch (page) {
				case 'home':
					if (block === 'leftSide') {
						return (
							<Link className="title" to="/">
								Home
							</Link>
						)
					} else if (block === 'rightSide') {
						return (
							<Link className="link" to="/history">
								History
							</Link>
						)
					}
					break;
				case 'video':
					if (block === 'leftSide') {
						return (
							<Link className="back" to="/">
								Back
							</Link>
						)
					}
					break;
				default:
			}
		};
		
		return (
			<div className="Header">
				<div className="navbar">
					<div className="left-side">
						{ renderHeaderLinks(currentPage, 'leftSide') }
					</div>
					<ul className="right-side">
						<li className="link-wrapper">
							{ renderHeaderLinks(currentPage, 'rightSide') }
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// console.info("Getting state for props...")
	// console.info(state);
	return {
		header: state.header,
		home: state.home,
		video: state.video
	}
}
export default connect(mapStateToProps)(Header);

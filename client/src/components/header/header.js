// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// console.log("Importing Redux action-creators and thunks...");
import { setCurrentPage } from '../../actions/mainActions';

// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './header.css';

const mapStateToProps = (state) => {
	// console.info("header: mapStateToProps()");
	// console.info(state.header);
	return state;
}

const mapDispatchToProps = (dispatch) => {
	// console.info("Mapping dispatch for props...")
	// console.info(dispatch);
	return {
		setCurrentPage: (page) => { dispatch(setCurrentPage(page)) }
	}
}

class Header extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.header.currentPage
		}
	}
	
	setCurrentPage(page) {
		if (page !== this.props.header.currentPage) {
			this.props.setCurrentPage(page)
		}
	}
	
	render() {
		// console.log("render()");
		const currentPage = this.state.currentPage;
		// console.log(currentPage);
		const renderHeaderLinks = (page, block) => {
			switch (page) {
				case 'home':
					if (block === 'leftSide') {
						return (
							<Link className="title" to="/" onClick={ () => { this.setCurrentPage('home') } } >
								Home
							</Link>
						)
					} else if (block === 'rightSide') {
						return (
							<Link className="link" to="/history" onClick={ () => { this.setCurrentPage('history') } }>
								History
							</Link>
						)
					}
					break;
				case 'video':
					if (block === 'leftSide') {
						return (
							<Link className="back" to="/" onClick={ () => { this.setCurrentPage('home') } }>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';

// console.log("Importing Redux action-creators and thunks...");
import { setCurrentPage } from '../../actions/mainActions';

// console.log("Importing children components...");
import Header from '../header/header.js';

// console.log("Importing presentational modules...");
import './history.css';

const mapStateToProps = (state) => {
	// console.info("history: mapStateToProps()");
	// console.info(state.header);
	return state;
}

const mapDispatchToProps = (dispatch) => {
	// console.info("history: mapDispatchToProps()...")
	// console.info(dispatch);
	return {
		setCurrentPage: (page) => { dispatch(setCurrentPage(page)) }
	}
}

class History extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.header.currentPage
		}
	};
	
	setCurrentPage(page) {
		if (page !== this.props.header.currentPage) {
			this.props.setCurrentPage(page);
		}
	}
	
	render() {
		this.setCurrentPage('history'); // Initialise page state on load
		return (
			<div className="History">
				<Header />
				<ul className="watched-videos">
					<li className="watched-video">
						Video 1
					</li>
					<li className="watched-video">
						Video 2
					</li>
				</ul>
			</div>
		);
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(History);

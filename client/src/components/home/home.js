// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';

// console.log("Importing Redux action-creators and thunks...");
import { setCurrentPage } from '../../actions/mainActions';

// console.log("Importing children components...");
import Header from '../header/header.js';
import VideoCarousel from './videoCarousel/videoCarousel.js';

// console.log("Importing presentational modules...");
import './home.css';

const mapStateToProps = (state) => {
	// console.info("home: mapStateToProps()");
	// console.info(state.header);
	return state;
}

const mapDispatchToProps = (dispatch) => {
	// console.info("home: mapDispatchToProps()...")
	// console.info(dispatch);
	return {
		setCurrentPage: (page) => { dispatch(setCurrentPage(page)) }
	}
}

class Home extends Component {
	
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
		
		this.setCurrentPage('home'); // Initialise page state on load
		
		return (
			<div className="Home">
				<Header />
				<VideoCarousel />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

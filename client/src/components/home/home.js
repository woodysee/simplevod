// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';

// console.log("Importing Redux action-creators and thunks...");

// console.log("Importing children components...");
import Header from '../header/header.js';
import VideoCarousel from './videoCarousel/videoCarousel.js';

// console.log("Importing presentational modules...");
import './home.css';

const mapStateToProps = (state) => {
	// console.info("home: mapStateToProps()");
	// console.info(state);
	return state;
}

class Home extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			currentPage: this.props.header.currentPage
		}
	};
	
	componentDidMount() {
	}
	
	render() {
		return (
			<div className="Home">
				<Header />
				<VideoCarousel />
			</div>
		);
	}
}

export default connect(mapStateToProps)(Home);

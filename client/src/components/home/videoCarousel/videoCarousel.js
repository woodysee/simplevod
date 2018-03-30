// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
// console.log("Importing presentational modules...");
import Thumbnail from './thumbnail/thumbnail.js';
// import logo from '../logo.svg';
import './videoCarousel.css';

class Home extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		const initVideos = (videos) => {
			if (typeof videos === 'undefined' || videos.length === 0) {
				return (
					<span className="no-videos-loaded">No videos loaded</span>
				);
			} else {
				renderThumbnails(this.props.videos);
			}
		}
		
		const renderThumbnails = (videos) => {
			return videos.map((video) => {
				return (
					<Thumbnail videos={this.props.videos} />
				)
			});
		}
		
		return (
			<div className="video-carousel">
				<ul className="items">
					{ initVideos(this.props.videos) }
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// console.info("Getting state for props...")
	return {
		videos: state.videos
	}
}

export default connect(mapStateToProps)(Home);

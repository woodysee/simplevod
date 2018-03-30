// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
// console.log("Importing presentational modules...");
import Poster from './poster/poster.js';
// import logo from '../logo.svg';
import './videoCarousel.css';

class VideoCarousel extends Component {
	
	render() {
		// console.log(this.props.home.videos.entries);
		
		const listOfVideos = this.props.home.videos.entries;
		
		const initaliseVideos = (videos) => {
			const listOfVideosAreLoaded = typeof videos === 'undefined' || videos.length === 0;
			if (listOfVideosAreLoaded) {
				return (
					<ul className="items">
						<span className="no-videos-loaded">
							Loading videos...
						</span>
					</ul>
				)
			} else {
				return (
					<ul className="items">
						{ renderInitialThumbnails(videos) }
					</ul>
				)
			}
		}
		
		const renderInitialThumbnails = (videos) => {
			let i = 0;
			return videos.map((video) => {
				i++;
				while (i <= 10) {
					return (
						<Poster key={i} video={video} />
					)
				}
			});
		}

		return (
			<div className="video-carousel">
				{ initaliseVideos(listOfVideos) }
			</div>
		);
		
	}
	
}

const mapStateToProps = (state) => {
	// console.info("Getting state for props...")
	console.info(state);
	return {
		home: state.home
	}
}

export default connect(mapStateToProps)(VideoCarousel);

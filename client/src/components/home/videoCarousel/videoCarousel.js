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
		
		const initialisePosters = (posters) => {
			const thereArePostersToBeLoaded = typeof posters === 'undefined' || posters.length === 0;
			if (thereArePostersToBeLoaded) {
				return (
					<ul className="posters">
						<span className="no-videos-loaded">
							Loading videos...
						</span>
					</ul>
				)
			} else {
				return (
					<ul className="posters">
						{ renderInitialPosters(posters, 6) }
					</ul>
				)
			}
		}
		
		const renderInitialPosters = (posters, limit) => {
			let i = 0;
			return posters.map((poster) => {
				i++;
				while (i <= limit) {
					return (
						<Poster key={i} poster={poster} />
					)
				}
			});
		}

		return (
			<div className="video-carousel">
				{ initialisePosters(listOfVideos) }
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

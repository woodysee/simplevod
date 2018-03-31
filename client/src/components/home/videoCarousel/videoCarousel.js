// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
// console.log("Importing presentational modules...");
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowCircleLeft from '@fortawesome/fontawesome-free-solid/faArrowCircleLeft.js';
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight.js';

import Poster from './poster/poster.js';
// import logo from '../logo.svg';
import './videoCarousel.css';

class VideoCarousel extends Component {
	
	render() {
		
		const listOfVideos = this.props.home.videos.entries;
		
		const renderPosters = (posters, limit) => {
			if (typeof limit === 'undefined' || limit === 0) {
				limit = posters.length
			};
			return posters.map((poster) => {
				let i = 0;
				while (i < limit) {
					i++;
					return (
						<Poster key={i} poster={poster} />
					)
				}
				
			});
		}
		
		const initialisePosters = () => {
			const waitingForPostersToLoad = typeof listOfVideos === 'undefined' || listOfVideos.length === 0;
			if (waitingForPostersToLoad) {
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
						{ renderPosters(listOfVideos, 6) }
					</ul>
				)
			}
		}

		return (
			<div className="video-carousel">
				{ initialisePosters() }
				<div className="controls">
					<FontAwesomeIcon icon={faArrowCircleLeft} className="left-arrow" />
					<FontAwesomeIcon icon={faArrowCircleRight} className="right-arrow" />
				</div>
			</div>
		);
		
	}
	
}

const mapStateToProps = (state) => {
	// console.info("Getting state for props...")
	// console.info(state);
	return {
		home: state.home
	}
}

export default connect(mapStateToProps)(VideoCarousel);

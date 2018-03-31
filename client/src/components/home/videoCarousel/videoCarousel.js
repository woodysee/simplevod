// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
// console.log("Importing presentational modules...");
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowCircleLeft from '@fortawesome/fontawesome-free-solid/faArrowCircleLeft.js';
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight.js';
import Poster from './poster/poster.js';
import loadingSpinner from '../../../common/loading-spinner.gif';
import './videoCarousel.css';

class VideoCarousel extends Component {
	
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			carousel: {
				posters: this.props.home.videos.entries,
				totalLength: this.props.home.videos.totalCount,
				left: 0,
				posterSelected: 10,
				right: 20
			}
		}
		console.log(this.state);
	}
	
	shiftCarousel(direction) {
		// console.log("Sets the upper and lower bounds of the current slide based on the direction to allow the user to shift through the carousel per poster in both directions...");
		const posters = this.props.home.videos.entries;
		direction = direction === 'left' ? -1 : 1;
		let left = this.state.carousel.left + direction;
		let right = this.state.carousel.right + direction;
		let posterSelected = this.state.carousel.posterSelected + direction;
		left = left === -1 ? (posters.length-1) : left;
		left = left === posters.length ? 0 : left;
		right = right === -1 ? (posters.length-1) : right;
		right = right === posters.length ? 0 : right;
		posterSelected = posterSelected === -1 ? (posters.length-1) : posterSelected;
		posterSelected = posterSelected === posterSelected.length ? 0 : posterSelected;
		// console.log(left, " < >", right);
		this.setState((state) => {
			return {
				carousel: {
					left: left,
					posterSelected: posterSelected,
					right: right
				}
			}
		});
		
	}
	
	keyThroughCarousel(e) {

		let direction;
		switch (e.key) {
			case 'ArrowRight':
				direction = 'right';
				break;
			case 'ArrowDown':
				direction = 'right';
				break;
			case 'd':
				direction = 'right';
				break;
			case 'ArrowLeft':
				direction = 'left';
				break;
			case 'ArrowUp':
				direction = 'left';
				break;
			case 'a':
				direction = 'left';
				break;
			default:
		}
		switch (direction) {
			case 'right':
				this.shiftCarousel(direction);
				break;
			case 'left':
				this.shiftCarousel(direction);
				break;
			default:
		}

	}
	
	wheelThroughCarousel(e) {
		let wheelBehaviour, direction;
		switch (true) {
			case e.deltaX > 0:
				wheelBehaviour = 'right';
				break;
			case e.deltaY > 0:
				wheelBehaviour = 'down';
				break;
			case e.deltaX < 0:
				wheelBehaviour = 'left';
				break;
			case e.deltaY < 0:
				wheelBehaviour = 'up';
				break;
			default: wheelBehaviour = 'static';
		}
		switch (wheelBehaviour) {
			case 'right':
				direction = 'right';
				this.shiftCarousel(direction);
				break;
			case 'down':
				direction = 'right';
				this.shiftCarousel(direction);
				break;
			case 'left':
				direction = 'left';
				this.shiftCarousel(direction);
				break;
			case 'up':
				direction = 'left';
				this.shiftCarousel(direction);
				break;
			default:
		}
	}
	
	componentDidMount() {
		const carousel = document.getElementsByClassName('video-carousel')[0];
		carousel.dispatchEvent(new Event('click'));
		window.addEventListener("keydown", (e) => {
			this.keyThroughCarousel(e);
		}, false);
		const rightTailValueContinuesToExceedPostersLength = this.state.carousel.right >= this.props.home.videos.totalCount;
		if (rightTailValueContinuesToExceedPostersLength) {
			this.setState({
				carousel: {
					left: 0,
					right: this.props.home.videos.totalCount - 1
				}
			});
		};
	}
	
	render() {
		
		const listOfPosters = this.props.home.videos.entries;
		const posterSelected = this.state.carousel.posterSelected; // The poster to be focused
		const renderPosters = (posters, left, right) => {
			right = right >= posters.length ? posters.length - 1 : right;
			if (right >= posters.length) {
				
			}
			const generateCarouselIndices = (length, lowerBound, upperBound) => {
				// console.log("Getting lower and upper bounds of total items inside a carousel to allow for a recursively consistent number of items per carousel slide to be loaded regardless of total length of carousel items and returning an array of indices...");
				right = right >= posters.length ? posters.length - 1 : right; // Check if initial right tail value is more than the length of posters
				console.log(length);
				let orderedIndex = lowerBound, carouselIndex = 0;
				const tailsOfOrderedIndicesLoaded = lowerBound > upperBound;
				const rangeInsideOrderedIndices = upperBound > lowerBound && upperBound < length;
				let carouselIndices = [], tailLength;
				switch (true) {
					case tailsOfOrderedIndicesLoaded:
						tailLength = length - lowerBound;
						break;
					case rangeInsideOrderedIndices:
						tailLength = upperBound - lowerBound;
						break;
					default:
						tailLength = upperBound;
				}
				for (carouselIndex = 0; carouselIndex < tailLength; carouselIndex++) {
					carouselIndices.push(orderedIndex);
					orderedIndex++;
				}
				if (tailsOfOrderedIndicesLoaded) {
					let headLength = upperBound;
					orderedIndex = 0;
					for (carouselIndex = 0; carouselIndex < headLength; carouselIndex++) {
						carouselIndices.push(orderedIndex);
						orderedIndex++;
					}
				}
				return carouselIndices;
			}
			const posterIndices = generateCarouselIndices(posters.length, left, right);
			console.log(posterIndices);
			return posterIndices.map((index) => {
				return (
					<Poster key={index} poster={posters[index]} focused={ index === posterSelected }  />
				)
			})
		};
		
		const initialisePosters = (posters, left, right) => {
			const waitingForPostersToLoad = typeof posters === 'undefined' || posters.length === 0;
			if (waitingForPostersToLoad) {
				return (
					<ul className="posters">
						<span className="no-videos-loaded">
							<img className="loading-spinner" src={loadingSpinner} alt="Loading..." />
						</span>
					</ul>
				)
			} else {
				return (
					<ul className="posters">
						{ renderPosters(posters, left, right) }
					</ul>
				)
			}
		}

		return (
			<div className="video-carousel" onWheel={ (e) => this.wheelThroughCarousel(e) } onKeyDown={ (e) => this.keyThroughCarousel(e) }>
				{ initialisePosters(listOfPosters, this.state.carousel.left, this.state.carousel.right) }
				<div className="controls">
					<FontAwesomeIcon icon={faArrowCircleLeft} className="left-arrow" onClick={ () => this.shiftCarousel('left') } />
					<FontAwesomeIcon icon={faArrowCircleRight} className="right-arrow" onClick={ () => this.shiftCarousel('right') } />
				</div>
			</div>
		);
		
	}
	
	componentWillUnmount() {

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

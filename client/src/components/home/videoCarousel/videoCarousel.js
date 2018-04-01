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

const mapStateToProps = (state) => {
	// console.info("Getting state for props...")
	// console.info(state);
	return {
		home: state.home
	}
}

class VideoCarousel extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			carousel: {
				left: 0,
				posterSelected: 10,
				right: 29
			}
		}
	}
	
	shiftCarousel(direction) {
		// console.log("Sets the upper and lower bounds of the current slide based on the direction to allow the user to shift through the carousel per poster in both directions...");
		if (direction !== 'left' && direction !== 'right') {
			// console.warn("...only left or right directions permitted. Exiting...");
			return;
		};
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
		posterSelected = posterSelected === posters.length ? 0 : posterSelected;
		console.log(left, posterSelected , right);
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
			default: wheelBehaviour = 'none';
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
		// console.log("componentDidMount(): This is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.");
		const carousel = document.getElementsByClassName('video-carousel')[0];
		carousel.dispatchEvent(new Event('click'));
		const evtListener = (e) => {
			this.keyThroughCarousel(e);
		};
		window.addEventListener("keydown", evtListener, false);
	}
	
	shouldComponentUpdate() {
		// console.log("shouldComponentUpdate");
		if (this.props.home.videos.totalCount > 0) {
			// console.log("...this.props has been loaded.");
			// console.log("This sets a ceiling for the right tail in the constructor above if bigger than actual length of posters received from response.");
			const rightTailValueExceedsPostersLength = this.state.carousel.right >= this.props.home.videos.totalCount;
			const leftTailValueExceedsPostersLength = this.state.carousel.left >= this.props.home.videos.totalCount;
			switch (true) {
				case rightTailValueExceedsPostersLength && leftTailValueExceedsPostersLength:
					this.setState({
						carousel: {
							left: this.state.carousel.left - 2,
							posterSelected: this.state.carousel.posterSelected,
							right: this.state.carousel.right - 2
						}
					});
					break;
				case rightTailValueExceedsPostersLength:
					console.log(this.state.carousel.right);
					this.setState({
						carousel: {
							left: this.state.carousel.left,
							posterSelected: this.state.carousel.posterSelected,
							right: this.props.home.videos.totalCount - 2
						}
					});
					break;
				case leftTailValueExceedsPostersLength:
					this.setState({
						carousel: {
							left: this.state.carousel.left - 2,
							posterSelected: this.state.carousel.posterSelected,
							right: this.state.carousel.right
						}
					});
					this.shiftCarousel('right');
					this.shiftCarousel('right');
					this.shiftCarousel('right');
					break;
				default:
			}

			const indexOfPosterSelected = this.state.carousel.posterSelected;
			const posterSelected = document.getElementsByClassName('carousel-item')[indexOfPosterSelected];
			if (indexOfPosterSelected && typeof posterSelected !== 'undefined') {
				// posterSelected.classList.addClass('focus');
			}
		}
		return true;
	}
	
	render() {
		
		const listOfPosters = this.props.home.videos.entries;
		const posterSelected = this.state.carousel.posterSelected; // The poster to be focused
		
		const renderPosters = (posters, left, right) => {
			const generateCarouselIndices = (length, lowerBound, upperBound) => {
				// console.log("Getting lower and upper bounds of total items inside a carousel to allow for a recursively consistent number of items per carousel slide to be loaded regardless of total length of carousel items and returning an array of indices...");
				right = right >= length ? length - 1 : right; // Check if initial right tail value is more than the length of posters
				// console.log(length);
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
			// console.log(posterIndices);
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
		const evtListener = (e) => {
			this.keyThroughCarousel(e);
		};
		window.removeEventListener("keydown", evtListener, false);
	}
	
}

export default connect(mapStateToProps)(VideoCarousel);

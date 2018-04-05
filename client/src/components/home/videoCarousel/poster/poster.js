// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// console.log("Importing Redux action-creators and thunks...");
import { setCurrentPage } from '../../../../actions/mainActions';
import { createViewingRecord } from '../../../../actions/viewingHistory';
import { loadVideo } from '../../../../actions/getVideos';

// console.log("Importing presentational modules...");
import posterPlaceholder from '../../../../common/movie-placeholder.svg';
import loadingSpinner from '../../../../common/loading-spinner.gif';
import './poster.css';

const mapStateToProps = (state) => {
	// console.info("header: mapStateToProps()");
	// console.info(state.header);
	return state;
}

const mapDispatchToProps = (dispatch) => {
	// console.info("Mapping dispatch for props...")
	// console.info(dispatch);
	return {
		setCurrentPage: (page) => { dispatch(setCurrentPage(page)) },
		createViewingRecord: (record) => { dispatch(createViewingRecord(record)) },
		loadVideo: (video) => { dispatch(loadVideo(video)) }
	}
}

class Poster extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			poster: {
				content: {
					link: loadingSpinner,
					title: 'Loading...'
				},
				style: {
					backgroundImage: `url('${loadingSpinner}')`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'contain',
					backgroundOrigin: 'content-box',
					paddingTop: '30%'
				},
				tabIndex: this.props.tabIndex,
				focused: this.props.focused
			}
		}
	}
	
	setCurrentPage(page) {
		// console.log(this.props.poster);
		this.props.createViewingRecord(this.props.poster);
		this.props.loadVideo(this.props.poster);
		this.props.setCurrentPage(page);
	}
	
	render() {
		// console.log(this.props.poster);
		
		const poster = {
			content: {
				link: this.state.poster.content.link,
				title: this.state.poster.content.title
			},
			style: {
				backgroundImage: this.state.poster.style.backgroundImage,
				backgroundRepeat: this.state.poster.style.backgroundRepeat,
				backgroundSize: this.state.poster.style.backgroundSize,
				backgroundOrigin: this.state.poster.style.backgroundOrigin,
				paddingTop: this.state.poster.style.paddingTop
			}
		}
		
		let videoPlayer = "/";
		
		if (typeof this.props.poster !== 'undefined') {
			if (typeof this.props.poster.images !== 'undefined') {
				if (typeof this.props.poster.images[0].url === 'undefined' || this.props.poster.images[0].url === '') {
					poster.style.backgroundImage = `url('${posterPlaceholder}')`;
					poster.style.backgroundSize = 'cover';
					poster.style.paddingTop = 'unset';
				} else {
					// console.log(this.props.poster.title);
					poster.style.backgroundImage = `url('${this.props.poster.images[0].url}')`;
					poster.style.backgroundSize = 'cover';
					poster.style.paddingTop = 'unset';
				}
			}

			if (typeof this.props.poster.contents !== 'undefined') {
				poster.content.link = this.props.poster.contents[0].url;
				videoPlayer = "/video/" + this.props.poster.id;
			}
			
			if (typeof this.props.poster.title !== 'undefined') {
				poster.content.title = this.props.poster.title;
			}
		}
		
		return (
			<li className="carousel-item">
				<div className="poster" style={poster.style}></div>
				<Link to={videoPlayer} className="video-link" onClick={ () => { this.setCurrentPage('video', this.state.poster) } }>
					<div className="content">
						<h2>{poster.content.title}</h2>
					</div>
				</Link>
				<h3>{poster.content.title}</h3>
			</li>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Poster);

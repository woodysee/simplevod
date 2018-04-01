import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import {
	Redirect
} from 'react-router-dom';
// console.log("Importing presentational modules...");
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay.js';
import faPause from '@fortawesome/fontawesome-free-solid/faPause.js';
import faExpand from '@fortawesome/fontawesome-free-solid/faExpand.js';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle.js';
import screenfull from 'screenfull';

import './video.css';

// console.log("Courtesy of CookPete, developer of react-player: https://github.com/CookPete/react-player/blob/master/src/demo/App.js");

class Video extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			url: "https://www.youtube.com/watch?v=tE6fOsAc9FM&t=0s&list=PL28EjBbo6sgCId1pqTWFYLpzGpNd5kNeL&index=1",
			playing: true,
			volume: 0.8,
			muted: false,
			played: 0,
			loaded: 0,
			duration: 0,
			playbackRate: 1.0,
			loop: false
		}
	}
	
	load = (url) => {
		this.setState({
			url,
			played: 0,
			loaded: 0
		})
	}
	
	componentDidMount() {
		this.setState({ playing: this.state.playing });
	}
	
	playPause = () => {
		this.setState({ playing: !this.state.playing })
	}
	
	playPauseViaKey = (e) => {
		if (e.keyCode === 32) {
			this.setState({ playing: !this.state.playing });	
		}
	}
	toggleLoop = () => {
		this.setState({ loop: !this.state.loop })
	}
	setVolume = e => {
		this.setState({ volume: parseFloat(e.target.value) })
	}
	toggleMuted = () => {
		this.setState({ muted: !this.state.muted })
	}
	setPlaybackRate = e => {
		this.setState({ playbackRate: parseFloat(e.target.value) })
	}
	onPlay = () => {
		// console.log('onPlay');
		const playPauseIconEl = document.getElementsByClassName('mid-screen-playpause-icon')[0];
		playPauseIconEl.style.display = "none";
		this.setState({ playing: true })
	}
	onPause = () => {
		// console.log('onPause')
		const playPauseIconEl = document.getElementsByClassName('mid-screen-playpause-icon')[0];
		playPauseIconEl.style.display = "flex";
		this.setState({ playing: false })
	}
	onSeekMouseDown = e => {
		this.setState({ seeking: true })
	}
	onSeekChange = e => {
		this.setState({ played: parseFloat(e.target.value) })
	}
	onSeekMouseUp = e => {
		this.setState({ seeking: false })
		this.player.seekTo(parseFloat(e.target.value))
	}
	onProgress = state => {
		// console.log('onProgress', state)
		// Updates the time slider only if we are not currently seeking
		if (!this.state.seeking) {
			this.setState(state)
		}
	}
	onEnded = () => {
		// console.log('onEnded')
		this.setState({ playing: this.state.loop })
	}
	onDuration = (duration) => {
		// console.log('onDuration', duration)
		this.setState({ duration })
	}
	onClickFullscreen = () => {
		screenfull.request(findDOMNode(this.player))
	}
	renderLoadButton = (url, label) => {
		return (
			<button onClick={() => this.load(url)}>
				{label}
			</button>
		)
	}
	ref = (player) => {
		this.player = player
	}
	
	render() {
		
		const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state;
		
		const processTimeIntoMMSS = (rawTime) => {
			const minutes = Math.floor(rawTime / 60);
			const seconds = Math.floor(rawTime % 60);
			const min = minutes >= 10 ? minutes : `0${minutes}`;
			const sec = seconds >= 10 ? seconds : `0${seconds}`;
			return min + ":" + sec;
		}
		
		const videoHasFinished = played === 1;
		if (videoHasFinished) {
			// console.log("...it should go back to the previous page.");
			return (
				<Redirect to="/" />
			)	
		}
		
		return (
			<div className="video-player-wrapper" onKeyDown={ (e) => this.playPauseViaKey(e) }>
				<ReactPlayer
					className="video-player"
					ref={ this.ref }
					width='100%'
					height='100%'
					url={ url }
					playing={ playing }
					loop={ loop }
					playbackRate={ playbackRate }
					volume={ volume }
					muted={ muted }
					onReady={ () => console.log('Video ready...') }
					onStart={ () => console.log('...Video started.') }
					onPlay={ this.onPlay }
					onPause={ this.onPause }
					onBuffer={ () => console.log('Buffering...') }
					onSeek={ e => console.log('Seeking...', processTimeIntoMMSS(e)) }
					onEnded={ this.onEnded }
					onError={ e => console.log('Error:', e) }
					onProgress={ this.onProgress }
					onDuration={ this.onDuration }
					onClick={ this.playPause }
				/>
				<FontAwesomeIcon className="mid-screen-playpause-icon" icon={ faPlayCircle } onClick={ this.playPause } />
				<div className="video-player__controls">
					<FontAwesomeIcon icon={playing ? faPause : faPlay} className="play-icon" onClick={ this.playPause } />
					<div className="duration">
						{ processTimeIntoMMSS(played * duration) } / { processTimeIntoMMSS(duration) }
					</div>
					<input
						className="video-player__controls__progress-slider"
						type='range' min={0} max={1} step='any'
						value={played}
						onMouseDown={this.onSeekMouseDown}
						onChange={this.onSeekChange}
						onMouseUp={this.onSeekMouseUp}
					/>
					<FontAwesomeIcon icon={ faExpand } className="full-screen-btn" onClick={this.onClickFullscreen} />
				</div>
			</div>
		)
		
	}
	
}

export default Video;
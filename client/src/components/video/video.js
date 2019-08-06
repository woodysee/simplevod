// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// console.log("Importing Redux action-creators and thunks...");
import { setCurrentPage } from '../../actions/mainActions';
import { createViewingRecord } from '../../actions/viewingHistory';
import { getVideo } from '../../actions/getVideos';

// console.log("Importing children components...");
import Header from '../header/header.js';

// console.log("Importing presentational modules...");
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpand,
  faPause,
  faPlay,
  faPlayCircle
} from '@fortawesome/free-solid-svg-icons';
import screenfull from 'screenfull';

import './video.css';

const mapStateToProps = state => {
  // console.info("video: mapStateToProps()");
  return state;
};

const mapDispatchToProps = dispatch => {
  // console.info("video: mapDispatchToProps()...")
  // console.info(dispatch);
  return {
    setCurrentPage: page => {
      dispatch(setCurrentPage(page));
    },
    createViewingRecord: record => {
      dispatch(createViewingRecord(record));
    },
    getVideo: id => {
      dispatch(getVideo(id));
    }
  };
};

// console.log("Courtesy of CookPete, developer of react-player: https://github.com/CookPete/react-player/blob/master/src/demo/App.js");

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      playing: true,
      volume: 0.8,
      muted: false,
      played: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      viewingRecord: false
    };
    this.props.getVideo(this.props.match.params.id);
  }

  load = url => {
    this.setState({
      url,
      played: 0
    });
  };

  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  playPauseViaKey = e => {
    if (e.keyCode === 32) {
      this.setState({ playing: !this.state.playing });
    }
  };
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };
  onPlay = () => {
    // console.log('onPlay');
    const playPauseIconEl = document.getElementsByClassName(
      'mid-screen-playpause-icon'
    )[0];
    playPauseIconEl.style.display = 'none';
    this.setState({ playing: true });
  };
  onPause = () => {
    // console.log('onPause')
    const playPauseIconEl = document.getElementsByClassName(
      'mid-screen-playpause-icon'
    )[0];
    playPauseIconEl.style.display = 'flex';
    this.setState({ playing: false });
  };
  onSeekMouseDown = e => {
    this.setState({ seeking: true });
  };
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };
  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };
  onProgress = state => {
    // console.log('onProgress', state)
    // Updates the time slider only if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  onEnded = () => {
    // console.log('onEnded')
    this.setState({
      viewingRecord: false,
      playing: this.state.loop
    });
  };
  onDuration = duration => {
    // console.log('onDuration', duration)
    this.setState({ duration });
  };
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };
  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };
  ref = player => {
    this.player = player;
  };
  setCurrentPage(page) {
    if (page !== this.props.header.currentPage) {
      this.props.setCurrentPage(page);
    }
  }

  componentDidMount() {
    this.setState({ playing: this.state.playing });
    console.info('Loading full screen playing on video load...');
    screenfull.request(findDOMNode(this.player));
  }

  createViewingRecord(nextProps) {
    if (nextProps !== this.props) {
      const videoLoaded = typeof nextProps.video.video.contents !== 'undefined';
      const viewingRecordNotYetCreated = !this.state.viewingRecord;
      if (videoLoaded) {
        let urlHasNotChanged =
          this.state.url !== nextProps.video.video.contents[0].url;
        if (urlHasNotChanged) {
          this.setState({
            url: nextProps.video.video.contents[0].url
          });
          return false;
        }
      }
      if (videoLoaded && viewingRecordNotYetCreated) {
        this.setState({
          viewingRecord: true
        });
        // console.log(this.props.video.video);
        this.props.createViewingRecord(this.props.video.video);
        return true;
      }
    }
    return true;
  }

  shouldComponentUpdate(nextProps) {
    return this.createViewingRecord(nextProps);
  }

  render() {
    this.setCurrentPage('video'); // Initialise page state on load
    const {
      url,
      playing,
      volume,
      muted,
      loop,
      played,
      duration,
      playbackRate
    } = this.state;
    const processTimeIntoMMSS = rawTime => {
      const minutes = Math.floor(rawTime / 60);
      const seconds = Math.floor(rawTime % 60);
      const min = minutes >= 10 ? minutes : `0${minutes}`;
      const sec = seconds >= 10 ? seconds : `0${seconds}`;
      return min + ':' + sec;
    };

    const videoHasFinished = played === 1;
    if (videoHasFinished) {
      // console.log("...it should go back to the previous page.");
      // console.log("Setting page state...");
      this.setCurrentPage('home');
      // console.log("...and redirect back to the home page.");
      return <Redirect to="/" />;
    }

    return (
      <div className="Video">
        <Header />
        <div
          className="video-player-wrapper"
          onKeyDown={e => this.playPauseViaKey(e)}
        >
          <ReactPlayer
            className="video-player"
            ref={this.ref}
            width="100%"
            height="100%"
            url={url}
            playing={playing}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log('Video ready...')}
            onStart={() => console.log('...Video started.')}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onBuffer={() => console.log('Buffering...')}
            onSeek={e => console.log('Seeking...', processTimeIntoMMSS(e))}
            onEnded={this.onEnded}
            onError={e => console.log('Error:', e)}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
            onClick={this.playPause}
          />
          <FontAwesomeIcon
            className="mid-screen-playpause-icon"
            icon={faPlayCircle}
            onClick={this.playPause}
          />
          <div className="video-player__controls">
            <FontAwesomeIcon
              icon={playing ? faPause : faPlay}
              className="play-icon"
              onClick={this.playPause}
            />
            <div className="duration">
              {processTimeIntoMMSS(played * duration)} /{' '}
              {processTimeIntoMMSS(duration)}
            </div>
            <input
              className="video-player__controls__progress-slider"
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
            <FontAwesomeIcon
              icon={faExpand}
              className="full-screen-btn"
              onClick={this.onClickFullscreen}
            />
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    // allows future recording of view history upon video close
    this.setState({
      viewingRecord: false
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);

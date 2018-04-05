// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// console.log("Importing Redux action-creators and thunks...");
import { setCurrentPage } from '../../actions/mainActions';
import { getVideo } from '../../actions/getVideos';
import { createViewingRecord, getViewingHistory } from '../../actions/viewingHistory';

// console.log("Importing children components...");
import Header from '../header/header.js';

// console.log("Importing presentational modules...");
import moment from 'moment';
import './history.css';
import loadingSpinner from '../../common/loading-spinner.gif';

const mapStateToProps = (state) => {
	// console.info("history: mapStateToProps()");
	// console.info(state.header);
	return state;
}

const mapDispatchToProps = (dispatch) => {
	// console.info("history: mapDispatchToProps()...")
	// console.info(dispatch);
	return {
		setCurrentPage: (page) => { dispatch(setCurrentPage(page)) },
		createViewingRecord: () => { dispatch(createViewingRecord()) },
		getViewingHistory: () => { dispatch(getViewingHistory()) },
		getVideo: (id) => { dispatch(getVideo(id)) }
	}
}

class History extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.header.currentPage,
			history: []
		}
		this.props.getViewingHistory();
	};
	
	goToCurrentPage(page, video) {
		this.props.createViewingRecord(video);
		this.props.loadVideo(video);
		this.props.setCurrentPage(page);
	}
	
	setCurrentPage(page) {
		if (page !== this.props.header.currentPage) {
			this.props.setCurrentPage(page);
		}
	}
	
	shouldComponentUpdate(nextProps) {
		if (nextProps.history.records !== this.props.history.records) {
			const viewingHistoryLoaded = nextProps.history.records.length > 0;
			if (viewingHistoryLoaded) {
				// console.log(nextProps.history);
				const viewingHistory = nextProps.history.records;
				this.setState({
					history: viewingHistory
				});
				return true;
			};
			return false;
		}
		return true;
	}
	
	getVideo(id) {
		return this.props.getVideo(id);
	}
	
	render() {
		
		this.setCurrentPage('history'); // Initialise page state on load
		
		const renderRecords = (records) => {
			return records.map((record) => {
				const videoPage = '/video/' + record.ref;
				const generateRoles = (record) => {
					return (
						<div className="credit">
							{record.video[0].credits[0].role}: {record.video[0].credits[0].name}
						</div>
					);

				}
				return (
					<li className="watched-video" key={record.id}>
						<Link className="link" to={videoPage} onClick={ () => { this.setCurrentPage('video', record.video[0]) } }>
							{ record.video[0].title }
						</Link>
						<br />
						<div>{ generateRoles(record) }</div>
						<div>Last watched at { moment(record.updated).format('lll')}</div>
					</li>
				)
			})
		}
		
		const initialiseRecords = (records) => {
			const waitingForRecordsToLoad = typeof records === 'undefined' || records.length === 0;
			if (waitingForRecordsToLoad) {
				return (
					<ul className="watched-videos">
						<img className="loading-spinner" src={loadingSpinner} alt="Loading..." />
					</ul>
				)
			} else {
				return (
					<ul className="watched-videos">
						{ renderRecords(records) }
					</ul>
				)
			}
		}
		
		return (
			<div className="History">
				<Header />
				{ initialiseRecords(this.props.history.records) }
			</div>
		);
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(History);

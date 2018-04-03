import axios from 'axios';

export const showViewingHistory = (records) => {
	return {
		type: "SHOW_VIEWING_HISTORY",
		records: records
	}
}

export const createViewingRecord = (video, played) => {
	const record = {
		ref: video.id,
		url: video.contents[0].url,
		video: video,
		played: 0
	};
	// console.log(record);
	return (dispatch) => {
		axios.post(`/api/history/create`, record, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true,
			credentials: 'same-origin'
		}).then((response) => {
			// console.log("...Viewing record saved.");
			// console.log(response);
			return response;
		}).catch((error)=> {
			console.error('Unable to retrieve list of videos from external source via Simple VOD\'s proxy server -', error);
		});
	};
};

export const getViewingHistory = () => {
	return (dispatch) => {
		axios.get(`/api/history`, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true,
			credentials: 'same-origin'
		}).then((response) => {
			const records = response.data;
			// console.log(records);
			dispatch(showViewingHistory(records));
			return records;
		}).catch((error)=> {
			console.error('Unable to retrieve list of videos from external source via Simple VOD\'s proxy server -', error);
		});
	};
};

import axios from 'axios';

export const loadVideo = (video) => {
	// console.log(video);
	return {
		type: 'LOAD_VIDEO',
		video: video
	}
};

export const loadVideos = (videos) => {
	return {
		type: "LOAD_VIDEOS",
		videos: videos
	}
};

export const getVideo = (id) => {
	return (dispatch) => {
		axios.get(`/api/internal/video/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true,
			credentials: 'same-origin'
		}).then((response) => {
			// console.log(response.data);
			const video = response.data;
			dispatch(loadVideo(video));
		}).catch((error)=> {
			console.error('Unable to retrieve video from external source via Simple VOD\'s proxy server -', error);
		});
	}
}

export const getVideos = () => {
	return (dispatch) => {
		axios.get(`/api/videos`, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true,
			credentials: 'same-origin'
		}).then((response) => {
			// console.log(response.data);
			const videos = response.data;
			dispatch(loadVideos(videos));
		}).catch((error)=> {
			console.error('Unable to retrieve list of videos from external source via Simple VOD\'s proxy server -', error);
		});
	};
};

export const getInternalVideos = () => {
	return (dispatch) => {
		axios.get(`/api/internal/videos`, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true,
			credentials: 'same-origin'
		}).then((response) => {
			console.log(response.data);
			const videos = {
				totalCount: response.data.length,
				entries: response.data
			};
			dispatch(loadVideos(videos));
		}).catch((error)=> {
			console.error('Unable to retrieve list of videos from Simple VOD\'s own data store -', error);
		});
	};
};

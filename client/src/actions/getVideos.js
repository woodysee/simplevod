import axios from 'axios';

export const loadVideos = (videos) => {
	return {
		type: "LOAD_VIDEOS",
		videos
	}
};

export const getVideos = () => {
	return (dispatch) => {
		axios.get('/api/videos', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			withCredentials: true,
			credentials: 'same-origin'
		}).then((response) => {
			console.log(response.data);
			const videos = response.data;
			dispatch(loadVideos(videos));
		}).catch((error)=> {
			console.error('Unable to retrieve list of videos from external source via Simple VOD\'s proxy server -', error);
		});
	};
};

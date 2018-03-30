import axios from 'axios';

export const loadVideos = (videos) => {
	return {
		type: "LOAD_VIDEOS",
		videos
	}
};

export const getVideos = (text) => {
	return (dispatch) => {
		axios.get('http://localhost:3001/api/videos', {
			headers: {
				'Content-Type' : 'application/json'
			},
			withCredentials: true,
			credentials: 'same-origin'
		}).then((response) => {
			console.log(response.data);
			const videos = response.data;
			dispatch(loadVideos(videos));
		}).catch((error)=> {
			console.error('Unable to retrieve videos from our server -', error);
		});
	};
};

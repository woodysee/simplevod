const initialState = {
	videos: []
}

const homeReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'LOAD_VIDEOS':
			return action.getVideos || []
			break;
		default:
			return state
	}
}

export default homeReducer;

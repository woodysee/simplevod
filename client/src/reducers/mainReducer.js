const initialState = {
	testData: {}
}

const mainReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'GET_VIDEOS':
			return action.getVideos || {}
			break;
		default:
			return state
	}
}

export default mainReducer;

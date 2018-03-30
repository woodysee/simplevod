const initialState = {
	videos: {}
}

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_VIDEOS':
			return {
				videos: action.videos
			}
		default:
			return state
	}
	
}

export default homeReducer;

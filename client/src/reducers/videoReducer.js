const initialState = {
	video: {}
}

const videoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_VIDEO':
			return {
				video: action.video
			}
		default:
			return state
	}
	
}

export default videoReducer;

const initialState = {
	currentPage: 'home'
}

const headerReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CURRENT_PAGE':
			return {
				currentPage: action.page
			}
		default:
			return state
	}
	
}

export default headerReducer;

const initialState = {
	testData: ""
}

const mainReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'TEST_ACTION':
			return {
				...state,
				testData: action.text
			}
			break;
		default:
			return state
	}
}

export default mainReducer;

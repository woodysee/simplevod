const initialState = {
	records: []
}

const historyReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SHOW_VIEWING_HISTORY":
			return {
				records: action.records
			}
		default:
			return state
	}
	
}

export default historyReducer;

export const setCurrentPage = (page) => {
	const clientWasInitialised = page === "init";
	const initialPage = 'home';
	page = clientWasInitialised ? initialPage : page;
	return {
		type: 'SET_CURRENT_PAGE',
		page: page
	}
};

export const mainActions = (text) => {
	return {
		type: 'TEST_ACTION',
		text
	}
};

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import mainReducer from '../reducers/mainReducer';

export let initStore = () => {

	const reducer = combineReducers({
		test: mainReducer
	});

	/* The thunk middleware enables the dispatch of functions as actions */
	const store = createStore(reducer, compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	));

	return store;
}

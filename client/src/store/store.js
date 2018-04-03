import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import homeReducer from '../reducers/homeReducer.js';
import headerReducer from '../reducers/headerReducer.js';
import historyReducer from '../reducers/historyReducer.js';
import videoReducer from '../reducers/videoReducer.js';

export let initaliseStore = () => {

	const reducer = combineReducers({
		home: homeReducer,
		header: headerReducer,
		history: historyReducer,
		video: videoReducer
	});

	/* The thunk middleware enables the dispatch of functions as actions */
	const store = createStore(reducer, compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	));

	return store;
}

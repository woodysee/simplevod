import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import homeReducer from '../reducers/homeReducer';

export let initaliseStore = () => {

	const reducer = combineReducers({
		home: homeReducer
	});

	/* The thunk middleware enables the dispatch of functions as actions */
	const store = createStore(reducer, compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	));

	return store;
}

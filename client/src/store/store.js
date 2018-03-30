import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import mainReducer from '../reducers/mainReducer';

export let initStore = () => {

	const reducer = combineReducers( {
		test: mainReducer
	});

	/* thunk middleware enables dispatch of functions as actions */
	const store = createStore(reducer, compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	));

	return store;
}

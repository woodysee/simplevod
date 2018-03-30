import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Client from './components/client';
import registerServiceWorker from './registerServiceWorker';

// Actions
import { getVideos } from './actions/getVideos';

// Redux
import { Provider } from 'react-redux';
import { initaliseStore } from './store/store';

// Redux: Actions


// Initialising store
const store = initaliseStore();

// Load videos
store.dispatch(getVideos());

// Dispatches

ReactDOM.render((
	<Provider store={store}>
		<Client />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();

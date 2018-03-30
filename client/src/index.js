import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Client from './components/client';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './store/store';

// Redux: Actions
import { getVideos } from './actions/getVideos';

// Initialising store
const store = initStore();

// Load videos
store.dispatch(getVideos());

// Dispatches

ReactDOM.render((
	<Provider store={store}>
		<Client />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();

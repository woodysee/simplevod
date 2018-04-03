import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client';
import registerServiceWorker from './registerServiceWorker';

// Actions
import { setCurrentPage } from './actions/mainActions';
import { getInternalVideos } from './actions/getVideos';

// Redux
import { Provider } from 'react-redux';
import { initaliseStore } from './store/store';

// Initialising store
const store = initaliseStore();

// Load videos
store.dispatch(getInternalVideos());
store.dispatch(setCurrentPage('init'));

// Dispatching...

ReactDOM.render((
	<Provider store={store}>
		<Client />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();

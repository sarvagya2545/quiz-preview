import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { throttle } from 'lodash';

import App from './App';
import rootReducer from './redux/rootReducer';

// To persist the data to local storage
import { loadState, saveState } from './localStorage/localStorage';
const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

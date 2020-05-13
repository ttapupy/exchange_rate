import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import './index.css';
import './assets/css/sb-admin-2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';


const store = configureStore();

store.subscribe(() => {
  localStorage.setItem('reduxRates', JSON.stringify(store.getState()['rates']));
  console.log('filters', store.getState()['filters'])
});

console.log('store', store.getState())

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>

);

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

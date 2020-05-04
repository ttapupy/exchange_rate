import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import AppRouter from "./Router";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <AppRouter />
      </Router>
    </div>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  //   <ExchangerateApp />
  // </React.StrictMode>,
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

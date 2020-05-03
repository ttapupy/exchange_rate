import React from 'react';
import './App.css';
import Header from './components/Header';
import ListPage from './components/ListPage';
import DetailsPage from './components/DetailsPage';
import NotFoundPage from './components/404';

class ExchangeRateApp extends React.Component {
  state = {
    username: 'bubu'
  }

  render() {
    return (
      <div className="App">
        <header>
          <Header username={this.state.username}/>
        </header>
        Belépés
      </div>
    );
  }
}
Header.defaultProps = {
  title: 'Exchange Rate App'
};

export default ExchangeRateApp;

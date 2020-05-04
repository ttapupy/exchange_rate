import React from 'react';
import '../App.css';
import Header from './Header';
import Login from './Login';

class App extends React.Component {
  state = {
    uname: undefined
  }

  onLogin = (loginResult) => {
    this.setState({ uname: loginResult });
    console.log(this.state); 
  }

  render() {
    console.log(this.state.uname);
    return <div>
      <Header uname={this.state.uname} />
      <Login onLogin={this.onLogin} />
    </div>;
  }
}

// Header.defaultProps = {
//   title: 'Exchange Rate App'
// };

export default App;

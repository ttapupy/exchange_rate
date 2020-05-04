import React from 'react';
import ReactDOM from "react-dom";
import Header from './Header';
import QueryModal from './QueryModal';
import '../App.css';

class ListPage extends React.Component {

  state = {
    openModal: false
  }

  newSearch = () => {
    this.setState(() => ({ openModal: true }));
  };

  hideModal = () => {
    this.setState({ openModal: false });
  };


  render() {
    return (
      <div>
        <Header />
        <main>
          <p>New search</p>
          <QueryModal show={this.state.openModal} handleClose={this.hideModal} />
          <button type="button" onClick={this.newSearch}>open</button>
        </main>
        <br />
        <div>Lista</div>
      </div>
    );
  }

}

export default ListPage;

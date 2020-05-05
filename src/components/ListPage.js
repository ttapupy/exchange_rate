import React from 'react';
import Header from './Header';
import QueryModal from './QueryModal';
import '../App.css';
import DetailsPage from './DetailsPage';

class ListPage extends React.Component {

  state = {
    openModal: false,
    showHide: "modal display-none",
    passQuery: {}
  }
  

  newSearch = () => {
    this.setState(() => ({ openModal: true, showHide: "modal display-block" }));
  };

  hideModal = () => {
    this.setState({ openModal: false, showHide: "modal display-none" });
  };

  saveResult = (base, date, rates) => {
    this.setState({ passQuery: { base: [date, rates] } });
    localStorage.setItem(base, [date, rates]);
    console.log("mi ez?", this.state.passQuery);
  };

  renderTable() {
    const data = {};
    let keys = Object.keys(localStorage);

    for (let key of keys) {
      if ( key!== 'username') {
      data[key] = localStorage.getItem(key);
      }
    }
    return Object.entries(data).map((value, key) => {
      const result = value[1];
      const date = result.substring(0,10);
      const to = result.substring(13,16);
      const rate = result.substring(18, 24);
    
      return (
        <tr key={key}>
          <td>{date}</td>
          <td>{value[0]}</td>
          <td>{to}</td>
          <td>{rate}</td>

        </tr>
      )
    })
  }


  render() {
    return (
      <div>
        <Header />
        <main>
          <p>New search</p>
          <QueryModal openModal={this.state.openModal} hideModal={this.hideModal} showHide={this.state.showHide} passQuery={this.state.passQuery} 
            saveResult={this.saveResult}
          />
          <button type="button" onClick={this.newSearch}>open</button>
        </main>
        <br />
        <div>
          <h1 id='tableheader'>Previous Queries</h1>
          <table id='results'>
          <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Rate</th>
              </tr>
          </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

}

export default ListPage;

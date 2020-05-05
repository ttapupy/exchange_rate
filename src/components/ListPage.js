import React from 'react';
import QueryModal from './QueryModal';
import '../App.css';
import DetailsPage from './DetailsPage';
import Button from 'react-bootstrap/Button';

class ListPage extends React.Component {

  state = {
    openModal: false,
    showHide: "modal display-none",
    passQuery: {},
    elementChange: false
  }
  

  newSearch = () => {
    this.setState(() => ({ openModal: true, showHide: "modal display-block" }));
  };

  hideModal = () => {
    this.setState({ openModal: false, showHide: "modal display-none" });
  };

  saveResult = (date, base, goal, rate) => {
    this.setState({ passQuery:  [date, base, goal[0], rate]  });
    const res = [date, base, goal[0], JSON.stringify(rate)].join('|');
    this.setState((prevState) => ({ elementChange: !prevState.elementChange }))
    localStorage.setItem(res, res);
    
  };

  detailShow = (elem) => {
    // TODO
    alert(elem);
  };

  removeEntry = (elem) => {
    localStorage.removeItem(elem);
    this.setState((prevState) => ({ elementChange: !prevState.elementChange }))
  };

  renderTable() {
    const data = {};
    let keys = Object.keys(localStorage).filter(function (value) { return value !== "username"; });
    for (let key of keys) {
      data[key] = localStorage.getItem(key);
    }
    return Object.values(data).map((value) => {
      const temp = value.split('|');
      return (
        <tr key={value}>
          <td>{temp[0]}</td>
          <td>{temp[1]}</td>
          <td>{temp[2]}</td>
          <td>{temp[3]}</td>
          <td><button onClick={() => this.detailShow(value)}>details</button></td>
          <td><button onClick={() => this.removeEntry(value)}>delete</button></td>

        </tr>
      )
    })
  }


  render() {
    return (
      <div>
        <main className="content-wrapper">
          <p>New search</p>
          <QueryModal openModal={this.state.openModal} hideModal={this.hideModal} showHide={this.state.showHide} passQuery={this.state.passQuery} 
            saveResult={this.saveResult}
          />
          <Button type="button" onClick={this.newSearch}>open</Button>
        </main>
        <br />
        <div className="table-responsive">
          <h1 id='tableheader'>Previous Queries</h1>
          <table className="table table-bordered">
          <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Rate</th>
            <th>Details</th>
            <th>Delete</th>
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

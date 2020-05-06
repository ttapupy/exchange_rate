import React from 'react';
import QueryModal from './QueryModal';
import Button from 'react-bootstrap/Button';

class ListPage extends React.Component {

  state = {
    openModal: false,
    showHide: "modal display-none",
    passQuery: {},
    elementChange: false,
    result: undefined
  }

  newSearch = () => {
    this.setState(() => ({ openModal: true }));
  };

  hideModal = () => {
    this.setState({ openModal: false, result: undefined });
  };

  saveResult = (date, base, goal, rate) => {
    this.setState({ passQuery:  [date, base, goal[0], rate]  });
    const res = [date, base, goal[0], JSON.stringify(rate)].join('|');
    const result = "  1 ".concat(base, " = ", rate, " ", goal);
    this.setState({result: result});
    this.setState((prevState) => ({ elementChange: !prevState.elementChange }));
    localStorage.setItem(res, res);
    
  };

  removeEntry = (elem) => {
    localStorage.removeItem(elem);
    this.setState((prevState) => ({ elementChange: !prevState.elementChange }))
  };

  renderTable() {
    const data = {};
    let keys = Object.keys(localStorage).filter(function (value, index, a) { return value !== "username" });
    const keysOrdered = keys.sort().reverse();
    for (let key of keysOrdered) {
      data[key] = localStorage.getItem(key);
    }
    return Object.values(data).map((value) => {
      const temp = value.split('|');
      if (this.props.details) {
        if ([this.props.detailsBase, this.props.detailsGoal].sort().join() !== [temp[1], temp[2]].sort().join()) {
          return null;
        }
      }
      return (
        
        <tr key={value}>
          <td>{temp[0]}</td>
          <td>{temp[1]}</td>
          <td>{temp[2]}</td>
          <td>{temp[3]}</td>
          {!this.props.details ? (<td><button onClick={() => this.props.showDetails(temp[1], temp[2])}>filter</button></td>) : null}
          <td><button onClick={() => this.removeEntry(value)}>delete</button></td>
        </tr>
      );
    })
  }


  render() {
    const prev = this.props.details ? "History" : "Previous Queries";
    return (
      <div>
        <main className="content">
          <div> 
          New search:
          <QueryModal openModal={this.state.openModal} hideModal={this.hideModal} showHide={this.state.showHide} passQuery={this.state.passQuery} showDetails={this.props.showDetails} details={this.props.details}
            saveResult={this.saveResult} result={this.state.result}
          />
          <Button type="button" onClick={this.newSearch}>open</Button>
          </div>
        
        <br />
        <div className="table-responsive">
        <div>
          <h1 className="inner">{prev}</h1>
          <div className="inner">{this.props.details ? (<button onClick={this.props.hideDetails} className="button bg-info">Back to all queries</button>) : null}</div>
          </div>
          <table className="table table-bordered">
          <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Rate</th>
            {!this.props.details ? (<th>Filter Pair</th>) : null}
            <th>Delete</th>
              </tr>
          </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
        </main>
      </div>
    );
  };

}

export default ListPage;

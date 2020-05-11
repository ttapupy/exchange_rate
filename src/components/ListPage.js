import React from 'react';
import QueryModal from './QueryModal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { removeRate } from '../actions/rates';
import selectedRates from '../selectors/selectedRates';
import { setPairFilter } from '../actions/filters';


class ListPage extends React.Component {

  state = {
    openModal: false,
    showHide: "modal display-none",
    rates: {},
    details: false
  }

  showDetails = (base, goal) => {
    this.props.dispatch(setPairFilter(base, goal));
    this.setState({ details: true });
  };

  hideDetails = () => {
    this.props.dispatch(setPairFilter('', ''));
    this.setState({ details: false });
  };

  newSearch = () => {
    this.setState(() => ({ openModal: true }));
  };

  hideModal = () => {
    this.setState({ openModal: false, result: undefined });
  };

  removeEntry = (elem) => {
    this.props.dispatch(removeRate(elem));
  };

  renderTable() {
    const filteredData = selectedRates(this.props.rates, this.props.filters);
    return (
      filteredData.map((value) => {
        return (
          <tr key={value['id']}>
            <td>{value['date']}</td>
            <td>{value['base']}</td>
            <td>{value['goal']}</td>
            <td>{value['rate']}</td>
            {!this.state.details ? (<td><button onClick={() => this.showDetails(value['base'], value['goal'])}>filter</button></td>) : null}
            <td><button onClick={() => this.removeEntry(value)}>delete</button></td>
          </tr>
        )
      }));
  };


  render() {
    const prev = this.state.details ? "History" : "Previous Queries";
    return (
      <div>
        <main className="content">
          <div>
            New search:
          <QueryModal openModal={this.state.openModal} hideModal={this.hideModal} showHide={this.state.showHide} rates={this.state.rates} showDetails={this.showDetails} details={this.state.details}
            />
            <Button type="button" onClick={this.newSearch}>open</Button>
          </div>

          <br />
          <div className="table-responsive">
            <div>
              <h1 className="inner">{prev}</h1>
              <div className="inner">{this.state.details ? (<button onClick={this.hideDetails} className="button bg-info">Back to all queries</button>) : null}</div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Rate</th>
                  {!this.state.details ? (<th>Filter Pair</th>) : null}
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

};

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    filters: state.filters
  }
};

export default connect(mapStateToProps)(ListPage);

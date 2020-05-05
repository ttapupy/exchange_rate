import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import DetailsPage from './DetailsPage';

class QueryModal extends React.Component {

  state = {
    
    currencies: [],
    currNames: {},
    base: "",
    goal: ""
  }


  componentDidMount = () => {
    axios.get("https://api.frankfurter.app/currencies")
      .then(res => {
        const currNames = res.data;
        const currencies = [...Object.keys(currNames)];
        this.setState({
          currencies: currencies, currNames: currNames
        });
      })
      .catch(err => console.log(err));
  };

  getRates = (base, goal) => {
    console.log(this.state);
    axios.get(`https://api.frankfurter.app/latest?amount=1&from=${base}&to=${goal}`)
      .then(res => {
        const base = res.data.base
        const date = res.data.date
        const rates = JSON.stringify(res.data.rates);
        console.log("3: ", base, date, rates);
        this.props.saveResult(base, date, rates);
      })
      .catch(err => console.log(err));
  };

  DropDown = function (elem, index) {
    return <option key={index} value={elem}>{elem}</option>;
  };

  handleChangeBase = (e) => {
    this.setState({ base: e.target.value });
  };

  handleChangeGoal = (e) => {
    this.setState({ goal: e.target.value });
  };

 
  render() {
  return (
    <div className={this.props.showHide}>
      <Modal className="modal-main" isOpen={this.props.openModal} onRequestClose={this.props.hideModal} >
      <h3>vajon mi?</h3>
      <div>
          <div>
            <span>Select Base: </span>
            <select name="inputcurrency" autoFocus onChange={this.handleChangeBase}>
              <option>
                From
          </option>
              {this.state.currencies.map((c, index) => (this.DropDown(c, index)))}
            </select>
            <span>Select Goal: </span>
            <select name="outputcurrency" autoFocus onChange={this.handleChangeGoal}>
              <option>
                To
          </option>
              {this.state.currencies.map((c, index) => (this.DropDown(c, index)))}
            </select>
            <button onClick={() => this.getRates(this.state.base, this.state.goal)}>Get Rate</button>
          </div>
          <div id='result'>

          </div>
      </div>
        <button onClick={this.props.hideModal}>close</button>
      </Modal>
    </div>
  );
  }
};


export default QueryModal;

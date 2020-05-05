import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import DetailsPage from './DetailsPage';
import Button from 'react-bootstrap/Button';

class QueryModal extends React.Component {

  state = {
    
    currencies: [],
    currNames: {},
    base: "",
    goal: "",
    result: undefined
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
    axios.get(`https://api.frankfurter.app/latest?amount=1&from=${base}&to=${goal}`)
      .then(res => {
        const base = res.data.base
        const date = res.data.date
        const temp = res.data.rates
        const rate = temp[Object.keys(temp)[0]];
        const goal = [Object.keys(temp)[0]];
        const result = "  1 ".concat(base, " = ", rate, " ", goal);
        this.setState({result: result});
        this.props.saveResult(date, base, goal, rate);
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
    <div>
      <Modal className="mymodal" overlayClassName="myoverlay" isOpen={this.props.openModal} onRequestClose={this.props.hideModal} >
      <h3>vajon mi?</h3>
      <div>
          <div>
            <span>Select Base: </span>
            <select className="dropdown-header" name="inputcurrency" autoFocus onChange={this.handleChangeBase}>
              <option>
                From
          </option>
              {this.state.currencies.map((c, index) => (this.DropDown(c, index)))}
            </select>
            <br />
            <span>Select Goal: </span>
            <select className="dropdown-header" name="outputcurrency" autoFocus onChange={this.handleChangeGoal}>
              <option>
                To
          </option>
              {this.state.currencies.map((c, index) => (this.DropDown(c, index)))}
            </select> 
            <br />
            <p><span>  {this.state.result} </span></p>
            
            <Button onClick={() => this.getRates(this.state.base, this.state.goal)}>Get Rate</Button>
          </div>
          <div id='result'>
          
          </div>
      </div>
        <button className="btn btn-outline-dark" onClick={this.props.hideModal}>close</button>
      </Modal>
    </div>
  );
  }
};


export default QueryModal;

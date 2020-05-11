import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { addRate } from '../actions/rates';

class QueryModal extends React.Component {

  state = {

    currencies: [],
    currFull: {},
    base: "",
    goal: "",
    rateDate: new Date(),
    result: "",
    reversed: false,
    reverseRate: ""
  }

  componentDidMount = () => {
    axios.get("https://api.frankfurter.app/currencies")
      .then(res => {
        const currObject = res.data;
        const currencies = [...Object.keys(currObject)];
        this.setState({
          currencies: currencies, currFull: currObject
        });
      })
      .catch(err => console.log(err));
  };

  getRates = (base, goal) => {
    const dateString = this.state.rateDate.toISOString().substring(0, 10);
    axios.get(`https://api.frankfurter.app/${dateString}?amount=1&from=${base}&to=${goal}`)
      .then(res => {
        const base = res.data.base
        const temp = res.data.rates
        const rate = temp[Object.keys(temp)[0]];
        const goal = Object.keys(temp)[0];
        console.log(this.state.reversed);
        if (this.state.reversed) {
          const reverseRate = "  1 ".concat(base, " = ", rate, " ", goal);
          this.setState({ reverseRate: reverseRate });
        } else {
          const result = "  1 ".concat(base, " = ", rate, " ", goal);
          this.setState({ result: result });
        }
        this.props.showDetails(base, goal);
        const rateState = { date: dateString, base, goal, rate };
        this.props.dispatch(addRate(rateState));
      })
      .catch(err => console.log(err));
  };

  dropDown = (elem, index) => {
    return <option key={index} value={index}>{elem}</option>;
  };

  handleChangeBase = (e) => {
    this.setState({ base: e.target.value });
  };

  handleChangeGoal = (e) => {
    this.setState({ goal: e.target.value });
  };

  setDate = (date) => {
    this.setState({ rateDate: date });
  };

  exchange = (base, goal) => {
    this.setState({ reversed: false });
    this.getRates(base, goal);
  };

  getReverseOrder = (base, goal) => {
    const temp = base;
    this.setState({ base: goal, goal: temp, reversed: true });
    this.getRates(goal, base);
  };


  render() {
    return (
      <div>
        <Modal className=" content modalis mymodal" overlayClassName="myoverlay" isOpen={this.props.openModal} onRequestClose={this.props.hideModal} >
          <h3> How much is the fish? </h3>
          <div>
            <div>
              <div className="inner">
                <span>Select Base: </span>
                <select className="dropdown-header" name="inputcurrency" autoFocus onChange={this.handleChangeBase}>
                  <option>
                    From
              </option>
                  {Object.entries(this.state.currFull).map((pair) => (this.dropDown(pair[1], pair[0])))}
                </select>
              </div>
              <div className="inner">
                <DatePicker
                  todayButton="Today"
                  showYearDropdown 
                  showMonthDropdown 
                  selected={this.state.rateDate} onChange={this.setDate}
                  dateFormat="yyyy-MM-dd" />
              </div>
            </div>
            <br />
            <span>Select Goal: </span>
            <select className="dropdown-header" name="outputcurrency" autoFocus onChange={this.handleChangeGoal}>
              <option>
                To
              </option>
              {Object.entries(this.state.currFull).map((pair) => (this.dropDown(pair[1], pair[0])))}
            </select>
            <p><br /></p>
            <div className=" result">{this.state.result ? (<p>{this.state.result}</p>) : (<p><br /></p>)}
            </div>
            <div>
              <div className="inner">
                <Button onClick={() => this.exchange(this.state.base, this.state.goal)}>Get Rate</Button>
              </div>
              <div className="inner">
                <button className="btn btn-outline-dark" onClick={this.props.hideModal}>close</button>
              </div>
            </div>
            <br />
            <div>{this.state.result ? (
              <p><Button onClick={() => this.getReverseOrder(this.state.base, this.state.goal)}>Reverse Rate</Button></p>) : (<p><br /></p>)}
            </div>
            <div className=" reversed">{this.state.reversed ? (<p>{this.state.reverseRate}</p>) : (<p><br /></p>)}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
};
Modal.setAppElement('body');

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
  }
};

export default connect(mapStateToProps)(QueryModal);

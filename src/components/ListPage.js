import React from 'react';
import ReactDOM from "react-dom";
import Header from './Header';
import QueryModal from './QueryModal';
import '../App.css';
import axios from 'axios';
import DetailsPage from './DetailsPage';

class ListPage extends React.Component {

  state = {
    openModal: false,
  //   currencies: [],
  //   currNames: {},
  //   value: "",
  //   base: "",
  //   goal: "",
  //   rate: 0,
  //   passQuery: {}
  }
  

  newSearch = () => {
    this.setState(() => ({ openModal: true }));
  };

  hideModal = () => {
    this.setState({ openModal: false });
  };

  // componentDidMount = () => {
  //   axios.get("https://api.frankfurter.app/currencies")
  //     .then(res => {
  //       const currNames = res.data;
  //       const currencies = [...Object.keys(currNames)];
  //       console.log('currencies', currencies)
  //       // currencies.push(Object.keys(res.data.rates))
  //       this.setState({
  //         currencies: currencies, currNames: currNames
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  // getRates = (base, goal) => {
  //   console.log(this.state); 
  //   axios.get(`https://api.frankfurter.app/latest?amount=1&from=${base}&to=${goal}`)
  //     .then(res => {
  //       this.setState({
  //         passQuery: {base: res.data}
  //       });
  //       console.log("mi ez?", res.data);
  //     })
  //     .catch(err => console.log(err));
  // };

  // DropDown = function (elem, index) {
  //   return <option key={index} value={elem}>{elem}</option>;
  // };

  // handleChangeBase = (e) => {
  //   this.setState({ base: e.target.value });
  // };

  // handleChangeGoal = (e) => {
  //   this.setState({ goal: e.target.value });
  // };


  render() {

  //   return (
  //     <div>
  //       <span>Select Base: </span>
  //       <select name="inputcurrency" autoFocus onChange={this.handleChangeBase}>
  //         <option>
  //           From
  //         </option>
  //         {this.state.currencies.map((c, index) => (this.DropDown(c, index)))}
  //       </select>
  //       <span>Select Goal: </span>
  //       <select name="outputcurrency" autoFocus onChange={this.handleChangeGoal}>
  //         <option>
  //           To
  //         </option>
  //         {this.state.currencies.map((c, index) => (this.DropDown(c, index)))}
  //       </select>
  //       <button onClick={() => this.getRates(this.state.base, this.state.goal)}>Get Rate</button>
  //     </div>
  //   );
  
    return (
      <div>
        <Header />
        <main>
          <p>New search</p>
          <QueryModal openModal={this.state.openModal} hideModal={this.hideModal} />
          <button type="button" onClick={this.newSearch}>open</button>
        </main>
        <br />
        <div>Lista</div>
      </div>
    );
  };

}

export default ListPage;

import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { connect } from 'react-redux'
import { addRate } from '../actions/rates'
import { setPairFilter } from '../actions/filters'

function QueryModal(props) {

  const [mBase, setMBase] = useState('')
  const [mGoal, setMGoal] = useState('')
  const [rateDate, setRateDate] = useState(new Date())
  const [result, setResult] = useState('')
  const [reversed, setReversed] = useState(false)
  const [reverseRate, setReverseRate] = useState('')
  const [currencies, setCurrencies] = useState({})

  useEffect(() => {
    axios.get("https://api.frankfurter.app/currencies")
      .then(res => {
        setCurrencies(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  const getRates = (base, goal, rev) => {
    const dateString = rateDate.toISOString().substring(0, 10)
    axios.get(`https://api.frankfurter.app/${dateString}?amount=1&from=${base}&to=${goal}`)
      .then(res => {
        const base = res.data.base
        const temp = res.data.rates
        const rate = temp[Object.keys(temp)[0]]
        const goal = Object.keys(temp)[0]
        if (rev) {
          const reverseRate = "  1 ".concat(base, " = ", rate, " ", goal)
          setReverseRate(reverseRate)
          setReversed(true)
        } else {
          const result = "  1 ".concat(base, " = ", rate, " ", goal)
          setResult(result)
          setReversed(false)
        }
        props.dispatch(addRate({ date: dateString, base, goal, rate }))
        props.dispatch(setPairFilter(base, goal, true))
      })
      .catch(err => console.log(err))
  }

  const dropDown = (elem, index) => {
    return <option key={index} value={index}>{elem}</option>
  }


  return (
    <div>
      <Modal className=" content modalis mymodal" overlayClassName="myoverlay" isOpen={props.openModal} onRequestClose={props.hideModal} >
        <h3> How much is the fish? </h3>
        <div>
          <div>
            <div className="inner">
              <span>Select Base: </span>
              <select className="dropdown-header" name="inputcurrency" autoFocus onChange={(e) => setMBase(e.target.value)}>
                <option>
                  From
              </option>
                {Object.entries(currencies).map((pair) => (dropDown(pair[1], pair[0])))}
              </select>
            </div>
            <div className="inner">
              <DatePicker
                todayButton="Today"
                showYearDropdown
                showMonthDropdown
                selected={rateDate} onChange={date => setRateDate(date)}
                dateFormat="yyyy-MM-dd" />
            </div>
          </div>
          <br />
          <span>Select Goal: </span>
          <select className="dropdown-header" name="outputcurrency" autoFocus onChange={(e) => setMGoal(e.target.value)}>
            <option>
              To
              </option>
            {Object.entries(currencies).map((pair) => (dropDown(pair[1], pair[0])))}
          </select>
          <p><br /></p>
          <div className=" result">{result ? (<p>{result}</p>) : (<p><br /></p>)}
          </div>
          <div>
            <div className="inner">
              <Button onClick={() => getRates(mBase, mGoal, false)}>Get Rate</Button>
            </div>
            <div className="inner">
              <button className="btn btn-outline-dark" onClick={props.hideModal}>close</button>
            </div>
          </div>
          <br />
          <div>{result ? (
            <p><Button onClick={() => getRates(mGoal, mBase, true)}>Reverse Rate</Button></p>) : (<p><br /></p>)}
          </div>
          <div className=" reversed">{reversed ? (<p>{reverseRate}</p>) : (<p><br /></p>)}
          </div>
        </div>
      </Modal>
    </div>
  )
};
Modal.setAppElement('body');

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    filters: state.filters
  }
};

export default connect(mapStateToProps)(QueryModal);

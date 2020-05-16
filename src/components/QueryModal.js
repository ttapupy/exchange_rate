import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Button from 'react-bootstrap/Button'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { connect } from 'react-redux'
import { addRate } from '../actions/rates'
import { setPairFilter } from '../actions/filters'
import { setModal } from '../actions/modal'
import { setMBase } from '../actions/modal'
import { setMGoal } from '../actions/modal'
import { setResult } from '../actions/modal'
import { setReverseRate } from '../actions/modal'
import { getCurrencies } from '../actions/modal'


function QueryModal(props) {

  const [rateDate, setRateDate] = useState(new Date())
  const [reversed, setReversed] = useState(false)
  const [error, setError] = useState('')


  useEffect(() => {
    props.dispatch(getCurrencies())
  }, [])


  const getRates = (base, goal, rev) => {
    console.log('rateDate', rateDate)
    if (!base || !goal || base === goal || rateDate > new Date() ) {
      setError('Wrong query!')
      props.dispatch(setResult(''))
      props.dispatch(setReverseRate(''))
      return
    }
    const dateString = rateDate.toISOString().substring(0, 10)
    for (const value of props.rates) {
      let propDate = value['date']
      let propBase = value['base']
      let propGoal = value['goal']
      if (propBase === base && propGoal === goal && propDate === dateString) {
        setError('Query already has been stored.')
        props.dispatch(setResult(''))
        props.dispatch(setReverseRate(''))
        return
      }
    }
    setError('')
    props.dispatch(addRate({ date: dateString, base, goal, rev }))
    rev ? setReversed(true) : setReversed(false)
    props.dispatch(setPairFilter(base, goal, true))
  }

  const dropDown = (elem, index, show = '') => {
    if (!elem) {
      return <option key={show} value="">{show}</option>
    }
    return <option key={index} value={index}>{elem}</option>
  }

  const closeModal = () => {
    props.dispatch(setModal(false))
    setError('')
    props.dispatch(setResult(''))
    props.dispatch(setReverseRate(''))
    setRateDate(new Date())
  }


  return (
    <div>
      <Modal className="mymodal" overlayClassName="myoverlay" isOpen={props.modal.openModal} onRequestClose={closeModal} >
        <h3> How much is the fish? </h3>
        <div>
          <div>
            <div className="inner">
              <span>Select Base: </span>
              <select className="dropdown-header" autoFocus onChange={(e) => props.dispatch(setMBase(e.target.value))}>
                {dropDown(null, null, 'From')}
                {Object.entries(props.modal.currencies).map((pair) => (dropDown(pair[1], pair[0])))}
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
          <div>
            <div className="inner">
              <span>Select Goal: </span>
              <select className="dropdown-header" onChange={(e) => props.dispatch(setMGoal(e.target.value))}>
                {dropDown(null, null, 'To')}
                {Object.entries(props.modal.currencies).map((pair) => (dropDown(pair[1], pair[0])))}
              </select>
            </div>
            <div className="inner warning">{error}</div>
          </div>
          <p><br /></p>
          <div className=" result">{props.modal.result ? (<p>{props.modal.result}</p>) : (<p><br /></p>)}
          </div>
          <div>
            <div className="inner">
              <Button onClick={() => getRates(props.modal.mBase, props.modal.mGoal, false)}>Get Rate</Button>
            </div>
            <div className="inner">
              <button className="btn btn-outline-dark" onClick={closeModal}>close</button>
            </div>
          </div>
          <br />
          <div>{props.modal.result ? (
            <p><Button onClick={() => getRates(props.modal.mGoal, props.modal.mBase, true)}>Reverse Rate</Button></p>) : (<p><br /></p>)}
          </div>
          <div className=" reversed">{reversed ? (<p>{props.modal.reverseRate}</p>) : (<p><br /></p>)}
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
    filters: state.filters,
    modal: state.modal
  }
};

export default connect(mapStateToProps)(QueryModal);

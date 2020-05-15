import React from 'react'
import QueryModal from './QueryModal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { setModal } from '../actions/modal'
import { setMBase } from '../actions/modal'
import { setMGoal } from '../actions/modal'
import { setResult } from '../actions/modal'
import { setReverseRate } from '../actions/modal'
import { setPairFilter } from '../actions/filters'
import { setBaseFilter } from '../actions/filters'
import { setGoalFilter } from '../actions/filters'
import selectedRates from '../selectors/selectedRates'
import RenderTable from './RenderTable'
import RateChart from './RateChart'
import '../App.css'

function ListPage(props) {

  const openModal = () => {
    props.dispatch(setModal(true))
    props.dispatch(setMBase(''))
    props.dispatch(setMGoal(''))
    props.dispatch(setResult(''))
    props.dispatch(setReverseRate(''))
  }

  const columnFilter = (list, direction) => {
    if (!list) {
      return (<option key="all" value="">all</option>)
    }
    const elems = list.map((elem) => elem[direction]).filter((a, index, b) => b.indexOf(a) === index)
    return (
      elems.sort().map((elem) => <option key={elem} value={elem}>{elem}</option>)
      )
  }

  const prev = props.filters.details ? "History" : "Previous Queries"

  return (
    <div>
      <main className="content">
        <h6>
          <p className="text-danger">New search: </p>
          <QueryModal />
          <Button type="button" onClick={openModal}>open</Button>
        </h6>

        <br />
        {props.modal.openModal ?
          null :
          <div>
            <div>
              <h3 className="inner">{prev}</h3>
              <div className="inner">{props.filters.details ? (<button onClick={() => props.dispatch(setPairFilter(null, null, false))} className="button bg-info">Back to all queries</button>) : null}</div>
            </div>
            <div>
              <table className="inlineTable table">
                <thead className="table-body thead-dark" >
                  <tr>
                    <th>Date</th>
                    <th>
                      <span>From </span>
                      <select autoFocus onChange={(e) => props.dispatch(setBaseFilter(e.target.value))}>
                        {columnFilter(null, 'base')}
                        {!props.filters.details ? columnFilter(selectedRates(props.rates, props.filters), 'base') : null}
                      </select>
                    </th>
                    <th>
                      <span>To </span>
                      <select autoFocus onChange={(e) => props.dispatch(setGoalFilter(e.target.value))}>
                        {columnFilter(null, 'goal')}
                        {!props.filters.details ? columnFilter(selectedRates(props.rates, props.filters), 'goal') : null}
                      </select>
                    </th>
                    <th>Rate</th>
                    {!props.filters.details ? (<th>Filter Pair</th>) : null}
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <RenderTable />
                </tbody>
              </table>
              {props.filters.details ?
                <main className="inlineTable">
                  <RateChart />
                </main> :
                null}
            </div>
          </div>
        }
      </main>
      <p><br /></p>
    </div>
  )

};

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    filters: state.filters,
    modal: state.modal
  }
};

export default connect(mapStateToProps)(ListPage);

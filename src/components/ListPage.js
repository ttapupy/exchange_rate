import React from 'react'
import QueryModal from './QueryModal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { setModal } from '../actions/modal'
import { setPairFilter } from '../actions/filters'
import RenderTable from './RenderTable'
import RateChart from './RateChart'

function ListPage(props) {

  const prev = props.filters.details ? "History" : "Previous Queries"

  return (
    <div>
      <main className="content">
        <h6>
          <p className="text-danger">New search: </p>
          <QueryModal />
          <Button type="button" onClick={() => props.dispatch(setModal(true))}>open</Button>
        </h6>

        <br />
        {props.modal.openModal ?
          null :
          <div>
            <div>
              <h3 className="inner">{prev}</h3>
              <div className="inner">{props.filters.details ? (<button onClick={() => props.dispatch(setPairFilter('', '', false))} className="button bg-info">Back to all queries</button>) : null}</div>
            </div>
            <div>
              <table className="inlineTable table">
                <thead className="table-body thead-dark" >
                  <tr>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
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

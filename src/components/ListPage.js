import React, { useState, useEffect } from 'react'
import QueryModal from './QueryModal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { removeRate } from '../actions/rates'
import selectedRates from '../selectors/selectedRates'
import { setPairFilter } from '../actions/filters'


function ListPage(props) {

  const [openModal, setOpenModal] = useState(false)


  const newSearch = () => {
    setOpenModal(true)
  }

  const hideModal = () => {
    setOpenModal(false)
  }

  const removeEntry = (elem) => {
    props.dispatch(removeRate(elem))
  }

  const renderTable = () => {
    const filteredData = selectedRates(props.rates, props.filters)
    return (
      filteredData.map((value) => {
        return (
          <tr key={value['id']}>
            <td>{value['date']}</td>
            <td>{value['base']}</td>
            <td>{value['goal']}</td>
            <td>{value['rate']}</td>
            {!props.filters.details ? (<td><button onClick={() => props.dispatch(setPairFilter(value['base'], value['goal'], true))}>filter</button></td>) : null}
            <td><button onClick={() => removeEntry(value)}>delete</button></td>
          </tr>
        )
      }))
  }



  const prev = props.filters.details ? "History" : "Previous Queries"
  return (
    <div>
      <main className="content">
        <div>
          New search:
          <QueryModal openModal={openModal} hideModal={hideModal} 
          />
          <Button type="button" onClick={() => newSearch()}>open</Button>
        </div>

        <br />
        <div className="table-responsive">
          <div>
            <h1 className="inner">{prev}</h1>
            <div className="inner">{props.filters.details ? (<button onClick={() => props.dispatch(setPairFilter('', '', false))} className="button bg-info">Back to all queries</button>) : null}</div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Rate</th>
                {!props.filters.details ? (<th>Filter Pair</th>) : null}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {renderTable()}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )

};

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    filters: state.filters
  }
};

export default connect(mapStateToProps)(ListPage);

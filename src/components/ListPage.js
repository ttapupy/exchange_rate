import React, { useState, useEffect } from 'react'
import QueryModal from './QueryModal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { removeRate } from '../actions/rates'
import selectedRates from '../selectors/selectedRates'
import { setPairFilter } from '../actions/filters'


function ListPage(props) {

  const [openModal, setOpenModal] = useState(false)
  const [details, setDetails] = useState(false)


  const showDetails = (base, goal) => {
    props.dispatch(setPairFilter(base, goal))
    setDetails(true)
  }

  const hideDetails = () => {
    props.dispatch(setPairFilter('', ''))
    setDetails(false)
  }

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
            {!details ? (<td><button onClick={() => showDetails(value['base'], value['goal'])}>filter</button></td>) : null}
            <td><button onClick={() => removeEntry(value)}>delete</button></td>
          </tr>
        )
      }))
  }



  const prev = details ? "History" : "Previous Queries"
  return (
    <div>
      <main className="content">
        <div>
          New search:
          <QueryModal openModal={openModal} hideModal={hideModal} showDetails={showDetails} details={details}
          />
          <Button type="button" onClick={() => newSearch()}>open</Button>
        </div>

        <br />
        <div className="table-responsive">
          <div>
            <h1 className="inner">{prev}</h1>
            <div className="inner">{details ? (<button onClick={() => hideDetails()} className="button bg-info">Back to all queries</button>) : null}</div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Rate</th>
                {!details ? (<th>Filter Pair</th>) : null}
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

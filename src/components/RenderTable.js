import React from 'react'
import { connect } from 'react-redux'
import selectedRates from '../selectors/selectedRates'
import { setPairFilter } from '../actions/filters'
import { removeRate } from '../actions/rates'

function RenderTable(props) {
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
          <td><button onClick={() => props.dispatch(removeRate(value))}>delete</button></td>
        </tr>
      )
    }))
};

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    filters: state.filters,
    modal: state.modal
  }
};

export default connect(mapStateToProps)(RenderTable);

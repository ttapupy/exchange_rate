import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import { connect } from 'react-redux'
import selectedRates from '../selectors/selectedRates'

function RateChart(props) {

  const calculate = () => {
    const filteredData = selectedRates(props.rates, props.filters)
    const [baseChart, goalChart] = [filteredData[0]['base'], filteredData[0]['goal']]
    let [data1, data2] = [[], []]

    for (const value of filteredData) {
      const dateTime = new Date(value['date'])
      const invRate = Number(Math.round(1 / value['rate'] + 'e' + 5) + 'e-' + 5)
      if (value['base'] == baseChart) {
        data1.push([dateTime, value['rate']])
        data2.push([dateTime, invRate])
      } else {
        data1.push([dateTime, invRate])
        data2.push([dateTime, value['rate']])
      }
    }

    return (
      [{
        label: baseChart,
        data: data1
      },
      {
        label: goalChart,
        data: data2
      }]
    )
  }


  const data = React.useMemo(
    () => calculate(),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} tooltip />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    filters: state.filters,
    modal: state.modal
  }
};

export default connect(mapStateToProps)(RateChart);

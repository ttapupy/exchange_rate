import React from 'react'
import { Chart } from 'react-charts'
import { connect } from 'react-redux'
import selectedRates from '../selectors/selectedRates'

function RateChart(props) {

  const calculate = () => {

    const filteredData = selectedRates(props.rates, props.filters)
    console.log('filteredData', filteredData)
    let [baseChart, goalChart] = ['', '']
    baseChart = filteredData[0]['base']
    goalChart = filteredData[0]['goal']
    let data = []

    for (const value of filteredData) {
      const dateTime = new Date(value['date'])
      data.push({ x: dateTime, y: value['rate'] })
    }

    return (
      [{
        label: `${baseChart} \ ${goalChart}`,
        data: data
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

  // mondjuk ezt itt nem veszi figyelembe...
  // const options = () => (
  //   {
  //     scales: {
  //       xAxes: [{
  //         type: 'time',
  //         distribution: 'series'
  //       }],
  //       yAxes: [{
  //         ticks: {
  //           stepSize: 0.5
  //         }
  //       }]
  //     },
  //     tooltips: {
  //       callbacks: {
  //         label: function (tooltipItem, data) {
  //           return tooltipItem.xLabel.substring(tooltipItem.xLabel.length - 8, tooltipItem.xLabel.length) + tooltipItem.yLabel;
  //         },
  //       }
  //     }
  //   }
  // )

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

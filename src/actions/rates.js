import { v4 as uuid } from 'uuid';
import axios from 'axios'
import { setResult } from './modal'
import { setReverseRate } from './modal'


export const addRate = ({ id = uuid(), date = '', base = '', goal = '', rate = 0, rev = false } = {}) => {

  const request = () => ({ type: 'FETCH_RATE' })
  const success = exchange => ({ type: 'ADD_RATE', rates: exchange })
  const failure = error => ({ type: 'FETCH_RATE_ERROR', rates: error })

  return (dispatch) => {
    
    dispatch(request())

    return axios.get(`https://api.frankfurter.app/${date}?amount=1&from=${base}&to=${goal}`)
      .then(
        res => {
          const temp = res.data.rates
          const rate = temp[Object.keys(temp)[0]]
          const exchange = { id, date, base, goal, rate }
          localStorage.setItem(id, JSON.stringify({ id, date, base, goal, rate }))
          dispatch(success(exchange))
          const result = "  1 ".concat(base, " = ", rate, " ", goal)
          rev ? dispatch(setReverseRate(result)) : dispatch(setResult(result))
          
        }
    ).catch(error => dispatch(failure(error)));
  }
};

export const removeRate = ({ id }) => {
  localStorage.removeItem(id)
  return (
    {
      type: 'REMOVE_RATE',
      id
    })
};


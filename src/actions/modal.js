import axios from 'axios'

export const setModal = (openModal = false) => ({
  type: 'SET_MODAL',
  openModal
});

export const setMBase = (mBase = '') => ({
  type: 'SET_MODAL_BASE',
  mBase
});

export const setMGoal = (mGoal = '') => ({
  type: 'SET_MODAL_GOAL',
  mGoal
});

export const setResult = (result = '') => ({
  type: 'SET_RESULT',
  result
});

export const setReverseRate = (reverseRate = '') => ({
  type: 'SET_REVERSE_RATE',
  reverseRate
});


export const getCurrencies = () => {

  const request = () => ({ type: 'FETCH_CURRENCIES' });
  const success = response => ({ type: 'FETCH_CURRENCIES_SUCCESS', currencies: response.data });
  const failure = error => ({ type: 'FETCH_CURRENCIES_ERROR', currencies: error });


  return (dispatch) => {
    const url = 'https://api.frankfurter.app/currencies';
    dispatch(request());

    return axios.get(url)
      .then(
        response => dispatch(success(response)),
        error => dispatch(failure(error))
      );
  };
};

  



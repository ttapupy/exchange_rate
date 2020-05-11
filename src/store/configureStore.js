import { createStore, combineReducers } from 'redux';
import ratesReducer from '../reducers/ratesReducer';
import filtersReducer from '../reducers/filtersReducer';


export default () => {
  const store = createStore(
    combineReducers({
      rates: ratesReducer,
      filters: filtersReducer
    })
  );
  return store;
};

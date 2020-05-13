import { createStore, combineReducers } from 'redux';
import ratesReducer from '../reducers/ratesReducer';
import filtersReducer from '../reducers/filtersReducer';
import userReducer from '../reducers/userReducer'


export default () => {
  const store = createStore(
    combineReducers({
      rates: ratesReducer,
      filters: filtersReducer,
      user: userReducer
    })
  );
  return store;
};

import { createStore, combineReducers, applyMiddleware } from 'redux';
import ratesReducer from '../reducers/ratesReducer';
import filtersReducer from '../reducers/filtersReducer';
import userReducer from '../reducers/userReducer'
import modalReducer from '../reducers/modalReducer'
import thunk from 'redux-thunk';


export default () => {
  const store = createStore(
    combineReducers({
      rates: ratesReducer,
      filters: filtersReducer,
      user: userReducer,
      modal: modalReducer
    }), applyMiddleware(thunk)
  );
  return store;
};

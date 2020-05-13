
const persistedState = (localStorage.getItem('reduxRates') ? JSON.parse(localStorage.getItem('reduxRates')) : []);

const ratesReducer = (state = persistedState, action) => {
  switch (action.type) {
    case 'ADD_RATE':
      return [...state, action.rate];
    case 'REMOVE_RATE':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export default ratesReducer;


const persistedState = (localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState'))['rates'] : []);

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


let persistedState = (function () {
  let ps = []
  Object.keys(localStorage).filter((key) => key !== 'reduxUser').forEach(key =>
    ps.push(JSON.parse(localStorage[key])))
  return ps
})();


const ratesReducer = (state = persistedState, action) => {
  switch (action.type) {
    case 'ADD_RATE':
      return [...state, action.rates];
    case 'FETCH_RATE':
      return state;  
    case 'REMOVE_RATE':
      return state.filter(({ id }) => id !== action.id);
    case 'FETCH_RATE_ERROR':  
    default:
      return state;
  }
};

export default ratesReducer;

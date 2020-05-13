const filtersReducerDefaultState = {
  base: '',
  goal: '',
  details: false
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PAIR_FILTER':
      return { ...state, base: action.base, goal: action.goal, details: action.details };
    default:
      return state;
  }
};

export default filtersReducer;

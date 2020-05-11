const filtersReducerDefaultState = {
  base: '',
  goal: ''
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PAIR_FILTER':
      return { ...state, base: action.base, goal: action.goal };
    default:
      return state;
  }
};

export default filtersReducer;

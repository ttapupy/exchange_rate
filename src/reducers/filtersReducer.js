const filtersReducerDefaultState = {
  base: '',
  goal: '',
  details: false
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'SET_PAIR_FILTER':
      return { ...state, base: action.base, goal: action.goal, details: action.details };
    case 'SET_BASE_FILTER':
      console.log({ ...state, base: action.base })
      return { ...state, base: action.base };
    case 'SET_GOAL_FILTER':
      return { ...state, goal: action.goal };
    default:
      return state;
  }
};

export default filtersReducer;

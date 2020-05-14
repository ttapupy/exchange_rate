export const setPairFilter = (base = '', goal = '', details = false) => ({
  type: 'SET_PAIR_FILTER',
  base,
  goal,
  details
});

export const setBaseFilter = (base = '', details = false) => ({
  type: 'SET_BASE_FILTER',
  base,
  details
});

export const setGoalFilter = (goal = '', details = false) => ({
  type: 'SET_GOAL_FILTER',
  goal,
  details
});





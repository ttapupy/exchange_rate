const userReducer = (state = { uname: undefined }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return  { ...state, uname: action.uname }
    default:
      return state
  }
};

export default userReducer;

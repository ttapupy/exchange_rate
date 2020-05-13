const persistedState = localStorage.getItem('reduxUser')

const userReducer = (state = { uname: persistedState }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return  { ...state, uname: action.uname }
    case 'LOGOUT':
      return { ...state, uname: action.uname }
    default:
      return state
  }
};

export default userReducer;

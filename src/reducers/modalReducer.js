const modalReducerDefaultState = {
  openModal: false
};

const modalReducer = (state = modalReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return { ...state, openModal: action.openModal };
    default:
      return state;
  }
};

export default modalReducer;

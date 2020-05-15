const modalReducerDefaultState = { 
  openModal: false,
  currencies: [],
  mBase: '',
  mGoal: '',
  result: '',
  reversed: false,
  reverseRate: '',
  error: ''

};

const modalReducer = (state = modalReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return { ...state, openModal: action.openModal };
    case 'SET_MODAL_BASE':
      return { ...state, mBase: action.mBase };
    case 'SET_MODAL_GOAL':
      return { ...state, mGoal: action.mGoal };
    case 'SET_RESULT':
      return { ...state, result: action.result };
    case 'SET_REVERSE_RATE':
      return { ...state, reverseRate: action.reverseRate };  
    case 'FETCH_CURRENCIES' :
      return state;
    case 'FETCH_CURRENCIES_SUCCESS':
      return { ...state, currencies: action.currencies };
    case 'FETCH_CURRENCIES_ERROR':  
    default:
      return state;
  }
};

export default modalReducer;

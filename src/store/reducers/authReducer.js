import isEmpty from 'lodash/isEmpty';

const initState = {
  isAuthenticated: false,
  user: {},
  error: ""
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    case 'LOGIN_ERROR':
      return {
        error: action.error
      }
    default:
      return state;
  }
}

export default authReducer;
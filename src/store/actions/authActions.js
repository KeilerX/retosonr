import * as api from '../../api/api';
import axios from 'axios';
import setAuthorizationToken from '../../utils/authorizationToken';
import jwt from 'jsonwebtoken';

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

export const setLoginError = (error) => {
  return {
    type: 'LOGIN_ERROR',
    error
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export const login = (user) => {
  return dispatch => {
    return axios.post(api.url + '/auth/login', user).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    }).catch(e => {
      if (e.response) {
        console.log(e.response.data.message);
        dispatch(setLoginError(e.response.data.message));
        setTimeout(() => {
          dispatch(setLoginError(''));
        }, 2000);
      }
    });
  }
}
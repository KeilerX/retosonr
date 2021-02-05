import axios from 'axios';
import * as api from '../../api/api';

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(api.url + '/users');
    dispatch({ type: 'GET_USERS', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(api.url + '/users', user);
    dispatch({ type: 'CREATE_USER', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
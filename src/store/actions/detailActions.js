import axios from 'axios';
import * as api from '../../api/api';

export const getObservationsPerEmployee = () => async (dispatch) => {
  try {
    const { data } = await axios.get(api.url + '/observations/employees');
    dispatch({ type: 'GET_OBSERVATIONS_PER_EMPLOYEE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
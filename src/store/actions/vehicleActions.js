import axios from 'axios';
import * as api from '../../api/api';

export const getVehicles = () => async (dispatch) => {
  try {
    const { data } = await axios.get(api.url + '/vehicles');
    dispatch({ type: 'GET_VEHICLES', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createVehicle = (vehicle) => async (dispatch) => {
  try {
    const { data } = await axios.post(api.url + '/vehicles', vehicle);
    dispatch({ type: 'CREATE_VEHICLE', payload: data });
  } catch (error) {
    console.log(error.message)
  }
} 
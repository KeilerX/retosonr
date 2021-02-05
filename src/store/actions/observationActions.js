import axios from 'axios';
import * as api from '../../api/api';

export const getObservations = () => async (dispatch) => {
  try {
    const { data } = await axios.get(api.url + '/observations');
    dispatch({ type: 'GET_OBSERVATIONS', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createObservation = (observation) => async (dispatch) => {
  try {
    const { data } = await axios.post(api.url + '/observations', observation);
    dispatch({ type: 'CREATE_OBSERVATION', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const editObservation = (observation, id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(api.url + `/observations/${id}`, observation);
    dispatch({ type: 'UPDATE_OBSERVATION', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteObservation = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(api.url + `/observations/${id}`);
    dispatch({ type: 'DELETE_OBSERVATION', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const updateStatusObservation = (observation, id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(api.url + `/observations/status/${id}`, observation);
    dispatch({ type: 'UPDATE_OBSERVATION', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
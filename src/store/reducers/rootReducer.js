import { combineReducers } from 'redux';
import vehicleReducer from './vehicleReducer';
import userReducer from './userReducer';
import observationReducer from './observationReducer';
import detailReducer from './detailReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  vehicles: vehicleReducer,
  users: userReducer,
  observations: observationReducer,
  details: detailReducer,
  auth: authReducer
});

export default rootReducer;
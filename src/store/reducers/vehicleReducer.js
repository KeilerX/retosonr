const vehicleReducer = (vehicles = [], action) => {
  switch (action.type) {
    case 'GET_VEHICLES':
      return action.payload;
    case 'CREATE_VEHICLE':
      return [...vehicles, action.payload.newVehicle];
    default:
      return vehicles;
  }
}

export default vehicleReducer;
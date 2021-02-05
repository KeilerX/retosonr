const detailReducer = (details = [], action) => {
  switch (action.type) {
    case 'GET_OBSERVATIONS_PER_EMPLOYEE':
      return action.payload;
    default:
      return details;
  }
}

export default detailReducer;
const observationReducer = (observations = [], action) => {
  switch (action.type) {
    case 'GET_OBSERVATIONS':
      return action.payload;
    case 'CREATE_OBSERVATION':
      return [...observations, action.payload.newObservation];
    case 'DELETE_OBSERVATION':
      return [
        ...observations.filter(o => o.id !== action.payload.observationDeleted.id)
      ];
    case 'UPDATE_OBSERVATION':
      return [...observations, action.payload.observation];
    default:
      return observations;
  }
}

export default observationReducer;
const userReducer = (users = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.payload;
    case 'CREATE_USER':
      return [...users, action.payload.newUser];
    default:
      return users;
  }
}

export default userReducer;
const initialState = {
  username: "",
  userId: null,
  users: []
};

const SET_USER = "SET_USER";
const SET_GROUP_USERS = "SET_GROUP_USERS";
const USER_LEAVE = "USER_LEAVE";

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload.username, action.payload.userId);
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload.userId
      };
    case SET_GROUP_USERS:
      let updatedUsers = state.users.concat(action.payload);
      return { ...state, users: updatedUsers };
    case USER_LEAVE:
      let userLeft = state.users.splice(action.payload, 1);
      console.log(userLeft);
      return { ...state, user: userLeft };
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    type: "SET_USER",
    payload: user
  };
}

export function setGroupUsers(user) {
  console.log(user);
  return {
    type: "SET_GROUP_USERS",
    payload: user
  };
}

export function userLeft(index) {
  console.log(index);
  return {
    type: "USER_LEAVE",
    payload: index
  };
}

export default reducer;

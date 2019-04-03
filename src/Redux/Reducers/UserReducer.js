const initialState = {
  userId: null,
  username: "",
  users: [],
  userLogOut: "",
  backdrop: true
  // userCheck: false
};

const SET_USER = "SET_USER";
const SET_GROUP_USERS = "SET_GROUP_USERS";
const USER_LEAVE = "USER_LEAVE";
const USER_LOGOUT = "USER_LOGOUT";
// const SET_BACKDROP = "SET_BACKDROP";
// const USER_CHECK = "USER_CHECK";

function reducer(state = initialState, action) {
  switch (action.type) {
    // case SET_BACKDROP:
    //   return { ...state, backdrop: action.payload };
    case USER_LOGOUT:
      return { ...state, userLogOut: action.payload };
    case SET_USER:
      return { ...state, username: action.payload };
    case SET_GROUP_USERS:
      let updatedUsers = state.users.concat(action.payload);
      return { ...state, users: updatedUsers };
    case USER_LEAVE:
      let userLeft = state.users.splice(action.payload, 1);
      return { ...state, user: userLeft };
    // case USER_CHECK:
    //   return { ...state, userCheck: action.payload };
    default:
      return state;
  }
}

// export function setBackdrop(value) {
//   return {
//     type: "SET_BACKDROP",
//     payload: value
//   };
// }

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

export function userLogOut(user) {
  return {
    type: "USER_LOGOUT",
    payload: user
  };
}

// export function userCheck(user) {
//   return {
//     type: "USER_CHECK",
//     payload: true
//   };
// }

export default reducer;

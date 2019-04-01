const initialState = {
  newRoom: {},
  rooms: [],
};


const CREATE_ROOM = "CREATE_ROOM";
const ADD_ROOM = 'ADD_ROOM';
const SET_ROOMS = 'SET_ROOMS'

export default function RoomReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOMS:
      return {...state, rooms: action.payload}
    case ADD_ROOM:
    let addRoom = action.payload
    let updatedRooms = state.rooms.concat(addRoom)
      return {...state, rooms: updatedRooms}
    case CREATE_ROOM:
      console.log(state);
      console.log(action.payload);
      let newRoom = {
        id: action.payload.id,
        roomName: action.payload.title,
        description: action.payload.description,
        owner: action.payload.owner || "",
        videoUrl: action.payload.url,
        likes: 0,
        dislikes: 0,
        categories: action.payload.categories
      };
      console.log(newRoom);
      let newRooms = state.rooms.concat(newRoom);
      console.log(state.newRoom);
      return { ...state, rooms: newRooms, newRoom: newRoom };
    default:
      return state;
  }
}

export function createRoom(room) {
  return {
    type: CREATE_ROOM,
    payload: room
  };
}

export function addRoom (room) {
  return {
    type: ADD_ROOM,
    payload: room
  }
}

export function setRooms (rooms) {
  return {
    type: SET_ROOMS,
    payload: rooms
  }
}
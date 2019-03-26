const initialState = {
    rooms: [
        {
            id: 1,
            roomName:'room 1',
            description: 'happy happy joy joy', 
            owner: 'Daniel',
            videoUrl: 'https://www.youtube.com/embed/HZFTUtbn1RU'
        },
        {
            id: 2,
            roomName:'room2',
            description: 'cats', 
            owner: 'Bryce',
            videoUrl: 'https://youtu.be/XJYmyYzuTa8'
        }
    ]
}

let id = 3;

const CREATE_ROOM = "CREATE_ROOM";

export default function RoomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      console.log(state);
      console.log(action.payload);
      let newRoom = {
        id: id++,
        roomName: action.payload.title,
        description: action.payload.description,
        owner: "redux",
        videoUrl: action.payload.url
      };
      let newRooms = state.rooms.concat(newRoom);
      console.log(newRoom);
      return { ...state, rooms: newRooms };
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

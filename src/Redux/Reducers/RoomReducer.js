const initialState = {
  rooms: [
    {
      id: 1,
      roomName: "Lobby",
      description: "Enjoy time with your peers here!",
      owner: "Administrator",
      videoUrl: "https://www.youtube.com/embed/lrX6ktLg8WQ"
    },
    {
      id: 2,
      roomName: "Music",
      description: "Listen and relax to amazing tunes.",
      owner: "Administrator",
      videoUrl: "https://www.youtube.com/embed/XJYmyYzuTa8"
    },
    {
      id: 3,
      roomName: "Gaming",
      description: "Dive into the world of eSports here.",
      owner: "Administrator",
      videoUrl: "https://www.youtube.com/embed/nCSqao5nR_4"
    },
    {
      id: 4,
      roomName: "Education",
      description: "Learn about the most recent advancements in the world of technology.",
      owner: "Administrator",
      videoUrl: "https://www.youtube.com/embed/fT6mzqBAqmo"
    },
    {
      id: 5,
      roomName: "Comedy",
      description: "Take a load off and laugh with your friends.",
      owner: "Administrator",
      videoUrl: "https://www.youtube.com/embed/HZFTUtbn1RU"
    },
    {
      id: 6,
      roomName: "Sports",
      description: "Watch teams battle for trophies in the world of profession sports.",
      owner: "Administrator",
      videoUrl: "https://www.youtube.com/embed/IoN4w2o8AxY"
    }
  ],
};

let id = 7;

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
        owner: action.payload.owner || "",
        videoUrl: action.payload.url,
        likes: 0,
        dislikes: 0,
        categories: action.payload.categories
      };
      console.log(newRoom);
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

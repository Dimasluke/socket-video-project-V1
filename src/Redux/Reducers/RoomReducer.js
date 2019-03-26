const initialState = {
  //somthing random
  rooms: [
    {
      id: 1,
      roomName: "room 1",
      description: "happy happy joy joy",
      owner: "Daniel",
      videoUrl: "https://youtu.be/HZFTUtbn1RU"
    },
    {
      id: 2,
      roomName: "room2",
      description: "cats",
      owner: "Bryce",
      videoUrl: "https://youtu.be/XJYmyYzuTa8"
    }
  ]
};

function RoomReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default RoomReducer;

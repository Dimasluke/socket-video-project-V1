const roomManagement = {}

module.exports = {
    joinRoom: data => {
        if(roomManagement[data.room]){
            roomManagement[data.room].push(data.user)
        } else {
            roomManagement[data.room] = []
            roomManagement[data.room].push(data.user)
        }
        socket.join(data.room);
        io.in(data.room).emit("join room", { room: data.room, user: data.user, userList: roomManagement[data.room] });
    }
}
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const socket = require("socket.io");
const massive = require("massive");
const session = require("express-session");
const userController = require("./controllers/UserController");
const roomController = require('./controllers/RoomController')
const socketController = require("./controllers/SocketController");
const friendsController = require("./controllers/FriendsController");

app.use(bodyParser.json());
require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 14
    }
  })
);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    console.log("Connected to database.");
    app.set("db", db);
    db.init();
  })
  .catch(err => {
    console.log(err);
  });

app.get('/api/rooms', roomController.getRooms)
app.post('/api/rooms', roomController.newRoom)
app.delete('/api/delete', roomController.deleteRoom)

app.get("/api/sessionInfo", userController.sessionInfo);
app.get("/api/userInfo/:id", userController.getUserInfo);
app.put("/api/userInfo", userController.editUserInfo);
app.post("/api/register", userController.register);
app.post("/api/login", userController.login);
app.post("/api/logout", userController.logout);

// Friend endpoints
app.get("/api/friends/:username", friendsController.getFriends);
app.post("/api/friend", friendsController.addFriend);
app.delete("/api/friend/:username/:friend", friendsController.removeFriend);

const port = process.env.PORT || 4000;
const io = socket(
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
);
const roomManagement = {};

io.on("connection", socket => {
  console.log("User Connected");

  socket.on("join room", data => {
    if (data.user) {
      if (roomManagement[data.room]) {
        roomManagement[data.room].push(data.user);
      } else {
        roomManagement[data.room] = [];
        roomManagement[data.room].push(data.user);
      }
    }
    console.log(roomManagement);
    socket.join(data.room);
    io.in(data.room).emit("join room", {
      room: data.room,
      user: data.user,
      userList: roomManagement[data.room] || []
    });
  });

  socket.on("leave room", data => {
    if (data.user) {
      if (roomManagement[data.room]) {
        let userIndex = roomManagement[data.room].indexOf(data.user);
        roomManagement[data.room].splice(userIndex, 1);
      }
    }
    io.in(data.room).emit("user left", {
      room: data.room,
      user: data.user,
      userList: roomManagement[data.room]
    });
    socket.leave(data.room).emit("room left", {
      room: data.room,
      user: data.user,
      userList: roomManagement[data.room]
    });
  });

  socket.on("message sent", data => {
    io.in(data.room).emit("message from server", {
      user: data.user,
      message: data.message,
      room: data.room
    });
  });

  socket.on("new room", data => {
    console.log(data);
    socket.broadcast.emit("add new room", data.newRoom);
  });
});

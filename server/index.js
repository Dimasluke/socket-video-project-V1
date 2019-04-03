const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io");
const massive = require("massive");
const session = require("express-session");
const userController = require("./controllers/UserController");
const roomController = require("./controllers/RoomController");
const socketController = require("./controllers/SocketController");
const friendsController = require("./controllers/FriendsController");
const path = require("path");

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

app.use(express.static(`${__dirname}/../build`));

app.get("/api/rooms", roomController.getRooms);
app.post("/api/rooms", roomController.newRoom);
app.delete("/api/rooms/:id", roomController.deleteRoom);

app.get("/api/sessionInfo", userController.sessionInfo);
app.get("/api/users", userController.getAllUsers);
app.get("/api/userInfo/:id", userController.getUserInfo);
app.put("/api/userInfo", userController.editUserInfo);
app.post("/api/register", userController.register);
app.post("/api/login", userController.login);
app.post("/api/logout", userController.logout);

// Friend endpoints
app.get("/api/friends/:username", friendsController.getFriends);
app.post("/api/friend", friendsController.addFriend);
app.delete("/api/friend/:username/:friend", friendsController.removeFriend);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// const port = process.env.PORT || 4000;
// const io = socket(
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   })
// );
const io = require("socket.io")(server);

const roomManagement = {};
const clientManagement = {};

server.listen(4000, () => {
  console.log("server listening on 4000");
});

io.set("origins", "*:*");
io.on("connection", socket => {
  console.log("User Connected");

  socket.on("logged in user", data => {
    clientManagement[data.user] = data.user;
    console.log("clientManagement", clientManagement);
  });

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
    socket.broadcast.emit("add new room", data.newRoom);
  });

  socket.on("owner has left room", data => {
    io.in(data.room).emit("owner has disconnected");
  });

  socket.on("update time", data => {
    io.in(data.room).emit("room owner has changed the time", {
      time: data.time
    });
  });

  socket.on("pause or play video", data => {
    console.log(data);
    socket.in(data.room).emit("room owner has paused or resumed the video", {
      time: data.time,
      pause: data.pause
    });
  });
  socket.on("user leaving", data => {
    console.log(data);
  });
  socket.on("disconnect", data => {
    console.log("bye bye", data);
  });
});

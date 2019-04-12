import React, { Component } from "react";
import socketIo from "socket.io-client";
import { connect } from "react-redux";
import { setGroupUsers, userLeft } from "../../../Redux/Reducers/UserReducer";
import { sendTime, playPauseVideo } from "../../../Redux/Reducers/timeReducer";
import { addRoom, setRooms } from "../../../Redux/Reducers/RoomReducer";
import { withRouter } from "react-router-dom";
import "./Messenger.css";
import axios from "axios";
const io = socketIo();

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      selectedRoom: {},
      messageText: "",
      users: []
    };

    io.on("message from server", data => {
      this.setState({
        messages: [...this.state.messages, data]
      });
    });

    io.on("join room", data => {
      this.setState({
        users: data.userList
      });
      let messagesCopy = this.state.messages.map(message => {
        return message;
      });
      if (data.user) {
        messagesCopy.push(data.user + " has joined the room.");
      }
      this.setState({
        messages: messagesCopy
      });
    });

    io.on("room left", data => {
      console.log("room left heard on client side", data);
      let mappedUsers = this.state.users.map(user => {
        return user;
      });
      let findUser = this.state.users.indexOf(data.user);
      mappedUsers.splice(findUser, 1);
      console.log("mapped users", mappedUsers);
      this.setState({
        users: mappedUsers
      });
    });

    io.on("user left", data => {
      console.log("a user has left", data);
      let mappedUsers = this.state.users.map(user => {
        return user;
      });
      if (data.user) {
        let findUser = this.state.users.indexOf(data.user);
        mappedUsers.splice(findUser, 1);
      }
      if (data.user === data.room) {
        io.emit("owner has left room", data);
        axios.delete(`/api/rooms/${data.user}`).then(response => {
          this.props.setRooms(response.data);
        });
      }
      console.log("mapped users", mappedUsers);
      this.setState({
        users: mappedUsers
      });
      let messagesCopy = this.state.messages.map(message => {
        return message;
      });
      if (data.user) {
        messagesCopy.push(data.user + " has left the room.");
      }
      this.setState({
        messages: messagesCopy
      });
    });

    io.on("owner has disconnected", data => {
      this.props.history.push("/dashboard");
    });

    io.on("room owner has changed the time", data => {
      this.props.sendTime(data.time);
    });

    io.on("room owner has paused or resumed the video", data => {
      this.props.playPauseVideo(data.time);
    });
    io.on("disconnect", {
      room: this.props.match.params.roomId,
      user: this.props.user
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
    const selectedRoom = this.props.rooms.filter(room => {
      return room.id == this.props.match.params.roomId;
    });
    this.setState({
      selectedRoom: selectedRoom[0]
    });
    io.emit("join room", {
      room: this.props.match.params.roomId,
      user: this.props.user
    });
    if (this.props.newRoom.id) {
      io.emit("new room", { newRoom: this.props.newRoom });
    }
    window.addEventListener("unload", () => {
      io.emit("user leaving", {
        room: this.props.match.params.roomId,
        user: this.props.user
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
    console.log(this.state.users);
    console.log(prevState.users);
    if (this.state.users.length > prevState.users.length) {
      this.setState({
        users: this.state.users
      });
    }
    if (this.props.match.params.roomId != prevProps.match.params.roomId) {
      io.emit("leave room", {
        room: prevProps.match.params.roomId,
        user: this.props.user
      });
    }
    if (this.props.userLogOut != prevProps.userLogOut) {
      io.emit("leave room", {
        room: prevProps.match.params.roomId,
        user: this.props.userLogOut
      });
    }
    if (this.props.newRoom.id != prevProps.newRoom.id) {
      io.emit("new room", { newRoom: this.props.rooms });
    }
    if (this.props.time != prevProps.time) {
      console.log("the time has changed!!");
      io.emit("update time", {
        time: this.props.time,
        room: this.props.match.params.roomId
      });
    }
    if (this.props.pause != prevProps.pause) {
      console.log("the video was paused/resumed", this.props.pause);
      if (this.props.user === this.props.match.params.roomId) {
        io.emit("pause or play video", {
          time: this.props.time,
          pause: this.props.pause,
          room: this.props.match.params.roomId
        });
      }
    }
  }

  componentWillUnmount() {
    io.emit("leave room", {
      room: this.props.match.params.roomId,
      user: this.props.user
    });
  }

  sendMessage = () => {
    io.emit("message sent", {
      user: this.props.user,
      message: this.state.messageText,
      room: this.props.match.params.roomId
    });
  };

  userCheck = () => {
    if (this.props.user) {
      return (
        <button
          className="btn btn-outline-success"
          onClick={e => {
            this.sendMessage();
            this.setState({
              messageText: ""
            });
          }}
        >
          Send
        </button>
      );
    } else {
      return (
        <button
          data-toggle="tooltip"
          data-placement="top"
          title="Must be logged in to do this."
          disabled
          className="btn btn-outline-success"
          onClick={e => {
            this.sendMessage();
            this.setState({
              messageText: ""
            });
          }}
        >
          Send
        </button>
      );
    }
  };

  addFriend = userfriend => {
    console.log(this.props.user);
    let newFriend = {
      friend: userfriend,
      username: this.props.user
    };
    axios
      .post("/api/friend", newFriend)
      .then(response => console.log(response));
  };

  render() {
    console.log(this.props);
    const userList = this.state.users.map(user => {
      console.log(user);
      return (
        <li className="list-group-item">
          {user}
          <button
            onClick={() => this.addFriend(user)}
            className="btn btn-sm btn-primary shadow ml-3"
          >
            +
          </button>
        </li>
      );
    });
    const mappedMessages = this.state.messages.map(message => {
      if (message.user) {
        return (
          <li className="list-group-item">
            {message.user} - {message.message}
          </li>
        );
      } else {
        return <li className="list-group-item">{message}</li>;
      }
    });
    return (
      <div className="container message-component-container">
        <ul className="list-group list-group-horizontal overflow-auto">
          {userList}
        </ul>
        <div className="message-container border border-primary">
          {mappedMessages}
          <div
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">{this.userCheck()}</div>
          <input
            value={this.state.messageText}
            className="form-control"
            type="text"
            onChange={e => {
              this.setState({ messageText: e.target.value });
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user.username,
    rooms: state.room.rooms,
    newRoom: state.room.newRoom,
    users: state.user.users,
    userLogOut: state.user.userLogOut,
    time: state.time.time,
    pause: state.time.pause
  };
};

export default connect(
  mapStateToProps,
  { setGroupUsers, userLeft, addRoom, setRooms, sendTime, playPauseVideo }
)(withRouter(Messenger));

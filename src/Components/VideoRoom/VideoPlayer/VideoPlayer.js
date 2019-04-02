import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setRooms } from "../../../Redux/Reducers/RoomReducer";

import { FaPause, FaPlay, FaFastForward } from "react-icons/fa";

import "./VideoPlayer.css";
import axios from "axios";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: {},
      time: 0,
      pause: "autoplay=1&"
    };
  }

  componentDidMount() {
    console.log(this.props.rooms);
    axios.get("/api/rooms").then(response => {
      console.log(response);
      const selectedRoom = response.data.filter(room => {
        console.log(this.props.match.params.roomId);
        return room.id == this.props.match.params.roomId;
      });
      console.log(selectedRoom);
      this.setState({
        selectedRoom: selectedRoom[0]
      });
    });
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.pause) {
  //     if (prevState.pause !== this.state.pause) {
  //       console.log(prevState.pause);
  //       console.log(this.state.pause);
  //       console.log("this made it");
  //       this.setState({
  //         pause: this.state.pause || "autoplay=1&"
  //       });
  //     }
  //   }
  // }

  sendTime = newTime => {
    this.setState({
      time: newTime
    });
  };

  playPauseVideo = () => {
    let { pause } = this.state;
    pause == "autoplay=1&"
      ? this.setState({
          pause: ""
        })
      : this.setState({
          pause: "autoplay=1&"
        });
  };

  render() {
    let { url, description, owner } = this.state.selectedRoom;
    let { time, pause } = this.state;
    let { user } = this.props;
    console.log(time, pause, url + `?${pause}start=${time}`);
    return (
      <div className="video-component card mb-3">
        <iframe
          allow="autoplay"
          src={url + "?" + `${pause}start=${time}`}
          className="video-container card-img-top"
        />
        {user == owner ? (
          <div className="toolbar">
            <button onClick={() => this.playPauseVideo()}>
              {pause === "" ? <FaPlay /> : <FaPause />}
            </button>
            <input placeholder="Start Time" type="text" ref="userInput" />
            <button onClick={() => this.sendTime(this.refs.userInput.value)}>
              <FaFastForward />
            </button>
          </div>
        ) : null}

        <div className="card-body">
          <h5 className="card-title">{this.state.selectedRoom.owner}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.username,
    rooms: state.room.rooms
  };
};

export default connect(
  mapStateToProps,
  { setRooms }
)(withRouter(VideoPlayer));

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setRooms } from "../../../Redux/Reducers/RoomReducer";
import {
  sendTime,
  playPauseVideo,
  updateInput
} from "../../../Redux/Reducers/timeReducer";
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
    console.log(this.props);
    console.log(this.props.rooms);
    axios.get("/api/rooms").then(response => {
      console.log(response);
      const selectedRoom = response.data.filter(room => {
        console.log(this.props.match.params.roomId);
        return room.id == this.props.match.params.roomId;
      });
      console.log(selectedRoom);
      if (selectedRoom[0]) {
        this.setState({
          selectedRoom: selectedRoom[0]
        });
      } else {
        this.props.history.push("/dashboard");
      }
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
    let { time, pause, userInput } = this.state;
    let { user } = this.props;
    console.log(url);
    return (
      <div className="container">
        <iframe
          width="600"
          height="500"
          allow="autoplay"
          src={
            "https://" + url + `?${this.props.pause}start=${this.props.time}&controls=0&disablekb=1&showinfo=0`
          }
          className="shadow"
        />
        {user == owner ? (
          <div
            className="btn-toolbar mb-3 mt-3"
            role="toolbar"
            aria-label="Toolbar to handle video controls">
            <div
              className="btn-group mr-5"
              role="group"
              aria-label="Play/Pause Controls">
              <button
                type="button"
                className="btn btn-primary shadow"
                onClick={() => this.props.playPauseVideo(this.props.userInput)}>
                {this.props.pause === "" ? <FaPlay /> : <FaPause />}
              </button>
            </div>
            <div className="btn-group mr-2">
              <button
                type="button"
                className="btn btn-success shadow"
                onClick={() => this.props.sendTime(this.props.userInput)}>
                <FaFastForward />
              </button>
              <div className="input-group">
                <input
                  className="form-control shadow"
                  placeholder="Start Time"
                  type="text"
                  onChange={event => {
                    this.props.updateInput(event.target.value);
                  }}
                />
              </div>
            </div>
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
    rooms: state.room.rooms,
    time: state.time.time,
    pause: state.time.pause,
    userInput: state.time.userInput
  };
};

export default connect(
  mapStateToProps,
  { setRooms, sendTime, playPauseVideo, updateInput }
)(withRouter(VideoPlayer));

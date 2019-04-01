import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FaPause, FaPlay, FaFastForward } from "react-icons/fa";
import "./VideoPlayer.css";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: {},
      time: 1,
      pause: "",
      userInput: ""
    };
  }

  componentDidMount() {
    const selectedRoom = this.props.rooms.filter(room => {
      return room.id == this.props.match.params.roomId;
    });
    this.setState({
      selectedRoom: selectedRoom[0]
    });
  }
  sendTime = newTime => {
    this.setState({
      time: newTime
    });
  };

  playPauseVideo = () => {
    // let {} = this.state.selectedRoom;
    console.log();
    // io.emit("video", { time: data, room: 1, pause: this.state.pause });
    let { pause } = this.state;
    pause == "autoplay=1&"
      ? this.setState({
          pause: "",
          time: this.state.userInput
        })
      : this.setState({
          pause: "autoplay=1&",
          time: this.state.userInput
        });
  };

  render() {
    let { videoUrl, description, owner } = this.state.selectedRoom;
    let { time, pause, userInput } = this.state;
    let { user } = this.props;
    console.log(this.state.selectedRoom);
    return (
      <div className="video-component card mb-3">
        <iframe
          src={videoUrl + `?${pause}start=${time}`}
          className="video-container card-img-top"
        />
        {user == owner ? (
          <div className="toolbar">
            <button onClick={() => this.playPauseVideo()}>
              {pause == "" ? <FaPlay /> : <FaPause />}
            </button>
            <input
              placeholder="Start Time"
              type="text"
              onChange={event => {
                this.setState({
                  userInput: event.target.value
                });
              }}
            />
            <button onClick={() => this.sendTime(userInput)}>
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
  null
)(withRouter(VideoPlayer));

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./VideoPlayer.css";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: {}
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

  render() {
    console.log(this.state.selectedRoom);
    console.log(videoUrl);
    let { videoUrl, description } = this.state.selectedRoom;

    return (
      <div className="video-component card mb-3">
        <iframe src={videoUrl} className="video-container card-img-top" />
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

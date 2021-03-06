import React, { Component } from "react";
import Messenger from "./Messenger/Messenger";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./VideoRoom.css";

class VideoRoom extends Component {
  render() {
    return (
      <div className="chat-room">
        <Navbar />
        <Link to="/dashboard">
          <button type="button" className="btn btn-link back-to-dashboard">
            {"< < < Back to dashboard"}
          </button>
        </Link>

        <div className="video-room-container">
          <div className="messenger-videoplayer-container container">
            <div className="video-container">
              <VideoPlayer />
            </div>
            <div className="usercards-videoplayer-container">
              <Messenger />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoRoom;

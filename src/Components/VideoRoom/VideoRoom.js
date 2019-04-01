import React, { Component } from "react";
import Messenger from "./Messenger/Messenger";
import UserCards from "./UserCards/UserCards";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
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
          <div className="messenger-videoplayer-container">
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

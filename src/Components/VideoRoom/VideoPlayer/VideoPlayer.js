import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setRooms } from '../../../Redux/Reducers/RoomReducer'
import "./VideoPlayer.css";
import axios from "axios";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: {}
    };
  }

  componentDidMount() {
    console.log(this.props.rooms)
    axios.get('/api/rooms').then(response => {
      console.log(response)
      const selectedRoom = response.data.filter(room => {
        console.log(this.props.match.params.roomId)
        return room.id == this.props.match.params.roomId
      })
      console.log(selectedRoom)
      this.setState({
        selectedRoom: selectedRoom[0]
      });
    })  
  }

  render() {
    console.log(this.state.selectedRoom)
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
  {setRooms}
)(withRouter(VideoPlayer));

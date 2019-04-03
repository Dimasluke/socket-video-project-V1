import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import RoomCard from "../RoomCard/RoomCard";
import { createRoom, setRooms } from "../../Redux/Reducers/RoomReducer";
import { connect } from "react-redux";
import "./Dashboard.css";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    axios.get("/api/rooms").then(response => {
      console.log(response.data);
      this.props.setRooms(response.data);
    });
  }

  render() {
    let reversedRooms = this.props.rooms.reverse();
    const mappedRooms = reversedRooms.map((room, index) => {
      return (
        <div key={index} className="dashboard-room-card">
          <RoomCard
            roomName={room.title || room.roomName}
            owner={room.owner}
            description={room.description}
            id={room.id}
          />
        </div>
      );
    });
    return (
      <div>
        <Navbar />
        <div className="container room-card-container">{mappedRooms}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.room.rooms
  };
};

export default connect(
  mapStateToProps,
  { createRoom, setRooms }
)(Dashboard);

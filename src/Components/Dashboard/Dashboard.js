import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import RoomCard from '../RoomCard/RoomCard';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Dashboard extends Component {


    render(){
        const mappedRooms = this.props.rooms.map((room, index) => {

            console.log(room)
            return (
                <div key={index}>
                    <RoomCard 
                        roomName={room.roomName}
                        owner={room.owner}
                        description={room.description}
                        id={room.id}/> 
                </div>
            )
        })
        return(
            <div>
                <Navbar />
                {mappedRooms}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.room.rooms
    }
}

export default connect(mapStateToProps, null)(Dashboard)
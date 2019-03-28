import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import RoomCard from '../RoomCard/RoomCard';
import { connect } from 'react-redux'
import './Dashboard.css'

class Dashboard extends Component {

    render(){
        const mappedRooms = this.props.rooms.map((room, index) => {
            return (
                <div key={index} className='dashboard-room-card'>
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
                <div className='container room-card-container'>
                    {mappedRooms}        
                </div>
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
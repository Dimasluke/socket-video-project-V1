import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

class RoomCard extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const { roomName, owner, description, id } = this.props
        return(
            <div>
                <div>{roomName}</div>
                <div>{description}</div>
                <div>{owner}</div>
                <Link to={`/${id}`}>Join Room</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.user.username,
        room: state.room.rooms
    }
}

export default connect(mapStateToProps, null)(RoomCard)
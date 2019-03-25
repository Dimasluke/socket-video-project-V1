import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client'

class RoomCard extends Component {

    componentDidMount(){

    }

    joinRoom = () => {
        io().emit('join room', {
            user: this.props.user,
            room: this.props.roomName
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.joinRoom}>Join Room</button>
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
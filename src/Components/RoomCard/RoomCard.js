import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class RoomCard extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const { roomName, owner, description, id } = this.props
        return(
            <div className='card dashboard-cards' style={{width: '20rem'}}>
                <div className='card-body'>
                    <h5 className='card-title'>{roomName}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>{owner}</h6>
                    <p className='card-text'>{description}</p>
                    <Link to={`/${id}`}>Join Room</Link>
                </div>
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
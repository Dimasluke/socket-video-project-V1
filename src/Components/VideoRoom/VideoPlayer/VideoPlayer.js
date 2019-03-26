import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './VideoPlayer.css'

class VideoPlayer extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedRoom: {}
        }
    }

    componentDidMount () {
        console.log(this.props.match.params.roomId)
        const selectedRoom = this.props.rooms.filter(room => {
            return room.id == this.props.match.params.roomId
        })
        this.setState({
            selectedRoom: selectedRoom[0]
        })
    }

    render(){
        console.log(this.state)
        return (
            <div className='video-component'>
                <iframe src='https://www.youtube.com/embed/HZFTUtbn1RU' className='container video-container' ></iframe>
                <div>
                    {this.state.selectedRoom.owner}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.username,
        rooms: state.room.rooms
    }
}

export default connect(mapStateToProps, null)(withRouter(VideoPlayer))
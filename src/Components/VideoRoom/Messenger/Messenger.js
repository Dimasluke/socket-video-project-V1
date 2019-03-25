import React, { Component} from 'react';
import socketIo from 'socket.io-client';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
const io = socketIo('http://localhost:4000')

class Messenger extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            selectedRoom: {},
            messageText: ''
        }

        io.on('message from server', data => {
            console.log(data)
        })

        io.on('join room', data => {
            console.log(data)
        })
        
    }

    componentDidMount(){
        
        const selectedRoom = this.props.rooms.filter(room => {
            return room.id == this.props.match.params.roomId
        })
        console.log(selectedRoom)
        this.setState({
            selectedRoom: selectedRoom[0]
        })
    }

    sendMessage = () => {
        io.emit('message sent', {
            user: this.props.user,
            message: this.state.messageText,
            room: this.state.selectedRoom.roomName
        })
    }

    receiveMessage = () => {
        io.on('message from server', (data) => {
            console.log(data)
        })
    }

    render(){
        const mappedMessages = this.state.messages.map(message => {
            return(
                <div>
                    this is a message
                </div>
            )
        })
        return(
            <div>
                {mappedMessages}
                <input type='text' onChange={e => {this.setState({ messageText: e.target.value})}}/>
                <button onClick={e => {
                    this.sendMessage()
                    }}>Send</button>
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

export default connect(mapStateToProps, null)(withRouter(Messenger))
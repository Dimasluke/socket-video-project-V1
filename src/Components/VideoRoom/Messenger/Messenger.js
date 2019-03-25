import React, { Component} from 'react';
import socketIo from 'socket.io-client';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
const io = socketIo()

class Messenger extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            selectedRoom: {},
            messageText: ''
        }

        io.on('message from server', data => {
            this.setState({
                messages: [...this.state.messages, data]
            })
        })

        io.on('join room', data => {
            console.log(data)
        })
        
    }

    componentDidMount(){
        console.log(this.props.match.params.roomId)
        const selectedRoom = this.props.rooms.filter(room => {
            return room.id == this.props.match.params.roomId
        })
        this.setState({
            selectedRoom: selectedRoom[0]
        })
        io.emit('join room', {room: this.props.match.params.roomId, user: this.props.user})
    }

    sendMessage = () => {
        io.emit('message sent', {
            user: this.props.user,
            message: this.state.messageText,
            room: this.props.match.params.roomId
        })
    }

    render(){
        console.log(this.state.messages)
        const mappedMessages = this.state.messages.map(message => {
            return(
                <div>
                    {message.message}
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
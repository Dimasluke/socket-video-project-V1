import React, { Component} from 'react';
import socketIo from 'socket.io-client';
import { connect } from 'react-redux'
import { setGroupUsers } from '../../../Redux/Reducers/UserReducer'
import { withRouter } from 'react-router-dom'
import './Messenger.css'
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
            console.log('data --<', data)
            this.props.setGroupUsers(data)
            let messagesCopy = this.state.messages.map(message => {
                return message
            })
            console.log('messagesCopy' , messagesCopy)
            messagesCopy.push(data.user + ' has joined the room.')
            this.setState({
                messages: messagesCopy
            })
        })
        
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount(){
        this.scrollToBottom();
        const selectedRoom = this.props.rooms.filter(room => {
            return room.id == this.props.match.params.roomId
        })
        console.log(selectedRoom)
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
        // let selectedGroupMessages = this.state.messages.filter(message => {
        //     return message.room = this.state.selectedRoom.id
        // })
        // console.log('selectedGroupMessages', selectedGroupMessages)
        const mappedMessages = this.state.messages.map(message => {
            console.log(message)
            if(message.user){
                return (
                    <li className='list-group-item'>
                        {message.user} - {message.message}
                    </li>
                )
            } else {
                return(
                    <li className='list-group-item'>
                        {message}
                    </li>
                )
            }
        })
        return(
            <div className='container message-component-container'>
                <div className='message-container border border-primary'>                     
                    {mappedMessages}
                    <div ref={(el) => { this.messagesEnd = el; }}></div>    
                </div>
                
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <button 
                            className='btn btn-outline-success'
                            onClick={e => {
                            this.sendMessage()
                            this.setState({
                                messageText: ''
                            })
                            }}>Send</button>
                    </div>
                    <input 
                        value={this.state.messageText}
                        className='form-control'
                        type='text' 
                        onChange={e => {this.setState({ messageText: e.target.value})}}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.username || 'Anonymous',
        rooms: state.room.rooms
    }
}

export default connect(mapStateToProps, {setGroupUsers})(withRouter(Messenger))
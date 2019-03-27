import React, { Component} from 'react';
import socketIo from 'socket.io-client';
import UserCard from '../UserCards/UserCards'
import { connect } from 'react-redux'
import { setGroupUsers, userLeft } from '../../../Redux/Reducers/UserReducer'
import { withRouter } from 'react-router-dom'
import './Messenger.css'
const io = socketIo()

class Messenger extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            selectedRoom: {},
            messageText: '',
            users: []
        }

        io.on('message from server', data => {
            this.setState({
                messages: [...this.state.messages, data]
            })
        })

        io.on('join room', data => {
            console.log('join room data', data)
            // this.props.setGroupUsers(data)
            let mappedUsers = this.state.users.map(user => {
                return user
            })  
            mappedUsers.push(data)
            this.setState({
                users: mappedUsers
            })
            let messagesCopy = this.state.messages.map(message => {
                return message
            })   
            messagesCopy.push(data.user + ' has joined the room.')
            this.setState({
                messages: messagesCopy
            })
        })
        
        io.on('room left', data => {
            console.log('room left heard on client side', data)
            let mappedUsers = this.state.users.map(user => {
                return user
            })
            let findUser = this.state.users.indexOf(data.user)
            mappedUsers.splice(findUser, 1)
            console.log('mapped users',mappedUsers)
            this.setState({
                users: mappedUsers
            })
        })

        io.on('user left', data => {
            console.log('a user has left', data)
            let mappedUsers = this.state.users.map(user => {
                return user
            })
            let findUser = this.state.users.indexOf(data.user)
            mappedUsers.splice(findUser, 1)
            console.log('mapped users',mappedUsers)
            this.setState({
                users: mappedUsers
            })
            let messagesCopy = this.state.messages.map(message => {
                return message
            })   
            messagesCopy.push(data.user + ' has left the room.')
            this.setState({
                messages: messagesCopy
            })
        })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
    componentDidUpdate(prevProps, prevState) {
        this.scrollToBottom();
        console.log(this.state.users)
        console.log(prevState.users)
        if(this.state.users.length > prevState.users.length){
            
            this.setState({
                users: this.state.users
            })
        }
        if (this.props.match.params.roomId != prevProps.match.params.roomId){
            let leftUser = this.props.user.indexOf(prevProps.user)
            console.log(leftUser)
            this.props.userLeft(leftUser)
            io.emit('leave room', {room: prevProps.match.params.roomId, user: this.props.user})
        }
    }

    componentDidMount(){
        this.scrollToBottom();
        const selectedRoom = this.props.rooms.filter(room => {
            return room.id == this.props.match.params.roomId
        })
        this.setState({
            selectedRoom: selectedRoom[0]
        })
        io.emit('join room', {room: this.props.match.params.roomId, user: this.props.user})
    }

    componentWillUnmount(){
        console.log('component will unmount')
        let leftUser = this.props.user.indexOf(this.props.user)
        this.props.userLeft(leftUser)
        io.emit('leave room', {room: this.props.match.params.roomId, user: this.props.user})
    }

    sendMessage = () => {
        io.emit('message sent', {
            user: this.props.user,
            message: this.state.messageText,
            room: this.props.match.params.roomId
        })
    }

    render(){
        console.log(this.state)
        const userList = this.state.users.map(user => {
            return <UserCard />
        })
        const mappedMessages = this.state.messages.map(message => {     
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
                {userList}
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
        rooms: state.room.rooms,
        users: state.user.users
    }
}

export default connect(mapStateToProps, {setGroupUsers, userLeft})(withRouter(Messenger))
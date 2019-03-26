import React, { Component } from 'react';
import socketIo from 'socket.io-client';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
const io = socketIo()

class UserCards extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: []
        }

    }

    render(){
        console.log(this.props)
        const mappedUsers = this.props.users.map(user => {
            return (
                <div>{user.user}</div>
            )
        })
        return (
            <div>
                {mappedUsers}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users
    }
}

export default connect(mapStateToProps, null)(withRouter(UserCards))
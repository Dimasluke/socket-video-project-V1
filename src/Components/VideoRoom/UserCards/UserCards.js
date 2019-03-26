import React, { Component } from 'react';
import socketIo from 'socket.io-client';
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
        return (
            <div>
                UserCards
            </div>
        )
    }
}

export default withRouter(UserCards)
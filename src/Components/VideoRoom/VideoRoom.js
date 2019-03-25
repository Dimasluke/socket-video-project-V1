import React, { Component } from 'react';
import Messenger from './Messenger/Messenger'
import UserCards from './UserCards/UserCards'
import VideoPlayer from './VideoPlayer/VideoPlayer'

class VideoRoom extends Component {
    render(){
        return(
            <div>
                <Messenger />
                <UserCards />
                <VideoPlayer />
            </div>     
        )
    }
}

export default VideoRoom
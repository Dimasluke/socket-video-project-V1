import React, { Component } from 'react';
import Messenger from './Messenger/Messenger'
import VideoPlayer from './VideoPlayer/VideoPlayer'
import Navbar from '../Navbar/Navbar';
import './VideoRoom.css'


class VideoRoom extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <div className='video-room-container'> 
                    <div className='messenger-videoplayer-container'>
                        <div className='video-container'>
                            <VideoPlayer />
                        </div>
                        <div className='usercards-videoplayer-container'>
                            <Messenger />
                        </div>  
                    </div>
                </div>
            </div>     
        )
    }
}

export default VideoRoom
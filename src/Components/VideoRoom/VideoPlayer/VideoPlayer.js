import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./VideoPlayer.css";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: {}
    };
  }

  componentDidMount() {
    const selectedRoom = this.props.rooms.filter(room => {
      return room.id == this.props.match.params.roomId;
    });
    this.setState({
      selectedRoom: selectedRoom[0]
    });
  }

<<<<<<< HEAD
    render(){
        return (
            <div className='video-component'>
                <iframe src='https://www.youtube.com/embed/HZFTUtbn1RU' className='container video-container' title='testframe'></iframe>
                <div>
                    {/* {this.state.selectedRoom.owner} */}
                </div>
            </div>
        )
    }
=======
  render() {
    let { videoUrl } = this.state.selectedRoom;
    console.log(videoUrl);
    return (
      <div className="video-component">
        <iframe src={videoUrl} className="container video-container" />
        <div>{this.state.selectedRoom.owner}</div>
      </div>
    );
  }
>>>>>>> fc3e838f958856c203b889ac101e5c9314ca3820
}

const mapStateToProps = state => {
  return {
    user: state.user.username,
    rooms: state.room.rooms
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(VideoPlayer));

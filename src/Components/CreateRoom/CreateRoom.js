import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createRoom } from "../../Redux/Reducers/RoomReducer";

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      description: ""
    };
  }

  createRoomBtn = () => {
    let { title, url, description } = this.state;
    console.log(title, url, description);
    this.props.createRoom({ title, url, description });
  };

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "100px" }}>
          <form>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Title</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Title"
                onChange={e =>
                  this.setState({
                    title: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Video URL</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="URL"
                onChange={e =>
                  this.setState({
                    url: e.target.value
                  })
                }
              />
            </div>
            <div class="form-group">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Description"
                onChange={e =>
                  this.setState({
                    description: e.target.value
                  })
                }
              />
            </div>
          </form>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={() => this.createRoomBtn()}
          >
            Create Room
          </button>
          <Link
            className="btn btn-danger"
            to="/dashboard"
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
    roomName: state.roomName,
    description: state.description,
    videoUrl: state.videoUrl
  };
};

const mapDispatchToProps = {
  createRoom: createRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoom);

// export default CreateRoom;

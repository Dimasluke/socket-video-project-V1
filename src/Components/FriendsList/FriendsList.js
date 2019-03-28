import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../Redux/Reducers/UserReducer";
import "./friendsList.css";

export class FriendsList extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
  }
  componentDidMount() {
    axios.get("/api/sessionInfo").then(response => {
      console.log(response.data);
      this.props.setUser(response.data);
    });
    axios.get(`/api/friends/${this.props.userId}`).then(friends => {
      this.setState({
        friends: friends.data
      });
    });
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.userId);
    if (this.props.userId !== prevProps.userId) {
      axios.get(`/api/friends/${this.props.userId}`).then(friends => {
        this.setState({
          friends: friends.data
        });
      });
    }
  }

  removeFriend = (userId, friendUsername) => {
    console.log(userId, friendUsername);
    axios.delete(`/api/friend/${userId}/${friendUsername}`).then(friends => {
      this.setState({
        friends: friends.data
      });
    });
  };

  render() {
    console.log(this.props.userId);
    let { friends } = this.state;
    let { userId } = this.props;
    const mappedFriends = friends.map(friend => {
      return (
        <div key={friends.id} className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div
              className="row no-gutters"
              style={{ maxHeight: "200px", overflow: "auto" }}
            >
              <div className="col-md-4">
                <img src={friend.imageurl} className="card-img" alt="..." />
              </div>
              <button
                className="btn btn-sm btn-danger delete-btn shadow"
                style={{ zIndex: "100" }}
                onClick={() => {
                  this.removeFriend(userId, friend.username);
                }}
              >
                X
              </button>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{friend.username}</h5>
                  <p className="card-text">{friend.bio}</p>
                  <p className="card-text">
                    {/* <small className="text-muted">
                      Last updated 3 mins ago
                    </small> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{mappedFriends}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  };
};

export default connect(
  mapStateToProps,
  { setUser }
)(FriendsList);

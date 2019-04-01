import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser } from "../../Redux/Reducers/UserReducer";
import { Link } from "react-router-dom";
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
    axios.get(`/api/friends/${this.props.match.params.id}`).then(friends => {
      this.setState({
        friends: friends.data
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      axios.get(`/api/friends/${this.props.match.params.id}`).then(friends => {
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
    console.log(this.props.username);
    let { username } = this.props;
    let { id } = this.props.match.params;
    let { friends } = this.state;
    // let { username } = this.props;
    const mappedFriends = friends.map(friend => {
      return (
        <div key={friends.username}>
          <Link to={`/profile/${friend.username}`}>
            {username == id ? (
              <button
                className="btn btn-sm btn-danger delete-btn shadow"
                onClick={() => {
                  this.removeFriend(id, friend.username);
                }}
              >
                X
              </button>
            ) : null}
            <img
              src={friend.imageurl}
              style={{
                width: "100%",
                height: "180px",
                boxShadow: "2 1px 1px"
              }}
              alt="..."
            />

            <h5>{friend.username}</h5>
          </Link>
        </div>
      );
    });
    return <div className="friends-list">{mappedFriends}</div>;
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username
  };
};

export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(FriendsList));

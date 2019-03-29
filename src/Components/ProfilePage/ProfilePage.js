import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import FriendsList from "../FriendsList/FriendsList";
import "./Profile.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      bio: "",
      imageurl: ""
    };
  }

  componentDidMount() {
    const userProfile = this.props.match.params.id;

    axios.get(`/api/userInfo/${userProfile}`).then(getUserInfo => {
      // console.log("GETUSERINFO", getUserInfo.data);
      this.setState({
        id: getUserInfo.data.id,
        username: getUserInfo.data.username,
        firstname: getUserInfo.data.firstname,
        lastname: getUserInfo.data.lastname,
        email: getUserInfo.data.email,
        bio: getUserInfo.data.bio,
        imageurl: getUserInfo.data.imageurl
      });
    });
  }

  userCheck = () => {
    // console.log("USERCHECK", this.props);
    if (this.props.user === this.props.match.params.id) {
      return (
        <div>
          <div class="input-group mb-3 image-input">
            <div class="input-group-prepend">
              <div class="input-group-text" id="image-input">
                ImageUrl
              </div>
            </div>
            <input
              onChange={e => this.setState({ imageurl: e.target.value })}
              type="text"
              class="form-control"
              placeholder="Paste your url here"
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div>

          <div>
            <button
              onClick={this.editUserInfo}
              type="button"
              class="btn btn-danger btn-sm">
              Edit
            </button>
          </div>
        </div>
      );
    }
  };

  editUserInfo = () => {
    const { firstname, lastname, email, bio, imageurl, id } = this.state;
    axios
      .put(`/api/userInfo?id=${id}`, {
        firstname,
        lastname,
        email,
        bio,
        imageurl,
        id
      })
      .then(userInfo => {
        this.setState({
          username: userInfo.data.username,
          firstname: userInfo.data.firstname,
          lastname: userInfo.data.lastname,
          email: userInfo.data.email,
          bio: userInfo.data.bio,
          imageurl: userInfo.data.imageurl,
          id: userInfo.data.id
        });
      });
  };

  render() {
    // console.log("STATE", this.state);
    // console.log("PROPS", this.props);
    const { username, firstname, lastname, email, bio, imageurl } = this.state;
    // console.log("userInfo ===> ", this.state.user);
    // console.log("bio", bio);
    return (
      <div>
        <Link to="/dashboard">
          <button type="button" class="btn btn-link back-to-dashboard">
            {"< < < Back to dashboard"}
          </button>
        </Link>
        <div className="container  border border-secondary rounded-sm shadow p-4 profile-container">
          {/* USER INFO DROPDOWNS */}
          <div className="accordion profile-dropdown">
            <div class="media">
              <img src={imageurl} alt="" class="mr-3" />
            </div>
            <button
              class="btn btn-secondary col"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="true"
              aria-controls="collapseExample">
              Show profile: {username}
            </button>
            <form className="form-profile">
              <div class="collapse show" id="collapseExample">
                <div class="card card-body">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          onChange={e =>
                            this.setState({ firstname: e.target.value })
                          }
                          type="text"
                          className="form-control"
                          placeholder="First name"
                          id="firstName"
                          value={firstname}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          onChange={e =>
                            this.setState({ lastname: e.target.value })
                          }
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          id="lastName"
                          value={lastname}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="email">Email</label>
                        <input
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          id="email"
                          value={email}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                          id="phoneNumber"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Bio</label>
                      <textarea
                        onChange={e => this.setState({ bio: e.target.value })}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={bio}
                      />
                    </div>
                    {this.userCheck()}
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* SUBSCRIPTION, FRIENDS, VIDEOS DROPDOWNS */}
          <div className="accordion friends " id="dropDownFriends">
            <div className="card">
              <div className="card-header" id="friends">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFriends"
                    aria-expanded="false"
                    aria-controls="collapseFriends">
                    Friends
                  </button>
                </h2>
              </div>
              <div
                id="collapseFriends"
                className="collapse"
                aria-labelledby=""
                data-parent="#friends">
                <div className="card-body">
                  <FriendsList />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="videos">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseVideos"
                    aria-expanded="false"
                    aria-controls="collapseVideos">
                    Recently Watched Videos
                  </button>
                </h2>
              </div>
              <div
                id="collapseVideos"
                className="collapse"
                aria-labelledby=""
                data-parent="#dropDownFriends">
                <div className="card-body">Watched Videos Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("STATE", state);
  return {
    user: state.user.username
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(ProfilePage));

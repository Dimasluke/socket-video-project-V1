import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "./Profile.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const userProfile = this.props.match.params.id;
    axios.get(`/api/userInfo/${userProfile}`).then(getUserInfo => {
      //   console.log(getUserInfo.data);
      this.setState({
        user: getUserInfo.data
      });
    });
  }

  render() {
    const {
      username,
      firstname,
      lastname,
      imageurl,
      email,
      bio
    } = this.state.user;
    // console.log("userInfo ===> ", this.state.user);

    return (
      <div className="container profile-container border border-secondary rounded-sm shadow p-4">
        {/* USER INFO DROPDOWNS */}
        <div className="bio-info" id="accordionInfo">
          <img src={imageurl} alt="" />
          <div className="accordion contact-info">
            <div className="card">
              <div className="card-header" id="profileInfo">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseName"
                    aria-expanded="true"
                    aria-controls="collapseName">
                    UserName:
                    {username}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseName"
                    aria-expanded="true"
                    aria-controls="collapseName">
                    Edit
                  </button>
                </h2>
              </div>

              <div
                id="collapseName"
                className="collapse show"
                aria-labelledby=""
                data-parent="#profileInfo">
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="firstNameInput" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First name"
                          id="firstNameInput"
                          value={firstname}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="lastNameInput" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          id="lastNameInput"
                          value={lastname}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseContactInfo"
                    aria-expanded="false"
                    aria-controls="collapseContactInfo">
                    Contact Info
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseContactInfo"
                    aria-expanded="false"
                    aria-controls="collapseContactInfo">
                    Edit
                  </button>
                </h2>
              </div>
              <div
                id="collapseContactInfo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#profileInfo">
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="email" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          id="email"
                          value={email}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="phoneNumber" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                          id="phoneNumber"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseBio"
                    aria-expanded="false"
                    aria-controls="collapseBio">
                    Bio
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseBio"
                    aria-expanded="false"
                    aria-controls="collapseBio">
                    Edit
                  </button>
                </h2>
              </div>
              <div
                id="collapseBio"
                className="collapse"
                aria-labelledby="headingThree"
                data-parent="#profileInfo">
                <div className="card-body">{bio}</div>
              </div>
            </div>
          </div>
        </div>
        {/* SUBSCRIPTION, FRIENDS, VIDEOS DROPDOWNS */}
        <div className="accordion subscriptions" id="subscriptions">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseSubscriptions"
                  aria-expanded="true"
                  aria-controls="collapseSubscriptions">
                  Subscriptions
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseSubscriptions"
                  aria-expanded="true"
                  aria-controls="collapseSubscriptions">
                  Edit
                </button>
              </h2>
            </div>

            <div
              id="collapseSubscriptions"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#subscriptions">
              <div className="card-body">Subscriptions Data</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h2 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseFriends"
                  aria-expanded="false"
                  aria-controls="collapseFriends">
                  Friends
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseFriends"
                  aria-expanded="false"
                  aria-controls="collapseFriends">
                  Edit
                </button>
              </h2>
            </div>
            <div
              id="collapseFriends"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#subscriptions">
              <div className="card-body">Friends Data</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingThree">
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
              aria-labelledby="headingThree"
              data-parent="#subscriptions">
              <div className="card-body">Watched Videos Data</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePage);

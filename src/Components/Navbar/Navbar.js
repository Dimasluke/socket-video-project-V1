import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, userLogOut } from "../../Redux/Reducers/UserReducer";
import axios from "axios";

import CreateRoom from "../CreateRoom/CreateRoom";
import Login from "../Login/Login";
import Search from "../Search/Search";
import "./Navbar.css";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("/api/sessionInfo").then(response => {
      this.props.setUser(response.data);
    });
  }

  userCheck = () => {
    // console.log("USER", this.props);
    if (this.props.user) {
      return (
        <Link to={`/profile/${this.props.user}`}>
          <span>
            <span className="profile-name"> - {this.props.user}</span>
          </span>
        </Link>
      );
    }
  };

  createAuthority = () => {
    if (this.props.user) {
      return (
        <li className="nav-item mr-3">
          <button

            type="button"
            class="btn btn-link"
            data-toggle="modal"
            data-target="#modal-create-room"
            style={{
              textDecoration: "none",
              border: "none",
              background: "none"

            }}>
            Create Room
          </button>
          <div
            class="modal fade bd-example-modal-lg shadow-lg"
            data-backdrop="false"
            id="modal-create-room"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <CreateRoom />
              </div>
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li className="nav-item mr-3">
          <button
            style={{
              textDecoration: "none",
              border: "none",
              background: "none"
            }}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Must be logged in to do this."
          >
            <Link to="/createroom" className="nav-link disabled">
              Create Room
            </Link>
          </button>
        </li>
      );
    }
  };

  logout = () => {
    axios
      .post("/api/logout")
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loggedIn = () => {
    if (this.props.user) {
      return (
        <li className="nav-item mr-3">
          <button
            style={{
              textDecoration: "none",
              border: "none",
              background: "none",
              color: "red"
            }}
            onClick={() => {
              this.props.userLogOut(this.props.user);
              this.logout();
            }}
            className="nav-link"
          >
            Logout
          </button>
        </li>
      );
    } else {
      return (
        <li className="nav-item mr-3">
          <button
            type="button"
            class="btn btn-link"
            data-toggle="modal"
            data-target="#modal-login"

            style={{
              textDecoration: "none",
              border: "none",
              background: "none"
            }}>
            Log in
          </button>
          <div
            class="modal fade bd-example-modal-lg shadow-lg"
            data-backdrop="false"
            id="modal-login"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content shadow-lg p-3 mb-5 bg-white rounded">
                <Login />
              </div>
            </div>
          </div>
        </li>
      );
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/dashboard" className="navbar-brand">
            Perspective
          </Link>
          {this.userCheck()}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="">
              <ul className="nav">
                <Search className="search-nav" />
                {this.createAuthority()}
                {this.loggedIn()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // backdrop: state.user.backdrop,
    user: state.user.username
  };
};

export default connect(
  mapStateToProps,
  { setUser, userLogOut }
)(Navbar);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, userLogOut } from "../../Redux/Reducers/UserReducer";
import axios from "axios";

import Search from "../Search/Search";
import "./Navbar.css";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("/api/sessionInfo").then(response => {
      // console.log(response.data);
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
          <Link
            onClick={() => {
              this.props.userLogOut(this.props.user);
              this.logout();
            }}
            className="logout-button">
            Logout
          </Link>
        </li>
      );
    } else {
      return (
        <li className="nav-item mr-3">
          <Link to="/login">Login</Link>
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
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent">
            <div className="">
              <ul className="navbar-nav mr-auto">
                <Search />
                <li className="nav-item mr-3">
                  <Link to="/createroom" className="nav-item">
                    Create Room
                  </Link>
                </li>
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
    user: state.user.username
  };
};

export default connect(
  mapStateToProps,
  { setUser, userLogOut }
)(Navbar);

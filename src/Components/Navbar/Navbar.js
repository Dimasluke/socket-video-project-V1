import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
          style={{
              textDecoration: "none",
              border: "none",
              background: "none"
          }}
          className='nav-link'
        >
            <Link to="/createroom" className="nav-item">
              Create Room
            </Link>
        </button>
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
            title="Must be logged in to do this.">
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
        this.props.history.push('/dashboard')
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
            color: 'red'
          }}
            onClick={() => {
              this.props.userLogOut(this.props.user);
              this.logout();
            }}
            className="nav-link">
            Logout
          </button>
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
          >
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </button>
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
              <ul className="nav">
                <Search className='search-nav' />
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
    user: state.user.username
  };
};

export default connect(
  mapStateToProps,
  { setUser, userLogOut }
)(withRouter(Navbar));

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, userLogOut } from "../../Redux/Reducers/UserReducer";
import "./Navbar.css";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("/api/sessionInfo").then(response => {
      console.log(response.data.username);
      this.props.setUser(response.data.username);
    });
  }

  userCheck = () => {
    if (this.props.user) {
      return (
        <span>
          <span className="profile-name"> - {this.props.user}</span>
        </span>
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
        if(this.props.user){
            return (
                <li className='nav-item mr-3'>
                    <button  
                        onClick={() => {
                            this.props.userLogOut(this.props.user)
                            this.logout()}} 
                        className='logout-button'>Logout</button>
                </li>
            )
        } else {
            return (
                <li className='nav-item mr-3'>
                    <Link to='/login'>Login</Link>
                </li>
            ) 
        }

 

  render() {
    console.log(this.props.user)
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
            <form className="form-inline my-2 my-lg-0 mr-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Text input with segmented dropdown button"
                  placeholder="Search"
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-success">
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <button className="dropdown-item">
                      Friends
                    </button>
                    <button className="dropdown-item">
                      Channels
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="">
              <ul className="navbar-nav mr-auto">
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
  console.log(state)
  return {
    user: state.user.username
  };
};

export default connect(
  mapStateToProps,
  { setUser, userLogOut }
)(Navbar);

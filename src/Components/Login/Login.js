import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../Redux/Reducers/UserReducer";
import axios from "axios";

import Register from "../Register/Register";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
      // userCheck: false
      // displayCheck: true
    };
  }

  loginUser = () => {
    // console.log("RESPONSE", response.data);
    const { username, password } = this.state;
    const userInfo = { username, password };
    axios
      .post("/api/login", userInfo)
      .then(response => {
        this.props.setUser(response.data);
        // this.props.setBackdrop(false);
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          errorMessage: err.response.data.message
        });
      });
  };

  errorCheck = () => {
    if (this.state.errorMessage) {
      return <span className="error-span">{this.state.errorMessage}</span>;
    }
  };

  showPassword = () => {
    let passwordInput = document.getElementById("inputPassword");
    passwordInput.type === "password"
      ? (passwordInput.type = "text")
      : (passwordInput.type = "password");
  };

  checkCredentials() {
    // console.log("USER CHECK", this.state.userCheck);
    const { username, password, userCheck } = this.state;
    if (userCheck === true) {
      return "modal";
    } else if (!username && !password) {
      return null;
    } else {
      return null;
    }
  }

  // componentWillUnmount() {
  //   console.log("this lifecycle was hit");
  //   this.setState({
  //     displayCheck: 0
  //   });
  // }

  render() {
    console.log("PROPS", this.state);
    return (
      <div
        // data-hide={`${this.state.displayCheck}`}
        // id="loginModal"
        className="container login-container"
        // style={{ opacity: `${this.state.displayCheck}` }}
      >
        {this.errorCheck()}
        <form>
          <div className="form-group">
            <label htmlFor="inputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              placeholder="Enter Username"
              onChange={e => {
                this.setState({
                  username: e.target.value
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPasswordCheck"
              onClick={this.showPassword}
            />
            <label className="form-check-label" htmlFor="showPasswordCheck">
              Show Password
            </label>
          </div>
          <button
            className="btn btn-primary mr-3 button-container"
            data-dismiss={this.checkCredentials()}
            onClick={e => {
              this.loginUser();
            }}>
            Submit
          </button>
          <Link
            to="/dashboard"
            className="btn btn-danger button-container"
            data-dismiss="modal">
            Cancel
          </Link>
        </form>
        <div className="register-account-container">
          <span className="span-register">Need an account?</span>
          <button
            type="button"
            class="btn btn-link"
            data-toggle="modal"
            data-target="#modal-register"
            style={{
              textDecoration: "none",
              border: "none",
              background: "none"
            }}>
            Click here
          </button>

          <div
            class="modal fade bd-example-modal-lg shadow-lg"
            data-backdrop="false"
            id="modal-register"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content shadow-lg p-3 mb-5 bg-white rounded">
                <Register />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(withRouter(Login));

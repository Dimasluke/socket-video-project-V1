import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../Redux/Reducers/UserReducer";
import "./Login.css";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  loginUser = () => {
    const { username, password } = this.state;
    const userInfo = { username, password };
    axios
      .post("/api/login", userInfo)
      .then(response => {
        // console.log(response.data);
        this.props.setUser(response.data);
        console.log("this.props.history", this.props.history);
        this.props.history.push("/dashboard");
      })
      .catch(err => {
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

  render() {
    return (
      <div className="container login-container border border-secondary rounded-sm shadow p-4 mb-5">
        {this.errorCheck()}
        <form>
          <div className="form-group">
            <label for="inputUsername">Username</label>
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
            <label for="inputPassword">Password</label>
            <input
              type="password"
              class="form-control"
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
            <label className="form-check-label" for="showPasswordCheck">
              Show Password
            </label>
          </div>
          <Link
            className="btn btn-primary mr-3 button-container"
            onClick={e => {
              this.loginUser();
            }}
          >
            Submit
          </Link>
          <Link to="/dashboard" className="btn btn-danger button-container">
            Cancel
          </Link>
        </form>
        <div className="register-account-container">
          <span className="span-login">Need an account?</span>
          <Link to="/register">Click Here</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Login);

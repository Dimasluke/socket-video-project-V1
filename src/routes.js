import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./Components/Landing/Landing";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import VideoRoom from "./Components/VideoRoom/VideoRoom";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import FriendsList from "./Components/FriendsList/FriendsList";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/friendslist" component={FriendsList} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/profile/:id" component={ProfilePage} />
    <Route exact path="/createroom" component={CreateRoom} />
    <Route exact path="/:roomId" component={VideoRoom} />
  </Switch>
);

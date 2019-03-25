import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import VideoRoom from './Components/VideoRoom/VideoRoom';
import CreateRoom from "./Components/CreateRoom/CreateRoom";

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/:roomId' component={VideoRoom} />
        <Route exact path="/createroom" component={CreateRoom} />

    </Switch>
)

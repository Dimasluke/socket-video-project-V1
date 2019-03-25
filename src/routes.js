import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ProfilePage from './Components/ProfilePage/ProfilePage';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile' component={ProfilePage} />
    </Switch>
)
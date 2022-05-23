import React from 'react'
import {Route, Switch, BrowserRouter } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import EditDates from './pages/EditDates'
import AddDish from './pages/AddDish'
import Status from './pages/Status'


function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={SignIn} />
                <Route path="/cadastrar" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route path="/add" component={AddDish} />
                <Route path="/edit" component={EditDates} />
                <Route path="/status" component={Status} />
                <Route path="/" component={SignIn} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
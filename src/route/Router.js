import React from 'react';
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login"
import { ShiftList } from '../components/pages/ShiftList';
import { CalenderPage } from '../components/pages/CalenderPage';

export const Router = () => {
    return(
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/calender">
                <CalenderPage />
            </Route>
            <Route path="/shift_list">
                <ShiftList />
            </Route>
        </Switch>

    );
}
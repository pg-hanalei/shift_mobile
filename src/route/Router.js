import React from 'react';
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login"
import { ShiftList } from '../components/pages/ShiftList';
import { CalendarPage } from '../components/pages/CalendarPage';

export const Router = () => {
    return(
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/calendar">
                <CalendarPage />
            </Route>
            <Route path="/shift_list">
                <ShiftList />
            </Route>
        </Switch>

    );
}
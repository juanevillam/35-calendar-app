import React from 'react';
import { AuthScreen } from '../components/auth/AuthScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export const AppRouter = () => {
    
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/auth" component={ AuthScreen } />
                    <Route exact path="/" component={ CalendarScreen } />
                    <Redirect to="/" />
                </Switch>
            </div>          
        </Router>
    );

};

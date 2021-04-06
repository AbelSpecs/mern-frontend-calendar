import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';
import { authCheckingFinish } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const {checking, uid} = useSelector(state => state.auth)

    useEffect(() => {
        
        dispatch(authCheckingFinish())
        
    }, [dispatch])

    if(checking){
        return <h5> Espere... </h5>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes 
                        path="/auth" 
                        component={AuthRouter}
                        isLoggedIn={!!uid}
                    />
                    <PrivateRoutes 
                        exact 
                        path="/" 
                        component={CalendarScreen} 
                        isLoggedIn={!!uid}
                    />
                    <Redirect to="/" />
                    
                </Switch>
            </div>

        </Router>
    )
}

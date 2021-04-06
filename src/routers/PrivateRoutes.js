import React from 'react'
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom'

export const PrivateRoutes = ({
    isLoggedIn,
    component: Component,
    ...rest //operador rest
}) => {

    /* console.log(rest.location.pathname);

    localStorage.setItem('lastpath', rest.location.pathname); */
    
    return ( 
        <Route {...rest}
            component={ (props) => (
                 (isLoggedIn)
                    ? (<Component {...props} />)
                    : (<Redirect to="/auth/login" />)
            )}
        
        
        />
            
        
    )
}

PrivateRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

import React from 'react'
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom'

export const PublicRoutes = ({
    isLoggedIn,
    component: Component,
    ...rest //operador rest
}) => {

    /* const lastpage = localStorage.getItem('lastpath', rest.location.pathname); */

    return (
        <Route {...rest}
            component={ (props) => (
                 (!isLoggedIn)
                    ? (<Component {...props} />)
                    : (<Redirect to="/" />)
            )}
        
        
        />
    )
}

PublicRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
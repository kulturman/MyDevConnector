import React from 'react';
import { Redirect , Route } from 'react-router-dom';

const PrivateRoute = ({isAllowed , ...props}) => {
    return isAllowed ? 
        <Route {...props} />
        : <Redirect to='login' />;
};

export default PrivateRoute;
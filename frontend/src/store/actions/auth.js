import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import history from '../../utils/history';

const authenticateUser = payload => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_RESOURCE_START});
        axios.post('/users/login' , payload)
        .then(response => {
            localStorage.setItem('jwtToken' , response.data.token);
            dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
            dispatch({type: actionTypes.AUTHENTICATE_USER_SUCCESS , payload: response.data});
            history.push('/dashboard');
            setAuthToken(response.data.token);
            dispatch(checkTokenExpiration(response.data.token));
        })
        .catch(err => {
            dispatch({
                type: actionTypes.FETCH_RESOURCE_FAIL,
                payload: {errors: err.response.data}
            });
        })
    }
}

const registerUser = payload => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_RESOURCE_START});
        axios.post('/users/register' , payload)
            .then(response => {
                dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
                history.push('/login');
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.FETCH_RESOURCE_FAIL,
                    payload: {errors: err.response.data}
                })
            })
    }
}

const authCheckState = () => {
    return dispatch => {
        const token = localStorage.jwtToken;
        if(token) {
            const { exp , user } = jwtDecode(token);
            if(exp <= new Date() / 1000) {
                dispatch(logout());
            }
            
            else {
                setAuthToken(token);
                axios.get('/users/current')
                    .then(response => {
                        dispatch({
                            type: actionTypes.AUTHENTICATE_USER_SUCCESS,
                            payload: {
                                user: response.data,
                                token: token
                            }
                        })
                    })
                /*dispatch({
                    type: actionTypes.AUTHENTICATE_USER_SUCCESS,
                    payload: {
                        user,
                        token
                    }
                });*/
                dispatch(checkTokenExpiration(token));
            }
        }
    }
}


const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        dispatch({type: actionTypes.LOGOUT});
        dispatch({type: actionTypes.CLEAR_CURRENT_PROFILE});
        history.push('/login');
    }
}

const checkTokenExpiration = token => {
    return dispatch => {
        const { exp } = jwtDecode(localStorage.jwtToken);
        const currentTime = Date.now();
        setTimeout(() => {
            dispatch(logout());
        }, (exp * 1000 - currentTime));
    }
}

export { authenticateUser , registerUser , authCheckState , logout , checkTokenExpiration };
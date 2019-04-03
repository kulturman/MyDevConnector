import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import history from '../../utils/history';

const getCurrentProfile = () => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_RESOURCE_START});
        axios.get('/profile')
            .then(response => {
                dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
                dispatch({type: actionTypes.SET_CURRENT_PROFILE , payload: response.data});
            })
            .catch(error => {
                dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
                dispatch({type: actionTypes.SET_CURRENT_PROFILE , payload: {}});
            })
    }
}

const addExperience = payload => {
    return addProfileEntities(payload , '/profile/experience');
}

const addEducation = payload => {
    return addProfileEntities(payload , '/profile/education');
}

const editProfile = payload => {
    return addProfileEntities(payload , '/profile' , () => {});
}

const addProfileEntities = (payload , url , callback) => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_RESOURCE_START});
        axios.post(url , payload)
            .then(() => {
                dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
                if(!callback) {
                    history.push('/dashboard');
                }

                else {
                    callback();
                }
            })
            .catch(error => {
                dispatch({type: actionTypes.FETCH_RESOURCE_FAIL , payload :{
                    errors: error.response.data
                }});
            })
    }
}

const deleteEducation = payload => {
    return deleteProfileEntities('/profile/education' , payload);
}

const deleteExperience = payload => {
    return deleteProfileEntities('/profile/experience' , payload);
}

const deleteProfileEntities = (url , payload) => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_RESOURCE_START});
        axios.delete(url + '/' + payload)
            .then(response => {
                dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
                dispatch({type: actionTypes.SET_CURRENT_PROFILE , payload: response.data});
            })
            .catch(error => {
                dispatch({type: actionTypes.FETCH_RESOURCE_FAIL , payload :{
                    errors: error.response.data
                }});
            })
    }
}

const getProfiles = () => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_RESOURCE_START});
        axios.get('/profile/all')
            .then(response => {
                dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
                dispatch({type: actionTypes.SET_PROFILES , payload: response.data});
            })
            .catch(error => {
                dispatch({type: actionTypes.FETCH_RESOURCE_FAIL , payload: {
                    errors: error.response.data
                }})
            })
    }       
}

const getProfile = payload => {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_RESOURCE_START});
        axios.get('/profile/handle/' + payload)
            .then(response => {
                dispatch({type: actionTypes.FETCH_RESOURCE_SUCCESS});
                dispatch({type: actionTypes.SET_VIEWING_PROFILE , payload: response.data});
            })
            .catch(error => {
                dispatch({type: actionTypes.FETCH_RESOURCE_FAIL , payload: {
                    errors: error.response.data
                }})
            })
    }
}
export { 
    getCurrentProfile , addExperience , addEducation , deleteEducation , deleteExperience , editProfile , getProfiles,
    getProfile
};
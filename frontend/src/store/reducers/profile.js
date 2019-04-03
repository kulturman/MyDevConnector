import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profiles: null,
    profile: null,
    viewingProfile: null
}

const profileRegister = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case actionTypes.SET_VIEWING_PROFILE:
            return {
                ...state,
                viewingProfile: action.payload
            }
        case actionTypes.SET_PROFILES:
            return {
                ...state,
                profiles: action.payload
            }
        case actionTypes.CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state;
    }
}


export default profileRegister;
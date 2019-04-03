import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    errors: {}
}

const fetchresourceReducer = (state = initialState , action) => {
    
    switch(action.type) {
        case actionTypes.FETCH_RESOURCE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.FETCH_RESOURCE_FAIL:
            return {
                ...state,
                loading: false,
                errors: {...action.payload.errors}
            };
        case actionTypes.FETCH_RESOURCE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {}
            };
        default:
            return state;
    }
}

export default fetchresourceReducer;
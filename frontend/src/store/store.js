import { createStore , applyMiddleware , combineReducers , compose } from 'redux';
import authReducer from './reducers/auth';
import fetchResourceReducer from './reducers/fetchResource';
import profileReducer from './reducers/profile';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
    fetchResource: fetchResourceReducer,
    profile: profileReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)));

export default store;
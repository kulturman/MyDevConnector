import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Landing from '../components/Landing/Landing';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Dashboard from '../containers/Dashboard/Dashboard';
import { Router , Route , Switch } from 'react-router-dom';
import history from '../utils/history';
import AddExperience from './Experience/AddExperience';
import AddEducation from './Education/AddEducation';
import PrivateRoute from '../components/commons/PrivateRoute';
import { connect } from 'react-redux';
import Profiles from './Profiles/Profiles';
import EditProfile from './Profile/EditProfile';
import ProfileFull from './Profiles/ProfileFull/ProfileFull';

class App extends Component {

    render() {
        return (
            <Router history={history}>
                <Layout>
                    <Switch>
                        <Route path='/' exact component={Landing} />
                        <Route path='/login' exact component={Login} />
                        <Route path='/register' exact component={Register} />
                        <Route path='/profiles' exact component={Profiles} />
                        <Route path='/profile/:id' exact component={ProfileFull} />
                        <PrivateRoute
                            path='/edit-profile'
                            exact component={EditProfile}
                            isAllowed={this.props.isAuthenticated}
                        />
                        <PrivateRoute isAllowed={this.props.isAuthenticated} path='/dashboard' exact component={Dashboard} />
                        <PrivateRoute 
                            isAllowed={this.props.isAuthenticated}
                            path='/add-experience'
                            exact component={AddExperience}
                        />
                        <PrivateRoute
                            isAllowed={this.props.isAuthenticated}
                            path='/add-education'
                            exact
                            component={AddEducation}
                        />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(App);
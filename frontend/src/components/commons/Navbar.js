import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as authActions from '../../store/actions/auth';

class Navbar extends React.Component {

    render() {
        const { token , user } = this.props.auth;
        let links = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                    Sign Up
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>
                </li>
            </ul>
        );

        if(token) {
            links = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/feed" exact>
                            Post Feed
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard" exact>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link"
                            href = ''
                            onClick={e => {
                                e.preventDefault();
                                this.props.onLogout(this.props.history);
                            }}>
                            <img
                                className="rounded-circle"
                                alt={user.name}
                                style={{width: '25px' , marginRight: '5px'}} 
                                src = {user.avatar}
                                title = 'Your gravatar'/>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        };

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
                <NavLink to="/" className="navbar-brand">
                    DevConnector
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#mobile-nav"
                >
                  <span className="navbar-toggler-icon" />
                </button>
        
                <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profiles">
                        {" "}
                        Developers
                      </NavLink>
                    </li>
                  </ul>
                    {links}
                </div>
              </div>
            </nav>
        );
    }
  
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: history => dispatch(authActions.logout(history))
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(withRouter(Navbar));

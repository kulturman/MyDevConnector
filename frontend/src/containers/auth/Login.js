import React, { Component } from "react";
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/InputGroup/InputGroup';

class Login extends Component {

    state = {
        email: '',
        password: ''
    };
    
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    render() {console.log(this.props.isAuthenticated);
        let content =  <Spinner />
        if(!this.props.loading) {
            content = (
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">
                            Sign in to your DevConnector account
                        </p>
                        <form>
                            <Input 
                                elementType='input'
                                onChange={this.onChangeHandler}
                                value={this.state.email}
                                error={this.props.errors.auth}
                                config={
                                    {
                                        placeholder: 'Email address',
                                        type: 'email',
                                        name: "email",
                                    }
                                }/>

                            <Input 
                                elementType='input'
                                onChange={this.onChangeHandler}
                                value={this.state.password}
                                config={
                                    {
                                        placeholder: 'Password',
                                        type: 'password',
                                        name: "password",
                                    }
                                }/>
                            <button type = 'button' 
                                className="btn btn-info btn-block mt-4" 
                                onClick={() => this.props.onAuthenticate(this.state)}>
                                Valider
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            )
        }

        if(this.props.isAuthenticated) {
            content = <Redirect to='/dashboard'/>
        }
        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (payload) => dispatch(authActions.authenticateUser(payload))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fetchResource.loading,
        errors: state.fetchResource.errors,
        isAuthenticated: state.auth.token != null
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Login);

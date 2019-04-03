import React from "react";
import * as authActions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import Input from '../../components/UI/InputGroup/InputGroup';

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        password2: '',
        name: ''
    };

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    render() {
        let content = <Spinner />;
        if(!this.props.loading) {
            content = (
                <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form noValidate>
                    <Input 
                        elementType='input'
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        error={this.props.errors.name}
                        config={
                            {
                                name: 'name',
                                placeholder: 'Name'
                            }
                        }
                        />
                    <Input 
                        elementType='input'
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        error={this.props.errors.email ? this.props.errors.email[0]: null}
                        info='This site uses Gravatar so if you want a profile image, use a
                        Gravatar email'
                        config={
                            {
                                name: 'email',
                                placeholder: 'Email address'
                            }
                        }
                        />
                    <Input 
                        elementType='input'
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        error={this.props.errors.password}
                        config={
                            {
                                name: 'password',
                                placeholder: 'Password',
                                type: 'password'
                            }
                        }
                        />
                    <Input 
                        elementType='input'
                        value={this.state.password2}
                        onChange={this.onChangeHandler}
                        error={this.props.errors.password2}
                        config={
                            {
                                name: 'password2',
                                placeholder: 'Confirm password',
                                type: 'password'
                            }
                        }
                        />
                    <button 
                        type="button"
                        className="btn btn-info btn-block mt-4"
                        onClick={() => this.props.onRegister(this.state , this.props.history)}>
                        Valider
                    </button>
                  </form>
                </div>
              </div>
            );
        }
        return (
            <div className="container">
              {content}
            </div>
        );
    }
  
};

const mapStateToProps = state => {
    return {
        loading: state.fetchResource.loading,
        errors: state.fetchResource.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (payload , history) => dispatch(authActions.registerUser(payload , history))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Register);

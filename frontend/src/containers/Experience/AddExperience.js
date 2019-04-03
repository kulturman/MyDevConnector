import React, { Component } from "react";
import { Link } from 'react-router-dom';
import InputGroup from '../../components/UI/InputGroup/InputGroup';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/profile';

class AddExperience extends Component {

    state = {
        title: '',
        company: '',
        from: '',
        to: '',
        current: false,
        description: '',
        location: ''
    }

    onChangeHandler = (e) => {
        e.persist();
        this.setState((previousState , props) => {
            if(e.target.type === 'checkbox') {
                return {
                    [e.target.name] : !previousState.current 
                }
            }
            return {
                [e.target.name] : e.target.value 
            }
        });
    }

    render() {
        let content = <Spinner />;
        const { errors } = this.props;
        if(!this.props.loading) {
            content = (
                <div className="col-md-8 m-auto">
                    <Link to="dashboard" className="btn btn-light">
                        Go Back
                    </Link>
                    <h1 className="display-4 text-center">Add Your Experience</h1>
                    <p className="lead text-center">
                        Add any developer/programming positions that you have had in the
                        past
                    </p>
                    <small className="d-block pb-3">* = required field</small>
                    <form>
                        <InputGroup 
                            error={errors.title}
                            onChange={this.onChangeHandler}
                            value={this.state.title}
                            config = {
                                {
                                    placeholder: "* Job Title",
                                    name: "title",
                                    type: "text"
                                }
                            }
                        />

                        <InputGroup 
                            onChange={this.onChangeHandler}
                            value={this.state.company}
                            error={errors.company}
                            config = {
                                {
                                    placeholder: "* Company",
                                    name: "company",
                                    type: "text"
                                }
                            }
                        />

                        <InputGroup 
                            onChange={this.onChangeHandler}
                            value={this.state.location}
                            config = {
                                {
                                    placeholder: "Location",
                                    name: "location",
                                    type: "text"
                                }
                            }
                        />
                        <h6>From Date</h6>
                        <InputGroup 
                            value={this.state.from}
                            error={errors.from}
                            onChange={this.onChangeHandler}
                            config = {
                                {
                                    name: "from",
                                    type: "date"
                                }
                            }
                        />
                        <h6>To Date</h6>
                        <InputGroup 
                            onChange={this.onChangeHandler}
                            value={this.state.to}
                            config = {
                                {
                                    name: "to",
                                    type: "date"
                                }
                            }
                        />

                        <InputGroup 
                            elementType='checkbox'
                            onChange={this.onChangeHandler}
                            label='Current Job'
                            value={this.state.current}
                            config = {
                                {
                                    name: "current",
                                    id: "current"
                                }
                            }
                        />

                        <InputGroup 
                            elementType='textarea'
                            onChange={this.onChangeHandler}
                            value={this.state.description}
                            info='Some of your responsabilities, etc'
                            config = {
                                {
                                    name: "description",
                                    placeholder: "Job Description"
                                }
                            }
                        />

                        <button
                            type="button"
                            className="btn btn-info btn-block mt-4"
                            onClick={() => this.props.addExperience(this.state)}
                            >
                            Valider
                        </button>
                    </form>
                </div>
            );
        }
            return (
                <div className="section add-experience">
                    <div className="container">
                        <div className="row">
                            {content}
                        </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fetchResource.loading,
        errors: state.fetchResource.errors
    }
}

const mapDispacthToProps = dispatch => {
    return {
        addExperience: payload => dispatch(actions.addExperience(payload))
    }
}

export default connect(mapStateToProps , mapDispacthToProps)(AddExperience);

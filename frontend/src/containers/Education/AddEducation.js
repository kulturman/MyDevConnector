import React, { Component } from "react";
import { Link } from 'react-router-dom';
import InputGroup from '../../components/UI/InputGroup/InputGroup';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/profile';

class AddEducation extends Component {

    state = {
        school: '',
        degree: '',
        from: '',
        to: '',
        current: false,
        description: '',
        fieldofstudy: ''
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
                    <h1 className="display-4 text-center">Add Your Education</h1>
                    <p className="lead text-center">
                        Add any school, bootcamp, etc that you have attended
                    </p>
                    <small className="d-block pb-3">* = required field</small>
                    <form>
                        <InputGroup 
                            error={errors.school}
                            onChange={this.onChangeHandler}
                            value={this.state.school}
                            config = {
                                {
                                    placeholder: "* School Or Bootcamp",
                                    name: "school",
                                }
                            }
                        />

                        <InputGroup 
                            onChange={this.onChangeHandler}
                            value={this.state.degree}
                            error={errors.degree}
                            config = {
                                {
                                    placeholder: "* Degree Or Certificate",
                                    name: "degree",
                                }
                            }
                        />

                        <InputGroup 
                            onChange={this.onChangeHandler}
                            value={this.state.fieldofstudy}
                            error={errors.fieldofstudy}
                            config = {
                                {
                                    placeholder: "Field Of Study",
                                    name: "fieldofstudy",
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
                            label='Current school'
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
                            info='Tell us about your experience and what you learned'
                            config = {
                                {
                                    name: "description",
                                    placeholder: "Program Description"
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
        addExperience: payload => dispatch(actions.addEducation(payload))
    }
}

export default connect(mapStateToProps , mapDispacthToProps)(AddEducation);

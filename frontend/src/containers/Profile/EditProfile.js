import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputGroup from '../../components/UI/InputGroup/InputGroup';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/profile';
import { isEmpty } from '../../utils/util';

class EditProfile extends Component {

    state = {
        handle: '',
        company: '',
        website: '',
        location: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        linkedin: '',
        status: 'Senior Developer',
    }
    
    static getDerivedStateFromProps(nextProps , previousState) {
        if(!previousState.hasBeenUpdated && nextProps.profile && !isEmpty(nextProps.profile)) {
            const { profile } = nextProps;
            const currentState = {
                'handle' : profile.handle || '',
                'company' : profile.company || '',
                'website' : profile.website || '',
                'location' : profile.location || '',
                'githubusername' : profile.githubusername || '',
                'bio' : profile.bio || '',
                'twitter' : profile.social ? profile.social.twitter || '' : '',
                'linkedin' : profile.social ? profile.social.linkedin || '' : '',
                'status' : profile.status || '',
            }
            currentState.skills = profile.skills.length > 0 ? profile.skills.join(',') : '';
            currentState.hasBeenUpdated = true;
            return currentState;
        }
        return null;
    }

    componentDidMount() {
        if(!this.props.profile) {
            this.props.getCurrentProfile();
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        });
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.editProfile(this.state);
    }

    render() {
        const {errors} = this.props;
        const statusOptions = [
            { label: 'Developer' },
            { label: 'Junior Developer' },
            { label: 'Senior Developer' },
            { label: 'Student or learning' },
            { label: 'Instructor or Teacher' },
            { label: 'Intern' },
            { label: 'Other' },
        ];

        let content = <Spinner />;
        if(!this.props.loading) {
            content = <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <InputGroup
                        error={errors.handle}
                        onChange={this.onChangeHandler}
                        value={this.state.handle}
                        options={
                            {

                            }
                        }
                        info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                        config={
                            {
                                name: 'handle',
                                placeholder: '* Profile handle'
                            }
                        }
                    />
                    
                    <InputGroup
                        elementType='select'
                        error={errors.status}
                        options={statusOptions}
                        onChange={this.onChangeHandler}
                        value={this.state.status}
                        info="Give us an idea of where you are at in your career"
                        config={
                            {
                                name: 'status',
                            }
                        }
                    />

                    <InputGroup
                        error={errors.company}
                        onChange={this.onChangeHandler}
                        value={this.state.company}
                        info="Could be your own company or one you work for"
                        config={
                            {
                                name: 'company',
                                placeholder: 'Company'
                            }
                        }
                    />
                    <InputGroup
                        error={errors.website}
                        onChange={this.onChangeHandler}
                        value={this.state.website}
                        info="Could be your own or a company website"
                        config={
                            {
                                name: 'website',
                                placeholder: 'Website'
                            }
                        }
                    />
                    <InputGroup
                        error={errors.location}
                        onChange={this.onChangeHandler}
                        value={this.state.location}
                        info="City &amp; state suggested (eg. Boston, MA)"
                        config={
                            {
                                name: 'location',
                                placeholder: 'Location'
                            }
                        }
                    />
                    <InputGroup
                        error={errors.skills}
                        onChange={this.onChangeHandler}
                        value={this.state.skills}
                        info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                        config={
                            {
                                name: 'skills',
                                placeholder: 'Skills'
                            }
                        }
                    />
                    <InputGroup
                        error={errors.githubusername}
                        onChange={this.onChangeHandler}
                        value={this.state.githubusername}
                        info="If you want your latest repos and a Github link, include your username"
                        config={
                            {
                                name: 'githubusername',
                                placeholder: 'Github Username'
                            }
                        }
                    />
                    <InputGroup
                        elementType='textarea'
                        error={errors.bio}
                        onChange={this.onChangeHandler}
                        value={this.state.bio}
                        info="Tell us a little about yourself"
                        config={
                            {
                                name: 'bio',
                                placeholder: 'A short bio of yourself'
                            }
                        }
                    />
                    <div className="mb-3">
                        <button type="button" className="btn btn-light">
                            Add Social Network Links
                        </button>
                        <span className="text-muted">
                            Optional
                        </span>
                    </div>
        
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fab fa-twitter"></i>
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Twitter Profile URL"
                            name="twitter"
                            value={this.state.twitter}
                            onChange={this.onChangeHandler}
                        />
                    </div>
        
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fab fa-linkedin"></i>
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Linkedin Profile URL"
                            name="linkedin"
                            value={this.state.linkedin}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </React.Fragment>;
        }
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                                Edit Your Profile
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required field</small>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fetchResource.loading,
        errors: state.fetchResource.errors,
        profile: state.profile.profile
    }
}

const mapDispacthToProps = dispatch => {
    return {
        editProfile: payload => dispatch(actions.editProfile(payload)),
        getCurrentProfile: () => dispatch(actions.getCurrentProfile())
    }
}

export default connect(mapStateToProps , mapDispacthToProps)(EditProfile);
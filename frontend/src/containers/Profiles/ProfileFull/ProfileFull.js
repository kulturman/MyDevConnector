import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/profile';
import ProfileHeader from './ProfileHeader';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ProfileAbout from './ProfileAbout';
import { Link } from 'react-router-dom';
import ProfileCredentials from './ProfileCredentials';

class ProfileFull extends Component {

    componentDidMount() {
        this.props.loadProfile(this.props.match.params.id);
    }
    render() {
        const { profile } = this.props;
        let content = <Spinner />
        if(!this.props.loading && profile) {
            content = (
                <div className="row">
                    <div className="col-md-12">
                    <div className="row">
                        <div className="col-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back To Profiles
                            </Link>
                        </div>
                        <div className="col-6">
            
                        </div>
                    </div>
                    <ProfileHeader profile ={profile}/>
                    <ProfileAbout 
                        name={profile.user.name}
                        bio={profile.bio}
                        skills={profile.skills}
                    />
                    <ProfileCredentials 
                        experiences={profile.experience}
                        educations={profile.education}
                    />
            
                    </div>
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    {content}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProfile: payload => dispatch(actions.getProfile(payload))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fetchResource.loading,
        profile: state.profile.viewingProfile
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ProfileFull);
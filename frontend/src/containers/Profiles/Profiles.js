import React, { Component } from 'react';
import ProfileSample from '../../components/ProfileSample/ProfileSample';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/profile';
import Spinner from '../../components/UI/Spinner/Spinner';

class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        let content = <Spinner />;
        if(!this.props.loading && this.props.profiles) {
            content = this.props.profiles.map(profile => {
                return <ProfileSample
                    handle={profile.handle}
                    company={profile.company}
                    avatar={profile.user.avatar}
                    name={profile.user.name}
                    key={profile._id}
                    location={profile.location}
                    skills={profile.skills}
                />
            });
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developers</p>
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
        profiles: state.profile.profiles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfiles: () => dispatch(actions.getProfiles())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Profiles);
import React, { Component } from "react";
import { connect } from 'react-redux';
import * as profileActions from '../../store/actions/profile';
import Spinner from '../../components/UI/Spinner/Spinner';
import Experience from "../Experience/Experience";
import Education from "../Education/Education";
import { isEmpty } from '../../utils/util';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchCurrentProfile();
    }

    render() {
        let content = <Spinner />;

        if(!this.props.loading && this.props.profile) {

            if(!isEmpty(this.props.profile)) {
                content = <React.Fragment>
                <div className="btn-group mb-4" role="group">
                    <Link to="edit-profile" className="btn btn-light">
                        <i className="fas fa-user-circle text-info mr-1" /> Edit
                        Profile
                    </Link>
                    <Link to="add-experience" className="btn btn-light">
                        <i className="fab fa-black-tie text-info mr-1" />
                        Add Experience
                    </Link>
                    <Link to="add-education" className="btn btn-light">
                        <i className="fas fa-graduation-cap text-info mr-1" />
                        Add Education
                    </Link>
                </div>
                <div>
                    <h4 className="mb-2">Experience Credentials</h4>
                    <Experience experiences={this.props.profile.experience}/>
                </div>

                <div>
                    <h4 className="mb-2">Education Credentials</h4>
                    <Education educations={this.props.profile.education}/>
                </div>
            </React.Fragment>;
           }

           else {
               content = <div>
                   <Link to='edit-profile' className='btn btn-success' style={{marginBottom: "20px"}}>
                        Create a profile
                   </Link>
                </div>
           }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            <p className="lead text-muted">
                                {this.props.user && <span>Welcome {this.props.user.name}</span>}
                            </p>
                            {content}
                            <div style={{marginBottom: "60px"}}>
                                <button className="btn btn-danger">Delete My Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        profile: state.profile.profile,
        loading: state.fetchResource.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCurrentProfile: () => dispatch(profileActions.getCurrentProfile())
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Dashboard);

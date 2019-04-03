import React from "react";

const ProfileHeader = (props) => {
    const { profile } = props;
    const { user } = profile;
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img
                            className="rounded-circle"
                            src={profile.user.avatar}
                            alt=""
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{user.name}</h1>
                        <p className="lead text-center">{profile.company}</p>
                        <p>{profile.location}</p>
                        <p>
                            {
                                profile.social && profile.social.linkedin ? (
                                    <a className="text-white p-2" href={profile.social.linkedin}>
                                        <i className="fab fa-linkedin fa-2x" />
                                    </a>
                                ) : null
                            }
                            
                            {
                                profile.social && profile.social.twitter ? (
                                    <a className="text-white p-2" href={profile.social.twitter}>
                                        <i className="fab fa-twitter fa-2x" />
                                    </a>
                                ) : null
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

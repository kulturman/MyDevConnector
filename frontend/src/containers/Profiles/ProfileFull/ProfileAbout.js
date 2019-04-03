import React from 'react';

const ProfileAbout = ({
    name, bio, skills
}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">{name}'s Bio</h3>
                    <p className="lead">
                        {bio}
                    </p>
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {
                                skills.map((skill , index) => (
                                        <div className="p-3" key={index}>
                                            <i className="fa fa-check"></i> {skill}
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAbout;
import React from "react";
import { Link } from 'react-router-dom';

const ProfileSample = ({
    name , company , location , skills ,
    avatar , handle
}) => {
    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img
                        className="rounded-circle"
                        src={avatar}
                        alt={name}
                    />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{name}</h3>
                    <p>{company}</p>
                    <p>{location}</p>
                    <Link to={"profile/" + handle} className="btn btn-info">
                        View Profile
                    </Link>
                </div>
                <div className="col-md-4 d-none d-lg-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {
                            skills.map((skill , index) => (
                                <li className="list-group-item" key={index}>
                                    <i className="fa fa-check pr-1" />{skill}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileSample;

import React from "react";
import { formatDateEnglish } from '../../../utils/util';

const ProfileCredentials = ({ experiences, educations }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
          {experiences.map((exp, index) => (
            <li className="list-group-item">
                <h4>{exp.company}</h4>
                <p>{formatDateEnglish(exp.from)} - {exp.to ? formatDateEnglish(exp.to) : 'Current' }</p>
                <p>
                    <strong>Position:</strong> {exp.title}
                </p>
                {
                    exp.description && (
                        <p>
                            <strong>Description:</strong> {exp.description}
                        </p>
                    )
                }

                {
                    exp.location && (
                        <p>
                            <strong>Location:</strong> {exp.location}
                        </p>
                    )
                }
                
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">
            {educations.map((edu, index) => (
                <li className="list-group-item">
                    <h4>{edu.school}</h4>
                    <p>{formatDateEnglish(edu.from)} - {edu.to ? formatDateEnglish(edu.to) : 'Current' }</p>
                    <p>
                        <strong>Degree:</strong> {edu.degree}
                    </p>
                    <p>
                        <strong>Field Of Study:</strong> {edu.fieldofstudy}
                    </p>

                    {
                        edu.location && (
                            <p>
                                <strong>Description:</strong> {edu.description}
                            </p>
                        )
                    }
                    
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCredentials;

import React, { Component } from 'react';
import { formatDateEnglish } from '../../utils/util';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/profile';

class Experience extends Component {

    onDeleteHandler = (id , e) => {
        this.props.deleteExperience(id);
        e.preventDefault();
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                     
                    {
                        this.props.experiences.map(exp => {
                            return <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td>{exp.title}</td>
                                <td>
                                    {formatDateEnglish(exp.from)} - {exp.to ? formatDateEnglish(exp.to) : 'Now'}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={this.onDeleteHandler.bind(this , exp._id)}
                                        >
                                        Delete
                                    </button>
                                </td>
                            </tr>;
                        })
                    }
                </tbody>
            </table>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteExperience: payload => dispatch(actions.deleteExperience(payload))
    }
}
export default connect(null , mapDispatchToProps)(Experience);
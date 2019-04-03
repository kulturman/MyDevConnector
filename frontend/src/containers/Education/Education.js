import React, { Component } from 'react';
import { formatDateEnglish } from '../../utils/util';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/profile';

class Education extends Component {

    onDeleteHandler = (id , e) => {
        this.props.deleteEducation(id);
        e.preventDefault();
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.educations.map(edu => {
                            return <tr key={edu._id}>
                                <td>{edu.school}</td>
                                <td>{edu.degree}</td>
                                <td>
                                    {formatDateEnglish(edu.from)} - {edu.to ? formatDateEnglish(edu.to) : 'Now'}
                                </td>
                                <td>
                                    <button 
                                        type='button'
                                        className="btn btn-danger"
                                        onClick={this.onDeleteHandler.bind(this , edu._id)}
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

const mapStateToProps = state => {
    return {
        loading: state.fetchResource.loading,
        profile: state.auth.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEducation: payload => dispatch(actions.deleteEducation(payload))
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Education);
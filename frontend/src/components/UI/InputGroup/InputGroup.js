import React from 'react';
import classnames from 'classnames';

const InputGroup = ({
        error,
        onChange,
        config,
        elementType,
        value,
        info,
        label,
        options
    }
) => {

    let content = null;

    switch(elementType) {
        
        case 'select' :
            content = <React.Fragment>
                <select
                    onChange = {onChange}
                    className="form-control form-control-lg"
                    {...config}
                    value={value}
                >
                {
                    options.map((option , index) => (
                        <option
                            key={index}
                            value={option.value ? option.value : option.label}
                        >
                            {option.label}
                        </option>
                    ))
                
                }
                </select>
                <small className="form-text text-muted">
                    {info}
                </small>
            </React.Fragment>;
            break;
        case 'checkbox' :
            content = <React.Fragment>
                        <input
                            type='checkbox'
                            onChange = {onChange}
                            checked={value}
                            className="form-check-input"
                            {...config}
                        />
                        <label className="form-check-label" htmlFor={config.id}>
                            {label}
                        </label>
                    </React.Fragment>;
                break;
        case 'textarea': 
            content = <React.Fragment>
                        <textarea
                            onChange = {onChange}
                            value={value}
                            className={
                                classnames("form-control form-control-lg" , {
                                    'is-invalid' : error
                                })
                            }
                            {...config}
                        >
                        </textarea>
                        <small className="form-text text-muted">
                            {info}
                        </small>
                    </React.Fragment>;
            break;
        default:
            content = <React.Fragment>
                    <input
                        onChange = {onChange}
                        value = {value}
                        className={
                            classnames("form-control form-control-lg" , {
                                'is-invalid' : error
                            })
                        }
                        {...config}
                    />
                    <small className="form-text text-muted">
                        {info}
                    </small>
                </React.Fragment>;
    }

    return (
        <div className={classnames(null , {
            'form-check mb-4' : elementType === 'checkbox',
            'form-group' : elementType !== 'checkbox'
        })}>
            {content}
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    );
};

export default InputGroup;
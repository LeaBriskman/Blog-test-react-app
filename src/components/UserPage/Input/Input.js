import React from 'react';
import './Input.css';

const Input = ({label, value, i}) => {
    return (
        <div className={`InputWrapper num${i}`}>
            <label className="Label" htmlFor={`Input${i}`}>{label}</label>
            <textarea className="Input" type="text" value={value} id={`Input${i}`}/>
        </div>
    );
};

export default Input;
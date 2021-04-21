import React from 'react';
import './AnswerWrapper.css';

const AnswerWrapper = ({children}) => {
    return (
        <div className="AnswerWrapper">
            <i className="far fa-question-circle"></i>
            {children}
        </div>
    );
};

export default AnswerWrapper;
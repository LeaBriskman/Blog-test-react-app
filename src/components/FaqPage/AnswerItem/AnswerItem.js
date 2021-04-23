import React from 'react';
import './AnswerItem.css';

const AnswerItem = ({ title, answer }) => {
    return (
        <div>
            <div className="Question">{title}</div>
            <div className="Answer">{answer}</div>
        </div>
    );
};

export default AnswerItem;
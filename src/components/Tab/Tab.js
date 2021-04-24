import React from 'react';
import './Tab.css';

const Tab = ({ title, active, onClick, counter }) => {
    let tabClassName = `Tab ${active ? ' active' : ''}`;
    let counterClassName = `Counter ${active ? ' blue' : ''}`;
    return (
        <div 
            className={tabClassName} 
            onClick={onClick}>{title} 
            {/* only for feed page */}
            {counter ? <div className={counterClassName}>{counter}</div> : ''}
        </div>
    );
};

export default Tab;
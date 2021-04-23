import React from 'react';
import './Tab.css';

const Tab = ({ title, active, onClick }) => {
    let classNames = 'Tab' + (active ? ' active' : '');
    return (
        <div className={classNames} onClick={onClick}>{title}</div>
    );
};

export default Tab;
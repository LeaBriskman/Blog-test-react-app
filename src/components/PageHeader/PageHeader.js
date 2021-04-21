import React from 'react';
import './PageHeader.css';

const PageHeader = ({header}) => {
    return(
        <div className="PageHeader">{header}</div>
    );
};

export default PageHeader;
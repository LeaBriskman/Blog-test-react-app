import React from 'react';
import './AlbumWrapper.css';

const AlbumWrapper = ({ children }) => {
    return(
        <div className="AlbumWrapper">{children}</div>
    );
};

export default AlbumWrapper;
import React from 'react';
import './AddAlbum.css';

const AddAlbum = ({ onClick }) => {
    return (
        <div className="AddAlbumWrapper" onClick={onClick}>
            <span>+</span> <div className="AddAlbum">Add album</div>
        </div>
    );
};

export default AddAlbum;
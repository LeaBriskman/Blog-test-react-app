import React from 'react';
import './AlbumItem.css';

const AlbumItem = ({title, author, image, onClick}) => {
    return (
        <>
            <div className="AlbumPhoto">{image}</div>
            <div>
                <div className="AlbumAuthor">{author}</div>
                <div className="AlbumTitle">{title}</div>
            </div>
            <div className="MenuWrapper">
                <div className="AlbumMenu">...</div>
                <div className="Dropdown">
                    <div className="DeleteBtn" onClick={onClick}>Delete</div>
                </div>
            </div>
        </>
    );
};

export default AlbumItem;
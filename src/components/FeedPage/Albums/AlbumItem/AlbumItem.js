import React from 'react';
import './AlbumItem.css';

const AlbumItem = ({ title, author, image, onClickDelete, onClickOpenModal }) => {
    return (
        <>
            <div className="AlbumPhoto" onClick={() => onClickOpenModal()}>{image}</div>
            <div>
                <div className="AlbumAuthor">{author}</div>
                <div className="AlbumTitle">{title}</div>
            </div>
            <div className="MenuWrapper">
                <div className="AlbumMenu">...</div>
                <div className="Dropdown">
                    <div className="DeleteBtn" onClick={() => onClickDelete()}>Delete</div>
                </div>
            </div>
        </>
    );
};

export default AlbumItem;
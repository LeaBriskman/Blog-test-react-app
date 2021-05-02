import React from 'react';
import './DeleteModal.css';
import trash from './img/Trash.png';

const DeleteModal = ({ deleteAlbum, itemToDelete }) => {
    return (
        <>
            <img src={trash} alt="Delete icon"/>
            <div className="DeleteModalTitle">Delete album</div>
            <div className="DeleteModalMessage">Album will be permanently deleted</div>
            <button className="DeleteAlbumBtn" onClick={() => deleteAlbum(itemToDelete)}>Delete</button>
        </>
    );
};

export default DeleteModal;
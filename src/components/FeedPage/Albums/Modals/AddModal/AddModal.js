import React from 'react';
import './AddModal.css';

const AddModal = ({ addAlbum, disabled }) => {
    return (
        <>
            <div className="AddModalTitle">Add album</div>
            <div className="ModalInputWrapper">
                <label className="AddModalLabel">Title</label>
                <input className="AddModalInput" />
            </div>
            <div className="ModalInputWrapper">
                <label className="AddModalLabel">Description</label>
                <input className="AddModalInput" />
            </div>
            <button className="AddModalBtn" onClick={addAlbum()} disabled={disabled}>Send</button>
        </>
    );
};

export default AddModal;
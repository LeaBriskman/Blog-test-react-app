import React from 'react';

const AddModal = ({ addAlbum }) => {
    return (
        <>
            <div className="AddModalTitle">Add album</div>
            <label className="AddModalLabel">Title</label>
            <input className="AddModalInput" />
            <label className="AddModalLabel">Description</label>
            <input className="AddModalInput" />
            <button onClick={addAlbum()}>Send</button>
        </>
    );
};

export default AddModal;
import React, { useState } from 'react';
import './PhotoModal.css';

const PhotoModal = ({ title = 'Title', photos, startPhotoId = 0 }) => {
    const [currentPhotoId, setCurrentPhotoId] = useState(startPhotoId);

    const prev = () => {
        setCurrentPhotoId( currentPhotoId === 0 ? photos.length - 1 : currentPhotoId - 1 );
    };

    const next = () => {
        setCurrentPhotoId( currentPhotoId === photos.length ? 0 : currentPhotoId + 1 );
    };

    const photoUrl = photos[currentPhotoId] ? photos[currentPhotoId].thumbnailUrl : null;

    return (
        <>
            <div className="PhotoModalPhoto">
                {photoUrl ? (<img src={photoUrl} alt="Slide" />) : ''}
            </div>
            <div className="PhotoModalTitle">{title}</div>
            <i className="fas fa-chevron-left PhotoModalSlider" onClick={prev}></i>
            <i className="fas fa-chevron-right PhotoModalSlider" onClick={next}></i>
        </>
    );
};

export default PhotoModal;
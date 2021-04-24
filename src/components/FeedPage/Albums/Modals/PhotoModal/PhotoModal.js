import React, { useEffect } from 'react';
import './PhotoModal.css';

const PhotoModal = ({ photo, title }) => {
    return (
        <>
            <div className="PhotoModalPhoto">{photo}</div>
            <div className="PhotoModalTitle">{title}</div>
            <i className="fas fa-chevron-left PhotoModalSlider"></i>
            <i className="fas fa-chevron-right PhotoModalSlider"></i>
        </>
    );
};

export default PhotoModal;
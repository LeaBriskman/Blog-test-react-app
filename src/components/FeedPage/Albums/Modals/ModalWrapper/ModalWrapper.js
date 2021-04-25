import React from 'react';
import './ModalWrapper.css';

const ModalWrapper = ({ children, isOpened, closeModal, photoSlider }) => {
    let classNames = 'Modal' + (isOpened ? ' opened' : ' closed');

    const style = photoSlider ? null : {
        padding: '60px 80px',
        backgroundColor: '#FFFFFF',
        minWidth: '520px', 
    }

    return (
        <div className={classNames}>
            <div className="CloseModalLayer" onClick={() => closeModal()}></div>
            <div className="ModalContent" style={style}>
                <i className="fas fa-times CloseModalBtn" onClick={() => closeModal()}></i>
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
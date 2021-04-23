import React from 'react';
import './ModalWrapper.css';

const ModalWrapper = ({ children, isOpened, closeModal }) => {
    let classNames = 'Modal' + (isOpened ? ' opened' : ' closed');

    return (
        <div className={classNames}>
            <div className="CloseModalLayer" onClick={() => closeModal()}></div>
            <div className="ModalContent">
                <i className="fas fa-times CloseModalBtn" onClick={() => closeModal()}></i>
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
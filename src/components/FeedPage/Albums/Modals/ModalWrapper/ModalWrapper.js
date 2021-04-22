import React from 'react';
import './ModalWrapper.css';

const ModalWrapper = ({ children, isOpened, closeModal }) => {
    let classNames = 'Modal' + (isOpened ? ' opened' : ' closed');

    return (
        <div className={classNames}>
            <div className="ModalContent">
                <div className="CloseModalBtn" onClick={() => closeModal()}>x</div>
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
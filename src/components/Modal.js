import React from 'react';

const Modal = ({ isOpen, handleClose, children }) => {

  return (
    <div className="modal-div">
      <div className="modal-content">
        <div className="modal-body">{children}        
        </div>
      </div>
      <button className="close" onClick={handleClose}>X</button>
  </div>
  );
};

export default Modal;
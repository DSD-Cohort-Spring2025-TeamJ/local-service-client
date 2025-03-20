import React from 'react';
import Button from '/src/components/Button.jsx'

const Modal = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      onClick={onClose}>
      <div
        className="modal-content"

        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end">
        <Button className="main-button w-[20px] h-[20px] bg-[#4BCE4B] px-[5px] py-[5px] text-[#4B4B4B] text-sm 
        font-sans flex flex items-center justify-center"
          text="X"
          onClick={onClose} />
          </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;


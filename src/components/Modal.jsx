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
        <Button className="modal-close absolute top-2 right-2 bg-[#4BCE4B] rounded-[.5rem] no-underline px-[5px] py-[5px] w-[20px] h-[20px]
        text-[#4B4B4B] text-sm font-sans flex items-center justify-center
        hover:bg-green-700 
        hover:text-white
        active:scale-90"
          text="X"
          onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
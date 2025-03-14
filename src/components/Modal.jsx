import React from 'react';
import Button from '/src/components/Button.jsx'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay fixed top-1/2 left-1/2 transform translate-x-1/2 -translate-y-1/2 z-999" 
    onClick={onClose}>
      <div className="modal-content fixed top-1/2 transform -translate-x-1/2 -translate-y-1/2
      bg-[#F0F0F0] border-3 border-black rounded-lg shadow-[2px_3px_3px_1px_rgba(50, 48, 50, 0.5)]
      w-[50vw] p-2 z-1000 text-center front-serif text-xl" 
      onClick={(e) => e.stopPropagation()}>
        <Button className="modal-close absolute top-2 right-2 bg-[#4BCE4B] rounded-[.5rem] no-underline px-[5px] py-[5px] w-[20px] h-[20px]
        text-[#4B4B4B] text-sm font-sans flex items-center justify-center"
        hover:bg-green-700 
        hover:text-white
        active:scale-90
        text="X"
        onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
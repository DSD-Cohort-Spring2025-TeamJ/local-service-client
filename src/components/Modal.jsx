import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay fixed top-1/2 left-1/2 transform translate-x-1/2 -translate-y-1/2 z-999" 
    onClick={onClose}>
      <div className="modal-content fixed top-1/2 transform -translate-x-1/2 -translate-y-1/2
      bg-[#F0F0F0] border-3 border-black rounded-1g
      shadow-[2px_3px_3px_1px_rgba(50, 48, 50, 0.5)]
      w-[50vw] p-2 z-1000 text-center front-serif text-xl" 
      onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
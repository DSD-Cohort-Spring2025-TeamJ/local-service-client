import PropTypes from "prop-types";
import Button from "/src/components/Button.jsx";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content h-[75%]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end">
          <Button
            className="main-button w-[20px] h-[20px] bg-[#4BCE4B] px-[5px] py-[5px] text-[#4B4B4B] text-sm 
        font-sans flex items-center justify-center"
            text="X"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;

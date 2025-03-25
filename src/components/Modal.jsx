import PropTypes from "prop-types";
import Button from "/src/components/Button.jsx";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <Button
            className="w-8 h-8 bg-green-300 text-gray-800 rounded-full hover:cursor-pointer flex items-center justify-center hover:bg-green-500 transition"
            text="X"
            onClick={onClose}
          />
        </div>
        <div className="overflow-y-auto max-h-[75vh] py-2">{children}</div>
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

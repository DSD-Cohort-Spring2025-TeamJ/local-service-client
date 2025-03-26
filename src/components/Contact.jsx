import Button from "/src/components/Button.jsx";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Contact({ setOpen }) {
  const location = useLocation();
  return (
    <div className="flex justify-end -mr-15 mb-10">
      {location.pathname === "/admin" ? null : (
        <Button
          className="main-button contact bg-yellow-200 w-50 h-10 rounded-lg shadow-green-500/50"
          text="Book online!"
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
}

Contact.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import pipe from "/src/assets/pipe.png";

export default function Pipe({ className }) {
  return <img src={pipe} className={className} alt="metal pipe" />;
}

Pipe.propTypes = {
  className: PropTypes.string,
};

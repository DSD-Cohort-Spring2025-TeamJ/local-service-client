import PropTypes from "prop-types";

const Message = ({ text, style }) => {
  return <div className={style}>{text}</div>;
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

export default Message;

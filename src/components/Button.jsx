import PropTypes from "prop-types";

const Button = ({
  className,
  text,
  onClick,
  type = "button",
  id,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      id={id}
      {...otherProps}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
};

export default Button;

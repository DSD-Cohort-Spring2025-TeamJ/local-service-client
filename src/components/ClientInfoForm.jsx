import { useContext } from "react";
import { Context } from "../context/Context";
import PropTypes from "prop-types";

const ClientInfoForm = () => {
  const { appointment, setAppointment } = useContext(Context);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAppointment({
      ...appointment,
      [id]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold mb-4">Client Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="name"
          label="Full Name"
          value={appointment.name}
          onChange={handleInputChange}
          placeholder="Enter full name"
        />
        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={appointment.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
        />
        <InputField
          id="address"
          label="Address"
          value={appointment.address}
          onChange={handleInputChange}
          placeholder="Street, City, State"
        />
        <InputField
          id="phone"
          label="Phone Number"
          type="tel"
          value={appointment.phone}
          onChange={handleInputChange}
          placeholder="(123) 456-7890"
        />
      </div>
      <div>
        <label
          htmlFor="comment"
          className="text-gray-700 font-medium mb-2 block"
        >
          Additional Comments
        </label>
        <textarea
          id="comment"
          value={appointment.comment || ""}
          onChange={handleInputChange}
          placeholder="Add any notes or special requests..."
          rows={4}
          className="w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        />
      </div>
    </div>
  );
};

const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div>
    <label htmlFor={id} className="text-gray-700 font-medium mb-1 block">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition"
    />
  </div>
);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default ClientInfoForm;

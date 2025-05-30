import { useState, useContext } from "react";
import { Context } from "../context/Context";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Login = () => {
  const { setUser } = useContext(Context);
  const history = useHistory();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const r = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });
    const user = await r.json();
    if (user.error) {
      alert("incorrect username or password");
    } else {
      setUser(user);
    }
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    history.push("/admin");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6 mt-10 w-full max-w-[400px] mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
      <form
        className="grid grid-cols-1 justify-items-center gap-6 w-full"
        onSubmit={handleFakeSubmit}
      >
        <InputField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <div className="w-full">
          <InputField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <a
            href="#"
            className="text-xs font-semibold text-green-600 hover:text-green-500 block mt-1 text-right"
          >
            Forgot Password?
          </a>
        </div>
        <button
          className="bg-[#4BCE4B] w-full h-10 text-[#4B4B4B] font-semibold rounded-md hover:bg-green-500 transition"
          type="submit"
        >
          Log In
        </button>
      </form>
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
  <div className="w-full">
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

export default Login;

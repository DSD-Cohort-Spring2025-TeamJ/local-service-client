import { useContext } from "react";
import { Context } from "../context/Context";

const ClientInfoForm = () => {
  //State to manage form
  const { appointment, setAppointment } = useContext(Context);

  //Input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAppointment({
      ...appointment,
      [id]: value,
    });
  };

  return (
    <div>
      <h1>Client Information</h1>
      <section id="client_info">
        <label htmlFor="name">Full Name: </label>
        <input
          required
          type="text"
          id="name"
          value={appointment.name}
          onChange={handleInputChange}
        />{" "}
        <br />
        <label htmlFor="email">Email: </label>
        <input
          required
          type="email"
          id="email"
          value={appointment.email}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="address">Address: </label>
        <input
          required
          type="text"
          id="address"
          value={appointment.address}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="phone">Phone Number: </label>
        <input
          required
          type="tel"
          id="phone"
          value={appointment.phone}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="comment">Comments: </label>
        <textarea
          required
          id="comment"
          value={appointment.comment}
          onChange={handleInputChange}
        />
      </section>
    </div>
  );
};

export default ClientInfoForm;

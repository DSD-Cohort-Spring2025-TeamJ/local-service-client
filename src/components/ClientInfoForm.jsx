import React, { useContext } from 'react';
import { Context } from '../context/Context';

const ClientInfoForm = () => {
  //State to manage form
  const { appointment, setAppointment } = useContext(Context);

  //Input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAppointment({
      ...appointment,
      [id]: value
    });
  };

  //Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log('Form Data Submitted:', appointment);
    //Send data to calendar API
    try {
      const response = await fetch('http://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Form submitted successfully');

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <div>
      <section id="client_request">
      </section> <br />
      <section id="client_info">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" value={appointment.name} onChange={handleInputChange} /> <br />
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" value={appointment.email} onChange={handleInputChange} /><br />
          <label htmlFor="address">Address: </label>
          <input type="text" id="address" value={appointment.address} onChange={handleInputChange} /><br />
          <label htmlFor="phone">Phone Number: </label>
          <input type="tel" id="phone" value={appointment.phone} onChange={handleInputChange} /><br />
          <label htmlFor="comment">Comments: </label>
          <textarea id="comment" value={appointment.comment} onChange={handleInputChange} /><br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default ClientInfoForm;

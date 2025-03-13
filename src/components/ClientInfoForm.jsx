import React, { useContext } from 'react';
import { Context } from '../context/Context';
import Button from "/src/components/Button.jsx"

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
      const response = await fetch('https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments', {
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
          <Button 
            className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
            shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
            text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
            hover:bg-green-700 hover:text-white
            active:scale-90 border-[#005701]"
            text="Submit"
            type="submit"/>
        </form>
      </section>
    </div>
  );
};

export default ClientInfoForm;

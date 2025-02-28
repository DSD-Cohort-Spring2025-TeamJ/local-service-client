import React, { useState, useEffect } from 'react';

const ClientInfoForm = () => {
    //State to manage form
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      comments: ''
    });

    //Input changes
    const handleInputChange = (e) => {
      const {id, value} = e.target;
      setFormData({
        ...formData,
        [id]: value
      });
    };

    //Handle submission
    const handleSubmit = (e) => {
      e.preventDefault( );
      //Send data to calendar API
      try {
        const response = await fetch(//'https',
          {method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(formData),
        });

        if(!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Success:', JSON.stringify(result));
        alert('Form submitted successfully');
      }
      catch (error) {
        console.error('Error:', error);
        alert('Error submitting form');
    };

    return (
      <div>
        <section id="client_request">
          {/* <FormCalendar /> */}
        </section> <br />
        <section id="client_info">
          <form onSubmit={handleSubmit}>
            <label htmlFor="stringCalendar">Date: </label>
            <input type="datetime-local" id="stringCalendar" value={formData.stringCalendar} onChange={handleInputChange} /> <br />
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} /> <br />
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} /><br />
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" value={formData.address} onChange={handleInputChange} /><br />
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} /><br />
            <label htmlFor="comments">Comments: </label>
            <textarea id="comments" value={formData.comments} onChange={handleInputChange} /><br />
            <label htmlFor="service">Service: </label>
            <select id="service" value={formData.service} onChange={handleInputChange}>
              <option value="">Select a service</option>
              <option value="service1">Service 1</option>
              <option value="service2">Service 2</option>
              <option value="service3">Service 3</option>
            </select> <br />
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  };

  export default ClientInfoForm;

import React, { useState } from 'react';

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
      console.log('Form Data Submitted:', formData);
      //Send data to calendy API
    };

    return (
      <div>
        <section id="client_service">
          {/*Client service section */}
        </section>
        <section id="client_request">
          {/*Client request section */}
        </section>
        <section id="client_info">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} /> <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} /><br />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={formData.address} onChange={handleInputChange} /><br />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} /><br />
            <label htmlFor="comments">Comments:</label>
            <textarea id="comments" value={formData.comments} onChange={handleInputChange} /><br />
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  };

  export default ClientInfoForm;

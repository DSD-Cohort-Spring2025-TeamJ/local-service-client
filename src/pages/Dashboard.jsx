import React, { useState } from "react";
import AppointmentsList from "../components/AppointmentsList";
import AppointmentDetails from "../components/AppointmentDetails";

const Dashboard = () => {
  const [appointment, setAppointment] = useState(null);
  return (
    <div>
      <AppointmentsList setAppointment = {setAppointment} appointment = {appointment} />
      <AppointmentDetails appointment = {appointment} />
    </div>
  );
};

export default Dashboard;

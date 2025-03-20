import { useState } from "react";
import AppointmentsList from "../components/AppointmentsList";
import AppointmentDetails from "../components/AppointmentDetails";

const Dashboard = () => {
  const [appointment, setAppointment] = useState(null);
  return (
    <div>
      {!appointment ? (
        <AppointmentsList
          setAppointment={setAppointment}
          appointment={appointment}
        />
      ) : (
        <AppointmentDetails
          appointment={appointment}
          setAppointment={setAppointment}
        />
      )}
    </div>
  );
};

export default Dashboard;

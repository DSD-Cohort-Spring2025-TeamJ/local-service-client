import { useState } from "react";
import AppointmentsList from "../components/AppointmentsList";
import AppointmentDetails from "../components/AppointmentDetails";
import CalendarEvents from "../components/CalendarEvents";

const Dashboard = () => {
  const [appointment, setAppointment] = useState(null);
  return (
    <div className="max-w-7xl p-4 mx-auto">
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

      <CalendarEvents />
    </div>
  );
};

export default Dashboard;

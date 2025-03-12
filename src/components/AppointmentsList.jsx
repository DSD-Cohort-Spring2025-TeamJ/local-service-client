import { useState, useEffect } from "react";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); //Empty array to run only once
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const appointmentTable = appointments.map((appointment) => {
    return (
      <tr key={appointment.appointment_id} className="text-center text-sm">
        <td className="px-2 py-2">{appointment.appointment_id}</td>
        <td className="px-2 py-2">{appointment.service_id.service_id}</td>
        <td className="px-2 py-2">{appointment.client_note}</td>
        <td className="px-2 py-2">{appointment.issue_description}</td>
        <td className="px-2 py-2">{appointment.location}</td>
        <td className="px-2 py-2">{appointment.admin_note}</td>
        <td className="px-2 py-2">{appointment.created_at}</td>
        <td className="px-2 py-2">{appointment.updated_at}</td>
        <td className="px-2 py-2">{appointment.estimated_time}</td>
        <td className="px-2 py-2">{appointment.status}</td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Appointments</h1>
      <table className="min-w-full table-auto border-collapse text-zinc-300">
        <thead>
          <tr className="text-center text-sm">
            <th className="px-2 py-2">Appointment ID</th>
            <th className="px-2 py-2">Service ID</th>
            <th className="px-2 py-2">Client Note</th>
            <th className="px-2 py-2">Description</th>
            <th className="px-2 py-2">Location</th>
            <th className="px-2 py-2">Admin Note</th>
            <th className="px-2 py-2">Created At</th>
            <th className="px-2 py-2">Updated At</th>
            <th className="px-2 py-2">Estimated Time</th>
            <th className="px-2 py-2">Status</th>
          </tr>
        </thead>
        <tbody>{appointmentTable}</tbody>
      </table>
    </div>
  );
}

export default AppointmentsList;

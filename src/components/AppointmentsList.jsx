import { useState, useEffect } from "react";

function AppointmentsList({ setAppointment }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments",
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

  const handleAppointmentClick = async (id) => {
    try {
      const response = await fetch(
        `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAppointment(data);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  const appointmentTable = appointments.map((appointment) => {
    return (
      <tr key={appointment.appointment_id}>
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
        <td className="px-2 py-2">
          <button
            onClick={() => handleAppointmentClick(appointment.appointment_id)}
            className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px] h-[25px] mb-2 mr-2
        shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
        text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
        active:scale-90">
            View Details
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Appointments</h1>
      <table className="min-w-full table-auto border-collapse">
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

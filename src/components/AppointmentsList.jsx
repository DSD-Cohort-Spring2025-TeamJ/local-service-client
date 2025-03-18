import { useState, useEffect } from "react";
import DataGrid from "./DataGrid";

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

  const customButton = props => {
    return (
      <button
        onClick={() => handleAppointmentClick(props.data["Appointment ID"])}
        className="button">
        View Details
      </button>)
  }
  const rowData = appointments.map(a => ({ "Appointment ID": a.appointment_id, "Service ID": a.service_id.service_id, "Description": a.issue_description, "Location": a.location, "Admin Note": a.admin_note, "Estimated Time": a.estimated_time, "Status": a.status }))
  const colDefs = [{ field: "Appointment ID" }, { field: "Service ID" }, { field: "Description" }, { field: "Location" }, { field: "Admin Note" }, { field: "Estimated Time" }, { field: "Status" }, {
    field: "actions",
    headerName: "Actions",
    cellRenderer: customButton

  }]

  return (
    <div>
      <h1>Appointments</h1>
      <DataGrid colDefs={colDefs} rowData={rowData} />
    </div>
  );
}

export default AppointmentsList;

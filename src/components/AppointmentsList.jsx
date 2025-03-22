import { useState, useEffect } from "react";
import DataGrid from "./DataGrid";
import PropTypes from "prop-types";

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
        `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${id}`,
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

  const customButton = (props) => {
    return (
      <button
        onClick={() => handleAppointmentClick(props.data["Appointment ID"])}
        className="text-gray-700 font-semibold hover:underline hover:cursor-pointer  transition "
      >
        View Details &rarr;
      </button>
    );
  };

  const customCellRenderer = (props) => {
    if (props.colDef.field === "Status") {
      const colorMap = {
        PENDING: "bg-yellow-200 text-yellow-800",
        ACCEPTED: "bg-green-200 text-green-800",
        REJECTED: "bg-red-200 text-red-800",
        COMPLETED: "bg-blue-200 text-blue-800",
      };
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            colorMap[props.value] || "bg-gray-200 text-gray-700"
          }`}
        >
          {props.value}
        </span>
      );
    }
    return <div className="text-sm text-gray-700 py-1">{props.value}</div>;
  };

  const CustomHeader = (props) => {
    return (
      <div className=" text-white px-0 py-2 font-bold">{props.displayName}</div>
    );
  };

  CustomHeader.propTypes = {
    displayName: PropTypes.string.isRequired,
  };

  const rowData = appointments.map((a) => ({
    "Appointment ID": a.appointment_id,
    "Service ID": a.service_id.service_id,
    Description: a.issue_description,
    Location: a.location,
    "Admin Note": a.admin_note,
    "Estimated Time": a.estimated_time,
    Status: a.status,
  }));

  const colDefs = [
    {
      field: "Appointment ID",
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      minWidth: 140,
    },
    {
      field: "Service ID",
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "Description",
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 2,
      minWidth: 200,
    },
    {
      field: "Location",
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      minWidth: 150,
      tooltipField: "Location",
      tooltipComponent: "customTooltip",
    },
    {
      field: "Admin Note",
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 2,
      minWidth: 200,
    },
    {
      field: "Estimated Time",
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      minWidth: 130,
    },
    {
      field: "Status",
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerComponent: CustomHeader,
      cellRenderer: customButton,
      flex: 1,
      minWidth: 140,
    },
  ];

  return (
    <div className="my-8">
      <h1 className="text-xl font-semibold text-left p-2">Appointments</h1>
      <DataGrid colDefs={colDefs} rowData={rowData} height={700} />
    </div>
  );
}

export default AppointmentsList;

AppointmentsList.propTypes = {
  setAppointment: PropTypes.func.isRequired,
};

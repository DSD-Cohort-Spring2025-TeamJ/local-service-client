import { useAppointments } from "../hooks/useAppointments";
import { formatDateRange } from "../utils/formatDateRange";
import DataGrid from "./DataGrid";
import PropTypes from "prop-types";

export default function AppointmentsList({ setAppointment }) {
  const { appointments, loading, error } = useAppointments();

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAppointmentClick = async (id) => {
    try {
      const response = await fetch(
        `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${id}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAppointment(data);
    } catch (error) {
      console.error(error);
    }
  };

  const customCellRenderer = (props) => {
    if (props.colDef.field === "Start / End Time") {
      const { startDate, startTime, endTime } = formatDateRange(
        props.data.start_time,
        props.data.end_time
      );
      return (
        <div className="flex flex-col gap-1">
          <span className="text-green-800 text-xs font-semibold">
            {startDate}
          </span>
          <div className="text-sm text-gray-700">
            {startTime} — {endTime}
          </div>
        </div>
      );
    }
    if (props.colDef.field === "Status") {
      const colorMap = {
        PENDING: "bg-yellow-100 text-yellow-800",
        ACCEPTED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-700",
        COMPLETED: "bg-blue-100 text-blue-700",
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

  const customButton = (props) => (
    <button
      onClick={() => handleAppointmentClick(props.data["ID"])}
      className="border border-gray-300 text-gray-700 rounded px-3 py-1 text-sm hover:cursor-pointer hover:bg-gray-100 transition"
    >
      View &rarr;
    </button>
  );

  const CustomHeader = (props) => (
    <div className="text-black px-0 py-2 font-bold">{props.displayName}</div>
  );

  const sortedAppointments = [...appointments].sort(
    (a, b) => b.appointment_id - a.appointment_id
  );

  const rowData = sortedAppointments.map((a) => ({
    ID: a.appointment_id,
    Service: a.service_id.service_name,
    Description: a.issue_description,
    Location: a.location,
    start_time: a.start_time,
    end_time: a.end_time,
    "Start / End Time": "time",
    Status: a.status,
  }));

  const colDefs = [
    {
      field: "ID",
      sortable: true,
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      minWidth: 80,
      cellClass: "text-left",
    },
    {
      field: "Service",
      sortable: true,
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      cellClass: "text-left",
      minWidth: 150,
    },
    {
      field: "Description",
      sortable: false,
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 2,
      cellClass: "text-left",
      minWidth: 120,
    },
    {
      field: "Location",
      sortable: true,
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      cellClass: "text-left",
      minWidth: 200,
    },
    {
      field: "Start / End Time",
      sortable: false,
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1.5,
      cellClass: "text-left",
      minWidth: 200,
    },
    {
      field: "Status",
      sortable: true,
      cellRenderer: customCellRenderer,
      headerComponent: CustomHeader,
      flex: 1,
      cellClass: "text-left",
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerComponent: CustomHeader,
      cellRenderer: customButton,
      flex: 1,
      cellClass: "text-left",
      minWidth: 140,
    },
  ];

  return (
    <div className="my-8">
      <h1 className="text-xl font-semibold text-left p-2">Appointments</h1>
      <DataGrid
        colDefs={colDefs}
        rowData={rowData}
        defaultSortCol="Appointment ID"
      />
    </div>
  );
}

AppointmentsList.propTypes = {
  setAppointment: PropTypes.func.isRequired,
};

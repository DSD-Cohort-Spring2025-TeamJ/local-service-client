import PropTypes from "prop-types";
import { useState } from "react";
import DataGrid from "./DataGrid";

function AppointmentDetails({ appointment, setAppointment }) {
  if (!appointment) return <h1>Loading...</h1>;

  const {
    appointment_id,
    client_name,
    client_email,
    client_phone,
    start_time,
    end_time,
    issue_description,
    estimated_time,
    status,
    service_id,
    location,
    admin_note,
    assigned_technician_list,
    quoted_price,
    missing_item_list,
  } = appointment.appointment;

  const [note, setNote] = useState(admin_note ?? "");
  const [disabled, setDisabled] = useState(
    status === "ACCEPTED" || status === "REJECTED"
  );

  const handleUpdateStatus = async (newStatus) => {
    fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${appointment_id}/${newStatus}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAppointment({
          ...appointment,
          status: data.status,
        });
        setDisabled(true);
        alert(`You have ${data.status} this appointment.`);
      });
  };

  const handleSaveNotes = async () => {
    fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: appointment_id,
          admin_note: note,
        }),
      }
    );
  };

  const apptRowData = [
    {
      "Client Name": client_name,
      Phone: client_phone,
      Email: client_email,
      Address: location,
      Comments: issue_description,
      "Date Selected": start_time?.split("T")[0],
      "Time Selected": end_time,
      "Estimated Time": estimated_time,
      Status: status,
    },
  ];
  const apptColDefs = [
    { field: "Client Name" },
    { field: "Phone" },
    { field: "Email" },
    { field: "Address" },
    { field: "Comments" },
    { field: "Date Selected" },
    { field: "Time Selected" },
    { field: "Estimated Time" },
    { field: "Status" },
  ];

  const itemRowData = appointment.items.map((i) => ({
    Name: i.item.item_name,
    "Qty Needed": i.qty_needed,
    "In Stock": i.outOfStock ? "No" : "Yes",
    "Unit Price": i.item.unit_price,
  }));
  const itemColDefs = [
    { field: "Name" },
    { field: "Qty Needed" },
    { field: "In Stock" },
    { field: "Unit Price" },
  ];

  return (
    <>
      <div>
        <h1>Job Details</h1>
        <h3>{appointment_id}</h3>
        <button
          className="modal-close absolute top-2 right-2 bg-[#4BCE4B] rounded-[.5rem] no-underline px-[5px] py-[5px] w-[20px] h-[20px]
        text-[#4B4B4B] text-sm font-sans flex items-center justify-center
        hover:bg-green-700 
        hover:text-white
        active:scale-90"
          onClick={() => setAppointment(null)}
        >
          X
        </button>
        <h1>Client Information</h1>
        <DataGrid rowData={apptRowData} colDefs={apptColDefs} height={100} />
      </div>
      <div>
        <h1>Inventory Check</h1>
        <DataGrid rowData={itemRowData} colDefs={itemColDefs} height={300} />
        <h1>Notes</h1>
        <textarea
          className="w-full h-32 border"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <br />
        <button className="button" onClick={handleSaveNotes}>
          Save Notes
        </button>
        <button className="button" onClick={() => setNote("")}>
          Discard
        </button>
        <br />
        <br />
        <button
          disabled={disabled}
          className="button"
          onClick={() => handleUpdateStatus("ACCEPTED")}
        >
          Accept
        </button>
        <button
          disabled={disabled}
          className="button"
          onClick={() => handleUpdateStatus("REJECTED")}
        >
          Decline
        </button>
      </div>
    </>
  );
}

AppointmentDetails.propTypes = {
  appointment: PropTypes.shape({
    appointment: PropTypes.shape({
      appointment_id: PropTypes.number.isRequired,
      client_name: PropTypes.string.isRequired,
      client_email: PropTypes.string.isRequired,
      client_phone: PropTypes.string.isRequired,
      start_time: PropTypes.string,
      end_time: PropTypes.string,
      issue_description: PropTypes.string,
      estimated_time: PropTypes.string,
      status: PropTypes.string.isRequired,
      service_id: PropTypes.number,
      location: PropTypes.string,
      admin_note: PropTypes.string,
      assigned_technician_list: PropTypes.array,
      quoted_price: PropTypes.number,
      missing_item_list: PropTypes.array,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.shape({
          item_name: PropTypes.string.isRequired,
          unit_price: PropTypes.number.isRequired,
        }).isRequired,
        qty_needed: PropTypes.number.isRequired,
        outOfStock: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setAppointment: PropTypes.func.isRequired,
};

export default AppointmentDetails;

// below is from roxys merge leaving here just in case something is needed

// import { useState } from "react";
// import DataGrid from "./DataGrid";

// function AppointmentDetails({ appointment, setAppointment }) {
//   if (!appointment) return <h1>Loading...</h1>;
//   const {
//     appointment_id,
//     client_name,
//     client_email,
//     client_phone,
//     start_time,
//     end_time,
//     issue_description,
//     estimated_time,
//     status,
//     service_id,
//     location,
//     admin_note,
//     assigned_technician_list,
//     quoted_price,
//     missing_item_list,
//   } = appointment.appointment;

//   const [note, setNote] = useState(admin_note ?? ""); // admin_note comes in as null by default, and the value prop of a textarea cannot be null
//   const [disabled, setDisabled] = useState(
//     status === "ACCEPTED" || status === "REJECTED" ? true : false,
//   );
//   const handleUpdateStatus = async (newStatus) => {
//     fetch(
//       `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${appointment_id}/${newStatus}`,
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//       },
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setAppointment({
//           ...appointment,
//           status: data.status,
//         });
//         setDisabled(true);
//         alert(`You have ${data.status} this appointment.`);
//       });
//   };

//   const handleSaveNotes = async () => {
//     fetch(
//       `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/`,
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           appointment_id: appointment_id,
//           admin_note: note,
//         }),
//       },
//     );
//   };

//   const apptRowData = [
//     {
//       "Client Name": client_name,
//       Phone: client_phone,
//       Email: client_email,
//       Address: location,
//       Comments: issue_description,
//       "Date Selected": start_time?.split("T")[0],
//       "Time Selected": end_time,
//       "Estimated Time": estimated_time,
//       Status: status,
//     },
//   ];
//   const apptColDefs = [
//     { field: "Client Name" },
//     { field: "Phone" },
//     { field: "Email" },
//     { field: "Address" },
//     { field: "Comments" },
//     { field: "Date Selected" },
//     { field: "Time Selected" },
//     { field: "Estimated Time" },
//     { field: "Status" },
//   ];

//   const itemRowData = appointment.items.map((i) => ({
//     Name: i.item.item_name,
//     "Qty Needed": i.qty_needed,
//     "In Stock": i.outOfStock ? "No" : "Yes",
//     "Unit Price": i.item.unit_price,
//   }));
//   const itemColDefs = [
//     { field: "Name" },
//     { field: "Qty Needed" },
//     { field: "In Stock" },
//     { field: "Unit Price" },
//   ];

//   return (
//     <>
//       <div>
//         <h1>Job Details</h1>
//         <h3>{appointment_id}</h3>
//         <button
//           className="modal-close absolute top-2 right-2 bg-[#4BCE4B] rounded-[.5rem] no-underline px-[5px] py-[5px] w-[20px] h-[20px]
//         text-[#4B4B4B] text-sm font-sans flex items-center justify-center
//         hover:bg-green-700
//         hover:text-white
//         active:scale-90"
//           onClick={() => setAppointment(null)}
//         >
//           X
//         </button>
//         <h1>Client Information</h1>
//         <DataGrid rowData={apptRowData} colDefs={apptColDefs} height={100} />
//       </div>
//       <div>
//         <h1>Inventory Check</h1>
//         <DataGrid rowData={itemRowData} colDefs={itemColDefs} height={300} />
//         <h1>Notes</h1>
//         <textarea
//           className="w-full h-32 border"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//         ></textarea>
//         <br />
//         <button className="button" onClick={handleSaveNotes}>
//           Save Notes
//         </button>
//         <button className="button" onClick={() => setNote("")}>
//           Discard
//         </button>
//         <br />
//         <br />
//         <button
//           disabled={disabled}
//           className="button"
//           onClick={() => handleUpdateStatus("ACCEPTED")}
//         >
//           Accept
//         </button>
//         <button
//           disabled={disabled}
//           className="button"
//           onClick={() => handleUpdateStatus("REJECTED")}
//         >
//           Decline
//         </button>
//       </div>
//     </>
//   );
// }

// export default AppointmentDetails;

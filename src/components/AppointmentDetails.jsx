import { useState } from 'react';
import DataGrid from "./DataGrid";

function AppointmentDetails({ appointment, setAppointment }) {
  if (!appointment) return <h1>Loading...</h1>
  const { appointment_id, client_name, client_email, client_phone, start_time, end_time, issue_description, estimated_time, status, service_id, location, admin_note, assigned_technician_list, quoted_price, missing_item_list } = appointment.appointment;

  const [note, setNote] = useState(admin_note ?? "") // admin_note comes in as null by default, and the value prop of a textarea cannot be null

  const handleUpdateStatus = async (newStatus) => {
    fetch(`https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${appointment_id}/${newStatus}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => alert(`You have ${data.status} this appointment.`))
  }

  const disabled = status === "ACCEPTED" || "REJECTED" ? true : false
  const handleSaveNotes = async () => {
    fetch(`https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointment_id: appointment_id,
          admin_note: note
        })
      })
  }

  const apptRowData = [{ "Client Name": client_name, "Phone": client_phone, "Email": client_email, "Address": location, "Comments": issue_description, "Date Selected": start_time?.split("T")[0], "Time Selected": end_time, "Estimated Time": estimated_time, "Status": status }]
  const apptColDefs = [{ field: "Client Name" }, { field: "Phone" }, { field: "Email" }, { field: "Address" }, { field: "Comments" }, { field: "Date Selected" }, { field: "Time Selected" }, { field: "Estimated Time" }, { field: "Status" }]

  const itemRowData = appointment.items.map(i => ({ "Name": i.item.item_name, "Qty Needed": i.qty_needed, "In Stock": i.outOfStock ? "No" : "Yes", "Unit Price": i.item.unit_price }))
  const itemColDefs = [{ field: "Name" }, { field: "Qty Needed" }, { field: "In Stock" }, { field: "Unit Price" }]


  return (
    <>
      <div>
        <h1>Job Details</h1>
        <h3>{appointment_id}</h3>
        <button className="modal-close absolute top-2 right-2 bg-[#4BCE4B] rounded-[.5rem] no-underline px-[5px] py-[5px] w-[20px] h-[20px]
        text-[#4B4B4B] text-sm font-sans flex items-center justify-center
        hover:bg-green-700 
        hover:text-white
        active:scale-90"
          onClick={() => setAppointment(null)}>X</button>
        <h1>Client Information</h1>
        <DataGrid rowData={apptRowData} colDefs={apptColDefs} height={100} />
      </div>
      <div>
        <h1>Inventory Check</h1>
        <DataGrid rowData={itemRowData} colDefs={itemColDefs} height={300} />
        <h1>Notes</h1>
        <textarea className="w-full h-32 border" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
        <br />
        <button className="button" onClick={handleSaveNotes}>Save Notes</button>
        <button className="button" onClick={() => setNote("")}>Discard</button>
        <br /><br />
        <button disabled={disabled} className="button" onClick={() => handleUpdateStatus("ACCEPTED")}>Accept</button>
        <button disabled={disabled} className="button" onClick={() => handleUpdateStatus("REJECTED")}>Decline</button>
      </div>
    </>
  );
}

export default AppointmentDetails;

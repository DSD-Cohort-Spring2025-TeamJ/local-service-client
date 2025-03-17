import { useState } from 'react';

function AppointmentDetails({ appointment, setAppointment }) {
  if (!appointment) return <h1>Loading...</h1>
  const { appointment_id, client_name, client_email, client_phone, start_time, end_time, issue_description, estimated_time, status, service_id, location, admin_note, assigned_technician_list, quoted_price, missing_item_list } = appointment.appointment;

  const [disabled, setDisabled] = useState(false)

  const itemTable = appointment.items.map(i => {
    return (
      <tr key={i.item_id} className="text-center text-sm" style={{ padding: "10px" }}>
        <td className="px-2 py-2">{i.item.item_name}</td>
        <td className="px-2 py-2">{i.qty_needed}</td>
        <td className="px-2 py-2">{i.outOfStock === false ? "Yes" : "No"}</td>
        <td className="px-2 py-2">{i.item.unit_price}</td>
        {/* Total Cost */}
      </tr>
    );
  }
  );
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
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="text-center text-sm">
              <th className="px-2 py-2">Client Name</th>
              <th className="px-2 py-2">Phone</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Address</th>
              <th className="px-2 py-2">Comments</th>
              <th className="px-2 py-2">Date Selected</th>
              <th className="px-2 py-2">Time Selected</th>
              <th className="px-2 py-2">Estimated Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-2">{client_name}</td>
              <td className="px-2 py-2">{client_phone}</td>
              <td className="px-2 py-2">{client_email}</td>
              <td className="px-2 py-2">{location}</td>
              <td className="px-2 py-2">{issue_description}</td>
              {/* <td className="px-2 py-2">{}</td> */}
              <td className="px-2 py-2">{start_time?.split("T")[0]}</td>
              <td className="px-2 py-2">{end_time}</td>
              <td className="px-2 py-2">{estimated_time}</td>
              <td className="px-2 py-2">{status}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1>Inventory Check</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="text-center text-sm">
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Qty Needed</th>
              <th className="px-2 py-2">In Stock</th>
              <th className="px-2 py-2">Unit Price</th>
              {/* <th className="px-2 py-2">Total Cost</th> */}
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </table>
        <h1>Notes</h1>
        <textarea className="w-full h-32">

        </textarea>
        <br />
        <button className="button">DISCARD</button>
        <button disabled={disabled} className="button" onClick={() => setDisabled(true)}>Accept</button>
        <button className="button" onClick={() => setAppointment(null)}>Decline</button>
        <button className="button">Save</button>
      </div>
    </>
  );
}

export default AppointmentDetails;

import { useState, useEffect } from "react";

//details table and inventory table
//accept id as a prop
//Get id and render in dashboard

function AppointmentDetails({appointment}) {
    if (!appointment) return <h1>Loading...</h1>
    const {client_name, client_email, client_phone, start_time, end_time, issue_description, estimated_time, status, service_id, location, admin_note, assigned_technician_list, quoted_price, missing_item_list} = appointment.appointment;

    const itemTable = appointment.items.map((item) => {
      return (
        <tr key={item.item_id} className="text-center text-sm" style={{padding: "10px"}}>
          <td className="px-2 py-2">{item.item.item_name}</td>
          <td className="px-2 py-2">{item.qty_needed}</td>
          <td className="px-2 py-2">{item.outOfStock ? "Yes" : "No"}</td>
          <td className="px-2 py-2">{item.item.unit_price}</td>
          {/* Total Cost */}
        </tr>
      );
    }
    );
      return (
        <>
        <div>
          <h1>Job Details</h1>
          <h3>Dynamic Job Number</h3>
          <h1>Client Information</h1>
          <table className="min-w-full table-auto border-collapse text-zinc-300">
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
          <table className="min-w-full table-auto border-collapse text-zinc-300">
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
          <button>DISCARD</button>
          <button>Accept</button>
          <button>Decline</button>
          <button>Save</button>
        </div>
        </>
      );
}

export default AppointmentDetails;

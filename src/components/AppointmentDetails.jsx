import PropTypes from "prop-types";
import { useState } from "react";

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
    location,
    admin_note,
  } = appointment.appointment;

  const items = appointment.items || [];
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);

  const [note, setNote] = useState(admin_note ?? "");
  const [disabled, setDisabled] = useState(
    status === "ACCEPTED" || status === "REJECTED",
  );

  const handleUpdateStatus = async (newStatus) => {
    fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${appointment_id}/${newStatus}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      },
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
      },
    );
  };

  const statusColors = {
    PENDING: "bg-yellow-300 text-yellow-800",
    ACCEPTED: "bg-green-300 text-green-800",
    REJECTED: "bg-red-300 text-red-800",
    COMPLETED: "bg-blue-300 text-blue-800",
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-xl relative m-4">
      <button
        className="absolute top-2 right-2 bg-green-500 text-white w-7 h-7 text-sm flex items-center justify-center rounded-full hover:bg-green-700 active:scale-90 transition"
        onClick={() => setAppointment(null)}
      >
        ✕
      </button>

      <h1 className="text-3xl font-bold mb-4">
        Job Details - #{appointment_id}
      </h1>

      {/* Client Information */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            👤 {client_name}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${client_phone}`}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
          >
            📞 {client_phone}
          </a>
          <a
            href={`mailto:${client_email}`}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
          >
            ✉️ {client_email}
          </a>
        </div>

        <div className="text-gray-600 italic flex items-center gap-2">
          📍 <span>{location || "No address provided"}</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg text-blue-700 text-sm">
            📅 <span>{start_time?.split("T")[0]}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg text-blue-700 text-sm">
            ⏰ <span>{end_time || "Not set"}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg text-green-700 text-sm">
            ⏳ <span>{estimated_time || "N/A"} mins</span>
          </div>
        </div>

        <div className="mt-4">
          <details className="bg-gray-50 p-3 rounded-md cursor-pointer">
            <summary className="font-semibold text-gray-700">
              View Comments
            </summary>
            <p className="mt-2 text-gray-600">
              {issue_description || "No comments"}
            </p>
          </details>
        </div>
      </div>

      {/* Inventory Check */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Inventory Check
        </h2>
        {items.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left font-semibold">Item Name</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Qty Needed
                </th>
                <th className="px-4 py-2 text-left font-semibold">
                  Stock Status
                </th>
                <th className="px-4 py-2 text-left font-semibold">
                  Unit Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-gray-50/50" : ""
                  }`}
                >
                  <td className="px-4 py-2">{item.item.item_name}</td>
                  <td className="px-4 py-2">{item.qty_needed}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.outOfStock
                          ? "bg-red-200 text-red-700"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      {item.outOfStock ? "Out of Stock" : "In Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-2">${item.item.unit_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No items needed for this job.</p>
        )}
      </div>

      {/* Notes Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 relative">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center gap-2">
          🗒️ Admin Notes
        </h2>
        <textarea
          className="w-full h-32 p-4 border rounded-lg resize-none shadow-sm focus:ring-2 focus:ring-blue-200 transition"
          placeholder="Write any notes here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="text-right text-sm text-gray-400 mt-1">
          {note.length} / 500
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setNote("")}
            disabled={!note.length}
            className="flex items-center gap-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition disabled:opacity-30"
          >
            🗑️ Clear
          </button>
          <button
            onClick={handleSaveNotes}
            disabled={!note.length}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition disabled:opacity-40"
          >
            💾 Save
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-8 mt-8">
        <button
          disabled={disabled}
          onClick={() => setShowDeclineConfirm(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition shadow-sm
    ${
      disabled
        ? "bg-red-100 border-red-200 text-red-400 cursor-not-allowed"
        : "bg-red-300 text-red-800 border-red-400 hover:bg-red-400"
    }`}
        >
          ❌ Decline
        </button>

        <button
          disabled={disabled}
          onClick={() => handleUpdateStatus("ACCEPTED")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition shadow-sm
      ${
        disabled
          ? "bg-green-100 border-green-200 text-green-400 cursor-not-allowed"
          : "bg-green-300 text-green-800 border-green-400 hover:bg-green-400"
      }`}
        >
          ✅ Accept
        </button>
      </div>

      <ConfirmModal
        isOpen={showDeclineConfirm}
        message="Are you sure you want to decline this appointment?"
        onConfirm={() => {
          handleUpdateStatus("REJECTED");
          setShowDeclineConfirm(false);
        }}
        onCancel={() => setShowDeclineConfirm(false)}
      />
    </div>
  );
}

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-full bg-red-400 hover:bg-red-500 text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const InfoField = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}:</p>
    <p className="text-base font-medium">{value || "-"}</p>
  </div>
);

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

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
      location: PropTypes.string,
      admin_note: PropTypes.string,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.shape({
          item_name: PropTypes.string.isRequired,
          unit_price: PropTypes.number.isRequired,
        }).isRequired,
        qty_needed: PropTypes.number.isRequired,
        outOfStock: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  setAppointment: PropTypes.func.isRequired,
};

export default AppointmentDetails;

import PropTypes from "prop-types";
import { useState } from "react";
import { formatDateRange } from "../utils/formatDateRange";
import { useNotification } from "../hooks/useNotification";
import { useAppointmentDetailActions } from "../hooks/useAppointmentDetailActions";
import { statusColors } from "../utils/statusColors";
function AppointmentDetails({ appointment, setAppointment }) {
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
    service_id,
  } = appointment.appointment;

  const serviceName = service_id?.service_name || "Service";
  const items = appointment.items || [];
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [note, setNote] = useState(admin_note ?? "");

  const { notification, showNotification } = useNotification();

  const {
    handleUpdateStatus,
    handleSaveNotes,
    handleRestock,
    restockInputs,
    setRestockInputs,
    disabled,
  } = useAppointmentDetailActions(
    appointment,
    setAppointment,
    showNotification
  );

  if (!appointment) return <h1>Loading...</h1>;

  const { startDate, startTime, endTime } = formatDateRange(
    start_time,
    end_time
  );

  return (
    <div className="relative text-black">
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl text-center max-w-sm w-full">
            {notification}
          </div>
        </div>
      )}

      <div className="p-2 pt-8 sm:pt-0 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-xl relative m-2 sm:m-4">
        <button
          className="absolute top-2 right-2 bg-green-200 text-green-800 w-7 h-7 flex items-center justify-center rounded-full hover:bg-green-300 hover:cursor-pointer transition"
          onClick={() => setAppointment(null)}
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
          Service Type: {serviceName}{" "}
          <span className="text-gray-400">#{appointment_id}</span>
        </h1>

        {/* Client Information */}
        <div className="bg-white p-2 sm:p-6 rounded-xl sm:shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              👤 {client_name}
            </h2>
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
            <Pill icon="📅" text={startDate} color="blue" />
            <Pill icon="⏰" text={`${startTime} — ${endTime}`} color="purple" />
            <Pill icon="⏳" text={`${estimated_time} minutes`} color="green" />
          </div>

          <div className="mt-4">
            <details className="bg-gray-50 p-3 rounded-md cursor-pointer">
              <summary className="font-semibold text-gray-700">
                View Client Comments
              </summary>
              <p className="mt-2 text-gray-600">
                {issue_description || "No comments provided."}
              </p>
            </details>
          </div>
        </div>

        {/* Inventory */}
        <div className="bg-white p-2 sm:p-6 rounded-xl sm:shadow-md mb-8 overflow-x-auto mt-8">
          <h2 className="text-xl font-semibold text-left mb-4 border-b pb-2">
            Inventory Check
          </h2>
          {items.length > 0 ? (
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-semibold">Item Name</th>
                  <th className="px-4 py-2 font-semibold">Qty Needed</th>
                  <th className="px-4 py-2 font-semibold">Stock</th>
                  <th className="px-4 py-2 font-semibold">Restock</th>
                  <th className="px-4 py-2 font-semibold">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
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
                        {item.outOfStock
                          ? "Out of Stock"
                          : `In Stock (${item.item.stock_qty})`}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {item.outOfStock ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="number"
                            min="1"
                            placeholder="Qty?"
                            value={restockInputs[item.item.item_id] || ""}
                            onChange={(e) =>
                              setRestockInputs({
                                ...restockInputs,
                                [item.item.item_id]: e.target.value,
                              })
                            }
                            className="w-20 border p-1 rounded-md"
                          />
                          <button
                            onClick={() =>
                              handleRestock(
                                item.item.item_id,
                                item.item.stock_qty,
                                item
                              )
                            }
                            className="text-blue-600 underline text-xs hover:text-blue-800 hover:cursor-pointer"
                          >
                            Order now
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-300 text-xs italic text-center">
                          —
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">${item.item.unit_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">
              No items needed for this appointment.
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white p-2 sm:p-6 rounded-2xl sm:shadow-md mb-8 relative">
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
              className="flex items-center gap-1 px-3 py-2 rounded-full hover:cursor-pointer text-gray-600 hover:bg-gray-100 transition disabled:opacity-30"
            >
              🗑️ Clear
            </button>
            <button
              onClick={() => handleSaveNotes(appointment_id, note)}
              disabled={!note.length}
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full hover:cursor-pointer transition disabled:opacity-40"
            >
              💾 Save
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-6">
          <button
            disabled={disabled}
            onClick={() => setShowDeclineConfirm(true)}
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full hover:cursor-pointer transition disabled:opacity-30"
          >
            Decline
          </button>
          <button
            disabled={disabled}
            onClick={() => handleUpdateStatus("ACCEPTED")}
            className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full hover:cursor-pointer transition disabled:opacity-30"
          >
            Accept
          </button>
        </div>

        <ConfirmModal
          isOpen={showDeclineConfirm}
          onCancel={() => setShowDeclineConfirm(false)}
          onConfirm={() => {
            handleUpdateStatus("REJECTED");
            setShowDeclineConfirm(false);
          }}
          message="Are you sure you want to decline this appointment?"
        />
      </div>
    </div>
  );
}

const Pill = ({ icon, text, color }) => (
  <div
    className={`flex items-center gap-2 bg-${color}-50 px-3 py-2 rounded-lg text-${color}-700 text-sm`}
  >
    {icon} <span>{text}</span>
  </div>
);

const InfoField = ({ label, value }) => (
  <div className="mt-2">
    <p className="text-sm text-gray-500 mb-1">{label}:</p>
    <p className="text-base font-medium">{value || "-"}</p>
  </div>
);

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">Please Confirm</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

AppointmentDetails.propTypes = {
  appointment: PropTypes.object.isRequired,
  setAppointment: PropTypes.func.isRequired,
};

Pill.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default AppointmentDetails;

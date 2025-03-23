import { useState, useEffect } from "react";

export const useAppointmentDetailActions = (
  appointment,
  setAppointment,
  showNotification,
) => {
  const [restockInputs, setRestockInputs] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(
      appointment.appointment.status === "ACCEPTED" ||
        appointment.appointment.status === "REJECTED",
    );
  }, [appointment.appointment.status]);

  const handleUpdateStatus = async (newStatus) => {
    fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/${appointment.appointment.appointment_id}/${newStatus}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setAppointment({
          ...appointment,
          appointment: {
            ...appointment.appointment,
            status: data.status,
          },
        });
        showNotification(
          data.status === "ACCEPTED"
            ? "✅ Appointment Accepted"
            : "❌ Appointment Declined",
        );
      });
  };

  const handleSaveNotes = async (appointment_id, note) => {
    await fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments/admin/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id,
          admin_note: note,
        }),
      },
    );
    showNotification("Saved Notes!");
  };

  const handleRestock = async (itemId, currentQty, item) => {
    const qty = restockInputs[itemId];
    if (qty && !isNaN(qty) && qty > 0) {
      const newQty = parseInt(qty) + currentQty;
      const updatedAppointment = { ...appointment };

      await fetch(
        `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/items/${itemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_id: itemId,
            item_name: item.item.item_name,
            type: item.item.type,
            unit_price: item.item.unit_price,
            stock_qty: newQty,
          }),
        },
      );

      updatedAppointment.items = updatedAppointment.items.map((i) =>
        i.item.item_id === itemId
          ? {
              ...i,
              item: { ...i.item, stock_qty: newQty },
              outOfStock: false,
            }
          : i,
      );

      setAppointment(updatedAppointment);
      setRestockInputs({ ...restockInputs, [itemId]: "" });
      showNotification("Item restocked!");
    } else {
      showNotification("Please enter a valid number.");
    }
  };

  return {
    handleUpdateStatus,
    handleSaveNotes,
    handleRestock,
    restockInputs,
    setRestockInputs,
    disabled,
  };
};

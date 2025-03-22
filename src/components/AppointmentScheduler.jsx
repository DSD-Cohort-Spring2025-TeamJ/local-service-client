import { useContext } from "react";
import DayCard from "./DayCard";
import { Context } from "../context/Context";
import PropTypes from "prop-types";

function AppointmentScheduler({ selectedSlot, setSelectedSlot }) {
  const { selectedService } = useContext(Context);

  if (!selectedService)
    return (
      <h3 className="text-center text-gray-500 mt-10">
        Loading appointment slots...
      </h3>
    );

  const handleSlotSelection = (date, start, end) => {
    setSelectedSlot({ date, start, end });
  };

  const renderDayCards = () => {
    const firstTechSlots = selectedService.filter((obj) => obj.techId === 1);
    return firstTechSlots.map((obj, i) => (
      <DayCard
        key={i}
        date={obj.date}
        slots={obj.availableWindows}
        buttonFunction={handleSlotSelection}
        selectedSlot={selectedSlot}
      />
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Select an appointment slot
      </h1>
      <div className="flex flex-col gap-6">{renderDayCards()}</div>
    </div>
  );
}

AppointmentScheduler.propTypes = {
  selectedSlot: PropTypes.shape({
    date: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  setSelectedSlot: PropTypes.func.isRequired,
};

export default AppointmentScheduler;

import { format } from "date-fns";
import PropTypes from "prop-types";

const DayCard = ({ date, slots, buttonFunction, selectedSlot }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6 w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
        {format(date.replace(/-/g, "/"), "EEEE, MMMM do")}
      </h2>
      <div className="flex flex-wrap gap-3">
        {slots.map((s, i) => {
          const isSelected =
            selectedSlot.date === date &&
            selectedSlot.start === s.start &&
            selectedSlot.end === s.end;
          return (
            <button
              key={i}
              type="button"
              onClick={() => buttonFunction(date, s.start, s.end)}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2
              ${
                isSelected
                  ? "bg-emerald-600 text-white ring-black scale-105"
                  : "bg-neutral-100 text-gray-800 hover:bg-neutral-200"
              }`}
            >
              {s.start} – {s.end}
            </button>
          );
        })}
      </div>
    </div>
  );
};

DayCard.propTypes = {
  date: PropTypes.string.isRequired,
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    })
  ).isRequired,
  buttonFunction: PropTypes.func.isRequired,
  selectedSlot: PropTypes.shape({
    date: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
};

export default DayCard;

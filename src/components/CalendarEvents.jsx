import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "lucide-react";
import GoogleOAuthSetup from "./Google0AuthSetup";

export default function CalendarEvents() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/calendar/events",
        );
        if (!res.ok) throw new Error("Failed to fetch events.");

        const data = await res.json();

        const mappedEvents = data.map((event) => ({
          title: event.summary,
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date,
          description: event.description,
          location: event.location,
          url: event.htmlLink,
        }));

        setEvents(mappedEvents);
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.message);
        setIsAuthenticated(false);
      }
    };

    fetchEvents();
  }, []);

  if (!isAuthenticated) {
    return <GoogleOAuthSetup />;
  }

  return (
    <div className="p-10 bg-white shadow-xl rounded-3xl max-w-7xl mx-auto mt-12">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 text-gray-800">
        <Calendar className="w-8 h-8 text-green-600" /> Your Google Calendar
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        events={events}
        eventContent={(eventInfo) => (
          <div className="text-xs p-1 overflow-hidden text-ellipsis whitespace-nowrap">
            <strong>{eventInfo.event.title}</strong>
            <div className="truncate">
              {eventInfo.event.extendedProps.description}
            </div>
          </div>
        )}
        eventClick={(info) => {
          window.open(info.event.url, "_blank");
          info.jsEvent.preventDefault();
        }}
        height="auto"
      />
    </div>
  );
}

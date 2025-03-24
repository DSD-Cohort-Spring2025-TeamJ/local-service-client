import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "lucide-react";
import GoogleOAuthSetup from "./Google0AuthSetup";
import { useAuth } from "../context/AuthContext";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";

export default function CalendarEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetchWithAuth(
          "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/calendar/events"
        );
        if (!res.ok) throw new Error("Failed to fetch events.");

        const data = await res.json();

        const mappedEvents = data.map((event) => ({
          title: event.summary,
          start: event.start?.dateTime
            ? new Date(event.start.dateTime.value).toISOString()
            : event.start?.date,
          end: event.end?.dateTime
            ? new Date(event.end.dateTime.value).toISOString()
            : event.end?.date,
          description: event.description,
          location: event.location,
          url: event.htmlLink,
          allDay: !!event.start?.date,
        }));

        setEvents(mappedEvents);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [token, fetchWithAuth]);

  if (!token) {
    return <GoogleOAuthSetup />;
  }

  return (
    <div className="p-10 bg-white shadow-xl rounded-3xl max-w-7xl mx-auto mt-12 text-black">
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

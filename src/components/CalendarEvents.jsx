import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import GoogleOAuthSetup from "./Google0AuthSetup";

export default function CalendarEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/calendar/events"
        );

        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch events.");

        const data = await response.json();
        setEvents(data);
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  if (!isAuthenticated) {
    return <GoogleOAuthSetup />;
  }

  return (
    <div className="p-8 bg-white shadow rounded-xl max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Calendar className="w-7 h-7" /> Google Calendar Events
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event, idx) => (
            <li
              key={idx}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-1">{event.summary}</h2>
              <p className="text-gray-500 mb-1">Start: {event.start}</p>
              <p className="text-gray-500">End: {event.end}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

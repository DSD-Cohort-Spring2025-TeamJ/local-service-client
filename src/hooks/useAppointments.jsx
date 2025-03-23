import { useState, useEffect } from "react";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, loading, error };
};

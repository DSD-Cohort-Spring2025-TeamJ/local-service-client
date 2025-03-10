import React, { useState, useEffect } from 'react';

function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify(appointments)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAppointments(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []); //Empty array to run only once

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Appointments</h1>
            <table className="min-w-full table-auto border-collapse text-zinc-300">
                <thead>
                    <tr className="text-center text-sm">
                        <th className="px-2 py-2">Appointment ID</th>
                        <th className="px-2 py-2">Service ID</th>
                        <th className="px-2 py-2">Client Note</th>
                        <th className="px-2 py-2">Description</th>
                        <th className="px-2 py-2">Location</th>
                        <th className="px-2 py-2">Admin Note</th>
                        <th className="px-2 py-2">Created At</th>
                        <th className="px-2 py-2">Updated At</th>
                        <th className="px-2 py-2">Estimated Time</th>
                        <th className="px-2 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.appointment_id} className="text-center text-sm">
                            <td className="px-2 py-2">{appointment.appointment_id}</td>
                            <td className="px-2 py-2">{appointment.service_id}</td>
                            <td className="px-2 py-2">{appointment.client_note}</td>
                            <td className="px-2 py-2">{appointment.description}</td>
                            <td className="px-2 py-2">{appointment.location}</td>
                            <td className="px-2 py-2">{appointment.admin_note}</td>
                            <td className="px-2 py-2">{appointment.created_at}</td>
                            <td className="px-2 py-2">{appointment.updated_at}</td>
                            <td className="px-2 py-2">{appointment.estimated_time}</td>
                            <td className="px-2 py-2">{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    }

export default AppointmentsList;

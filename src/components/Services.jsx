import { useEffect, useContext } from "react";
import { Context } from "../context/Context";

export default function Services() {
  const {
    services,
    setServices,
    setSelectedService,
    appointment,
    setAppointment,
  } = useContext(Context);

  useEffect(() => {
    fetch(
      "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/services",
    )
      .then((r) => r.json())
      .then((data) => setServices(data));
  }, []);

  const handleSelectService = async (e) => {
    fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/services/${e.target.id}/timeSlots`,
    )
      .then((r) => r.json())
      .then((data) => {
        setSelectedService(data);
        setAppointment({
          ...appointment,
          service_id: data.service_id,
          estimated_time: data.estimated_time,
        });
      });
  };

  const renderServiceButtons = services.map((s) => (
    <button
      type="button"
      key={s.service_id}
      onClick={handleSelectService}
      className="services"
      id={s.service_id}
    >
      {s.service_name}
    </button>
  ));

  return (
    <>
      <h1>Select a Service</h1>
      <div className="services-nav">{renderServiceButtons}</div>
    </>
  );
}

import { useEffect, useContext } from "react"
import { Context } from "../context/Context"
import Pipe from '/src/components/pipe.jsx'

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
      className="services main-button bg-[#4BCE4B] px-[5px] py-[5px] w-[100px] 
      text-[#4B4B4B] font-sans text-lg"

        // services bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
        // shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
        // text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
        // hover:bg-green-700 hover:text-white
        // active:scale-90
      type="button"
      key={s.service_id}
      onClick={handleSelectService}
      id={s.service_id}
    >
      {s.service_name}
    </button>
  ));

  return (
    <>
      <h1 className="-mt-2 mb-2 font-mono font-semibold text-[#4B4B4B]">Select a Service</h1>
      <Pipe />
      <div className="services-nav">
        {renderServiceButtons}
      </div>
    </>
  );
}
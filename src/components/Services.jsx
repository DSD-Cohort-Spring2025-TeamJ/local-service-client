import { useEffect, useContext } from "react"
import { Context } from "../context/Context"
import Pipe from '/src/components/pipe.jsx'
import Button from '/src/components/Button.jsx'

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
    <Button className="services main-button bg-[#4BCE4B] w-[150px] h-[40px]
      text-black font-sans text-lg flex justify-center align-center leading-none p-5 rounded-lg"
      type="button"
      key={s.service_id}
      onClick={handleSelectService}
      id={s.service_id}
      text={s.service_name}
    />
  ));

  return (
    <>
      <h1 className="-mt-2 mb-2 font-mono font-semibold text-[#4B4B4B]">Select a Service</h1>
      <Pipe className="pipe h-[20px] mt-0" />
      <div className="services-nav rounded-lg bg-[#005701] flex flex-wrap justify-around align-center m-6 p-3 ">
        {renderServiceButtons}
      </div>
    </>
  );
}
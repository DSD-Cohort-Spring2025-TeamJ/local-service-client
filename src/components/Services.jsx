import { useEffect, useContext, useState } from "react";
import { Context } from "../context/Context";
import Pipe from "./Pipe";
import Button from "./Button";
import IssueDescriptionForm from "./IssueDescriptionForm";

export default function Services() {
  const {
    services,
    setServices,
    setSelectedService,
    appointment,
    setAppointment,
  } = useContext(Context);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [aiRecommendedServiceId, setAiRecommendedServiceId] = useState(null);

  useEffect(() => {
    fetch(
      "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/services"
    )
      .then((r) => r.json())
      .then((data) => setServices(data));
  }, []);

  const handleSelectService = async (id, time) => {
    setAppointment({
      ...appointment,
      service_id: id,
      estimated_time: time,
    });
    fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/services/${id}/timeSlots`
    )
      .then((r) => r.json())
      .then((data) => {
        setSelectedService(data);
      });
    setSelectedServiceId(id);
  };

  const handleClassifyAndSelect = (data) => {
    setAppointment((prev) => ({
      ...prev,
      issue_description: data.category,
      estimated_time: data.estimatedTime,
    }));
    const matchedService = services.find((service) => {
      const serviceTokens = service.service_name.toLowerCase().split(" ");
      const aiTokens = data.category.toLowerCase().split(" ");
      return aiTokens.some((token) => serviceTokens.includes(token));
    });

    if (matchedService) {
      handleSelectService(
        matchedService.service_id,
        matchedService.estimated_time
      );
      setAiRecommendedServiceId(matchedService.service_id);
    }
  };

  const renderServiceButtons = services.map((s) => (
    <Button
      className={`services main-button bg-[#4BCE4B] w-[150px] h-[40px] text-black font-sans text-lg flex justify-center align-center leading-none rounded-lg ${
        s.service_id === selectedServiceId
          ? "ring-4 ring-green-500 scale-105"
          : ""
      }`}
      type="button"
      key={s.service_id}
      onClick={() => handleSelectService(s.service_id, s.estimated_time)}
      id={s.service_id}
      text={s.service_name}
    />
  ));

  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center">
        Let AI help or choose manually:
      </h1>
      <IssueDescriptionForm onClassify={handleClassifyAndSelect} />

      <h1 className="mt-8 mb-2 font-mono font-semibold text-[#4B4B4B]">
        Or select a service manually:
      </h1>
      <Pipe className="pipe h-[20px] mt-0" />
      {aiRecommendedServiceId && (
        <div className="bg-green-100 border border-green-400 text-green-800 rounded-lg px-4 py-2 my-4 text-center">
          ✅ Recommended service auto-selected:{" "}
          <strong>
            {
              services.find((s) => s.service_id === aiRecommendedServiceId)
                ?.service_name
            }
          </strong>
        </div>
      )}

      <div className="services-nav rounded-lg bg-gray-200 flex flex-wrap justify-around align-center m-6 p-3 ">
        {renderServiceButtons}
      </div>
    </>
  );
}

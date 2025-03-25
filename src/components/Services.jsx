import { useEffect, useContext, useState } from "react";
import { Context } from "../context/Context";
import Button from "./Button";
import IssueDescriptionForm from "./IssueDescriptionForm";

export default function Services() {
  const { services, setServices, setSelectedService, setAppointment } =
    useContext(Context);
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
    setAppointment((prev) => ({
      ...prev,
      service_id: id,
      estimated_time: time,
    }));

    fetch(
      `https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/services/${id}/timeSlots`
    )
      .then((r) => r.json())
      .then((data) => {
        setSelectedService(data);
      });
    setSelectedServiceId(id);
  };

  const serviceKeywords = {
    "Toilet Install": ["toilet", "commode"],
    "Shower Install": [
      "shower",
      "shower leak",
      "shower repair",
      "bath leak",
      "shower head",
    ],
    "Water Pressure": ["water pressure", "low pressure", "pressure issues"],
    "Sump Pump": ["sump pump", "basement water"],
    Leaks: ["leak", "pipe burst", "water drip", "general leak"],
    "Faucet Install": ["faucet", "tap", "kitchen sink"],
    Clogs: ["clog", "slow drain", "backup"],
    "Water Heater": ["water heater", "hot water issue", "no hot water"],
    "Bathroom Plumbing": ["bathroom plumbing", "sink", "bathroom issues"],
  };

  const handleClassifyAndSelect = (data) => {
    setAppointment((prev) => ({
      ...prev,
      issue_description: data.category,
      comment: data.userPrompt || data.category,
      estimated_time: data.estimatedTime,
    }));

    const aiDescription = data.category.toLowerCase();

    const matchedService = services.find((service) => {
      const keywords = serviceKeywords[service.service_name] || [];
      return keywords.some((keyword) => aiDescription.includes(keyword));
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
          ? "ring-4 ring-green-300 scale-105"
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

      <h1 className="mt-4 mb-2 font-semibold text-xl">
        Or select a service manually:
      </h1>
      {aiRecommendedServiceId && (
        <div className="bg-green-100 border border-green-400 text-green-600 rounded-lg px-4 py-2 my-4 text-center">
          ✅ Recommended service auto-selected:{" "}
          <strong>
            {
              services.find((s) => s.service_id === aiRecommendedServiceId)
                ?.service_name
            }
          </strong>
        </div>
      )}

      <div className="services-nav rounded-lg bg-green-50 ring-1 ring-green-100 flex flex-wrap justify-around items-center p-4 ">
        {renderServiceButtons}
      </div>
    </>
  );
}

import { useContext, useState } from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";
import Services from "../components/Services";
import AppointmentScheduler from "../components/AppointmentScheduler";
import ClientInfoForm from "../components/ClientInfoForm";
import Message from "../components/Message";
import { Context } from "../context/Context";
import Button from "/src/components/Button.jsx";

const ServiceRequest = () => {
  const { selectedService, appointment, setAppointment } = useContext(Context);
  const [message, setMessage] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState({
    date: "",
    start: "",
    end: "",
  });
  const [slotError, setSlotError] = useState(false);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <Services />,
      <AppointmentScheduler
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />,
      <ClientInfoForm />,
    ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSlotError(false);

    if (!selectedService) {
      setMessage({
        style: "failure",
        text: "Please select a service before continuing.",
      });
      return;
    }

    if (currentStepIndex === 1 && !selectedSlot.date) {
      setSlotError(true);
      return;
    }

    if (currentStepIndex === 1) {
      setAppointment({
        ...appointment,
        date: selectedSlot.date,
        start_time: selectedSlot.start,
        end_time: selectedSlot.end,
        tech_id: 1,
      });
    }

    if (!isLastStep) return next();

    try {
      const response = await fetch(
        "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointment),
        },
      );

      const result = await response.json();
      setMessage({
        style: "success",
        text: "You have successfully booked your appointment! You will receive a confirmation email shortly.",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        style: "failure",
        text: "We were unable to submit your appointment request. Please try again.",
      });
    }
  };

  if (message) return <Message style={message.style} text={message.text} />;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ position: "absolute", bottom: ".25rem", left: ".5rem" }}>
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
      {slotError && (
        <p className="text-center text-red-500 mt-3">
          Please select a date and time before continuing.
        </p>
      )}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: ".5rem",
          justifyContent: "flex-end",
        }}
      >
        {!isFirstStep && (
          <Button
            className="main-button bg-[#4BCE4B] w-[80px] h-[25px] text-[#4B4B4B] font-sans border-[1px] flex justify-center"
            type="button"
            onClick={back}
            text="Back"
          />
        )}
        <Button
          className="main-button bg-[#4BCE4B] w-[80px] h-[25px] text-[#4B4B4B] font-sans border-[1px] flex justify-center"
          type="submit"
          text={isLastStep ? "Finish" : "Next"}
        />
      </div>
    </form>
  );
};

export default ServiceRequest;

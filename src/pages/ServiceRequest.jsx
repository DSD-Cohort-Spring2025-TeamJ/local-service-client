import React, { useContext, useState } from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";
import Services from "../components/Services";
import AppointmentScheduler from "../components/AppointmentScheduler";
import ClientInfoForm from "../components/ClientInfoForm";
import Message from "../components/Message";
import { Context } from "../context/Context";
import Button from "/src/components/Button.jsx"

const ServiceRequest = () => {
  const { selectedService, appointment } = useContext(Context);
  const { date, time_slot } = appointment;
  const [message, setMessage] = useState(null)
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <Services />,
    <AppointmentScheduler />,
    <ClientInfoForm />
  ])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) return alert("Please select a service")
    if (currentStepIndex === 1 && (!date || !time_slot)) return alert("Please select a date and time for your appointment")
    if (!isLastStep) return next()

    console.log("Form Data Submitted:", appointment);
    try {
      const response = await fetch(
        "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        },
      );

      const result = await response.json(); // response could be used to interpolate the date and time info into the success message
      setMessage({
        style: "success",
        text: "You have successfully booked your appointment! You will receive a confirmation email shortly."
      })
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        style: "failure",
        text: "We were unable to submit your appointment request. Please try again."
      })
    }
  };

  if (message) return <Message style={message.style} text={message.text} />

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ position: "absolute", bottom: ".25rem", left: ".5rem" }}>
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
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
            className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px] h-[25px]
          shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
          text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
          active:scale-90"
            type="button"
            onClick={back}
            text="Back" />
        )}
        <Button className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px] h-[25px] mb-2 mr-2
        shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
        text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
        active:scale-90"
          type="submit"
          text={isLastStep ? "Finish" : "Next"} />
      </div>
    </form>

  );
};

export default ServiceRequest;

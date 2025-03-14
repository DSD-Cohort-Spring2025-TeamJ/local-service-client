import React, { useContext, useState } from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";
import Services from "../components/Services";
import AppointmentScheduler from "../components/AppointmentScheduler";
import ClientInfoForm from "../components/ClientInfoForm";
import Message from "../components/Message";
import { Context } from "../context/Context";

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
      <div style={{ position: "absolute", bottom: ".5rem", right: ".5rem" }}>
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
          <button type="button" onClick={back}>
            Back
          </button>
        )}
        <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
      </div>
    </form>

  );
};

export default ServiceRequest;

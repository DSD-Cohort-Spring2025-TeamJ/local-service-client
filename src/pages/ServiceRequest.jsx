import React, { useContext } from 'react'
import Services from '../components/Services'
import AppointmentScheduler from '../components/AppointmentScheduler'
import ClientInfoForm from '../components/ClientInfoForm'
import { Context } from '../context/Context'

const ServiceRequest = () => {

  const { selectedService, appointment } = useContext(Context)
  const { service_id, date, time_slot } = appointment
  //TODO: cleaner conditional rendering

  return (
    <>
      {!service_id && <Services />}
      {selectedService && (!date || !time_slot) && <AppointmentScheduler />}
      {(time_slot && date) && <ClientInfoForm />}
    </>
  )
}

export default ServiceRequest
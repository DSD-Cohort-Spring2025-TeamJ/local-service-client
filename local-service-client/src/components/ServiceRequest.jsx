import React from 'react'
import Services from './Services'
import AppointmentScheduler from './AppointmentScheduler/AppointmentScheduler'
import ClientInfoForm from './ClientInfoForm'

const ServiceRequest = () => {
  return (
    <>
      <Services />
      <AppointmentScheduler />
      <ClientInfoForm />
    </>
  )
}

export default ServiceRequest
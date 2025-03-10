import React from 'react'
import Services from '../components/Services'
import AppointmentScheduler from '../components/AppointmentScheduler/AppointmentScheduler'
import ClientInfoForm from '../components/ClientInfoForm'

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
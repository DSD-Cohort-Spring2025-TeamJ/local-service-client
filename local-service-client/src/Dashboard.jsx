import React from 'react'
import ClientInfoForm from './components/ClientInfoForm'
import AppointmentsList from './components/AppointmentsList'

const Dashboard = () => {
  return (
    <div>Dashboard
    <div><ClientInfoForm /></div>
    <div><AppointmentsList /></div>
    </div>
  )
}

export default Dashboard

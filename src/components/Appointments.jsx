import React, { useState, useEffect } from 'react';
import { getAllAppointments, addAppointment } from '../api/appointmentApi';
import AppBarComponent from './AppBarComponent';
import FooterComponent from './FooterComponent';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    id: '',
    doctor_name: '',
    nurse_name: '',
    appointment_reason: '',
    date: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const data = await getAllAppointments();
    setAppointments(data);
  };

  const handleInputChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Assign a unique ID to the new appointment
    const appointmentWithId = {
      ...newAppointment,
      id: Date.now() // Generate a unique ID using current timestamp
    };

    await addAppointment(appointmentWithId);
    fetchAppointments();
    setNewAppointment({
      id: '',
      doctor_name: '',
      nurse_name: '',
      appointment_reason: '',
      date: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col mx-0">
      <AppBarComponent titleName="Appointments" /> 
      <div className='flex-grow flex flex-col mr-4 ml-4'>
        <div className='h-3'></div>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            name="doctor_name"
            value={newAppointment.doctor_name}
            onChange={handleInputChange}
            placeholder="Doctor Name"
            className="border p-2 mr-2"
          />
          <input
            type="text"
            name="nurse_name"
            value={newAppointment.nurse_name}
            onChange={handleInputChange}
            placeholder="Nurse Name"
            className="border p-2 mr-2"
          />
          <input
            type="text"
            name="appointment_reason"
            value={newAppointment.appointment_reason}
            onChange={handleInputChange}
            placeholder="Appointment Reason"
            className="border p-2 mr-2"
          />
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Appointment
          </button>
        </form>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              {appointment.doctor_name} - {appointment.nurse_name} - {appointment.appointment_reason} - {appointment.date}
            </li>
          ))}
        </ul>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Appointments;

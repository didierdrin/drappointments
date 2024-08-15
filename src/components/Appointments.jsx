import React, { useState, useEffect } from 'react';
import { getAllAppointments, addAppointment } from '../api/appointmentApi';
import AppBarComponent from './AppBarComponent';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
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
    await addAppointment(newAppointment);
    fetchAppointments();
    setNewAppointment({
      doctor_name: '',
      nurse_name: '',
      appointment_reason: '',
      date: ''
    });
  };

  return (
    <div className="container mx-auto">
      <AppBarComponent titleName="Appointments" /> 
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
          <li key={appointment.id} className="mb-2">
            {appointment.doctor_name} - {appointment.nurse_name} - {appointment.appointment_reason} - {appointment.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;

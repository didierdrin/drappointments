import axios from 'axios';

const API_BASE_URL = 'https://drappointments.onrender.com/api/appointments';

export const getAllAppointments = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addAppointment = async (appointment: any) => {
  const response = await axios.post(API_BASE_URL, appointment);
  return response.data;
};
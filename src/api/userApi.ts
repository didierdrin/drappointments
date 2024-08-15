import axios from 'axios';

const API_BASE_URL = 'https://drappointments.onrender.com/api/users';

export const getAllUsers = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addUser = async (user: any) => {
  const response = await axios.post(API_BASE_URL, user);
  return response.data;
};
import React, { useState, useEffect } from 'react';
import { getAllUsers, addUser } from '../api/userApi';
import AppBarComponent from './AppBarComponent';
import FooterComponent from './FooterComponent';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    username: '',
    email: '',
    reg_number: '',
    first_name: '',
    last_name: '',
    gender: '',
    qualification: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getAllUsers();
    setPatients(data);
  };

  const handleInputChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(newPatient);
    fetchPatients();
    setNewPatient({
      username: '',
      email: '',
      reg_number: '',
      first_name: '',
      last_name: '',
      gender: '',
      qualification: ''
    });
  };

  return (
    <div className="container mx-0">
      <AppBarComponent titleName="Patients" />
      <div className='h-3'></div>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="username"
          value={newPatient.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="border p-2 mr-2"
        />
        <input
          type="email"
          name="email"
          value={newPatient.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="reg_number"
          value={newPatient.reg_number}
          onChange={handleInputChange}
          placeholder="Registration Number"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="first_name"
          value={newPatient.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="last_name"
          value={newPatient.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="border p-2 mr-2"
        />
        <select
          name="gender"
          value={newPatient.gender}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="qualification"
          value={newPatient.qualification}
          onChange={handleInputChange}
          placeholder="Qualification"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Patient
        </button>
      </form>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id} className="mb-2">
            {patient.first_name} {patient.last_name} - {patient.email} - {patient.qualification}
          </li>
        ))}
      </ul> 
      <FooterComponent />
    </div>
  );
};

export default Patients;
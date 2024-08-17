import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '../api/appointmentApi';
import { getAllUsers } from '../api/userApi';
import { PDFDocument, rgb } from 'pdf-lib';
import AppBarComponent from './AppBarComponent';
import FooterComponent from './FooterComponent';

const Reports = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportType, setReportType] = useState('appointments');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const appointmentsData = await getAllAppointments();
    const usersData = await getAllUsers();
    setAppointments(appointmentsData);
    setUsers(usersData);
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize * 2,
      color: rgb(0, 0, 0),
    });

    let yOffset = height - 8 * fontSize;
    const data = reportType === 'appointments' ? appointments : users;

    data.forEach((item, index) => {
      const text = reportType === 'appointments'
        ? `${index + 1}. ${item.doctor_name} - ${item.appointment_reason} - ${item.date}`
        : `${index + 1}. ${item.first_name} ${item.last_name} - ${item.email}`;

      page.drawText(text, {
        x: 50,
        y: yOffset,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      yOffset -= fontSize * 1.5;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${reportType}_report.pdf`;
    link.click();
  };

  return (
    <div className="container mx-0">
      <AppBarComponent titleName="Reports" /> 
      <div className="h-3"></div>
      <div className="mb-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="appointments">Appointments</option>
          <option value="users">Users</option>
        </select>
        <button onClick={generatePDF} className="bg-blue-500 text-white p-2 rounded">
          Generate PDF
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">
          {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Data
        </h2>
        <ul>
          {reportType === 'appointments'
            ? appointments.map((appointment) => (
                <li key={appointment.id} className="mb-2">
                  {appointment.doctor_name} - {appointment.appointment_reason} - {appointment.date}
                </li>
              ))
            : users.map((user) => (
                <li key={user.id} className="mb-2">
                  {user.first_name} {user.last_name} - {user.email}
                </li>
              ))}
        </ul>
      </div> 
      <FooterComponent />
    </div>
  );
};

export default Reports;
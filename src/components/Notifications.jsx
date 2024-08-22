import React from 'react';
import AppBarComponent from './AppBarComponent';
import FooterComponent from './FooterComponent';

const mockNotifications = [
  { id: 1, message: 'New appointment scheduled', time: '2 hours ago' },
  { id: 2, message: 'Patient report ready', time: '1 day ago' },
  { id: 3, message: 'Reminder: Staff meeting tomorrow', time: '3 days ago' },
];

const Notifications = () => {
  return (
    <div className="min-h-screen flex flex-col mx-0">
      <AppBarComponent titleName="Notifications" />
      <div className='flex-grow flex flex-col mr-4 ml-4'>
      <div className='h-3'></div>
      <ul>
        {mockNotifications.map((notification) => (
          <li key={notification.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p className="font-semibold">{notification.message}</p>
            <p className="text-sm text-gray-500">{notification.time}</p>
          </li>
        ))}
      </ul>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Notifications;
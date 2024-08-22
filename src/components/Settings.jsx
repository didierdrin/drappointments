import React, { useState } from 'react';
import AppBarComponent from './AppBarComponent';
import FooterComponent from './FooterComponent';

const Settings = () => {
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    darkMode: false,
    language: 'en',
    timeZone: 'UTC',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the settings to a backend or local storage
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col mx-0">
      <AppBarComponent titleName="Settings" /> 
      <div className='flex-grow flex flex-col mr-4 ml-4'> 
      <div className="h-3"></div>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleChange}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              className="mr-2"
            />
            Dark Mode
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Time Zone</label>
          <select
            name="timeZone"
            value={settings.timeZone}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="UTC">UTC</option>
            <option value="EST">EST</option>
            <option value="PST">PST</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Settings
        </button>
      </form> 
      </div>
      <FooterComponent />
    </div>
  );
};

export default Settings;
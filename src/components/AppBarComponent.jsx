import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './authprovider'; // Assuming useAuth provides the user email
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from './authprovider';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip, // Import Tooltip from MUI
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Event as AppointmentsIcon,
    People as PatientsIcon,
    Notifications as NotificationsIcon,
    Assessment as ReportsIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
} from '@mui/icons-material';

const AppBarComponent = ({ titleName }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { logout, currentUser } = useAuth(); // Assuming currentUser contains user details like email
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerItems = [
        { text: 'Dashboard', icon: <DashboardIcon /> },
        { text: 'Appointments', icon: <AppointmentsIcon /> },
        { text: 'Patients', icon: <PatientsIcon /> },
        { text: 'Notifications', icon: <NotificationsIcon /> },
        { text: 'Reports', icon: <ReportsIcon /> },
        { text: 'Settings', icon: <SettingsIcon /> },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/auth'); // Redirect to the auth page after logout
        setDrawerOpen(false); // Close the drawer
    };

    const logoutItem = { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout };

    return (
        <div>
            <AppBar position="static" className=" bg-gradient-to-b from-violet-400 to-violet-200">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <div className='w-4'></div>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {titleName}
                    </Typography>

                    <IconButton href='/notifications' color="inherit" className="mr-5">
                        <NotificationsIcon />
                    </IconButton>
                    <div className='w-4'></div>

                    {/* Tooltip showing the user's email on hover */}
                    <Tooltip title={`Logged in as ${currentUser?.email || 'User'}`} arrow>
                        <IconButton color="inherit">
                            <PersonIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List className='min-h-screen flex flex-col'>
                    <div className='flex-grow flex flex-col mt-4'>
                        {drawerItems.map((item) => (
                            <ListItem button key={item.text} component={Link} to={`/${item.text.toLowerCase()}`}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </div>
                    <ListItem onClick={logoutItem.onClick} className='hover:bg-slate-100 cursor-pointer mb-5'>
                        <ListItemIcon>{logoutItem.icon}</ListItemIcon>
                        <ListItemText primary={logoutItem.text} />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default AppBarComponent;

import { useState } from 'react';
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
  Card, 
  CardContent, 
  Grid, 
  Select, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard as DashboardIcon, 
  Event as AppointmentsIcon, 
  People as PatientsIcon, 
  Message as MessagesIcon, 
  Assessment as ReportsIcon, 
  Settings as SettingsIcon, 
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('daily');

  // Dummy data - replace with actual data from your backend
  const totalAppointments = 150;
  const patientOverview = {
    labels: ['Children', 'Adults', 'Teens', 'Older Patients'],
    datasets: [{
      data: [30, 50, 20, 40],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  const patients = [
    { no: 1, name: 'John Doe', age: 35, registrationDate: '2023-01-15', appointedFor: 'Check-up', report: 'Healthy' },
    { no: 2, name: 'Jane Smith', age: 28, registrationDate: '2023-02-20', appointedFor: 'Flu', report: 'Recovering' },
    // Add more patients...
  ];

  const appointments = [
    { date: '2023-06-01', time: '09:00', patient: 'John Doe' },
    { date: '2023-06-01', time: '10:30', patient: 'Jane Smith' },
    // Add more appointments...
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const drawerItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Appointments', icon: <AppointmentsIcon /> },
    { text: 'Patients', icon: <PatientsIcon /> },
    { text: 'Messages', icon: <MessagesIcon /> },
    { text: 'Reports', icon: <ReportsIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    
  ];

  const logoutItem = { text: 'Logout', icon: <LogoutIcon className='' /> };


  return (
    <div className="container mx-auto">
      <AppBar position="static" className="bg-gradient-to-b from-blue-500 to-blue-200">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Select value={timeFilter} onChange={handleTimeFilterChange}>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className='flex flex-col'>
          {drawerItems.map((item) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem> 
          ))}
          <ListItem className='hover:bg-slate-100 cursor-pointer mt-[90px]'>
            <ListItemIcon>{logoutItem.icon}</ListItemIcon>
            <ListItemText primary={logoutItem.text} />
          </ListItem>
        </List>
      </Drawer>

      <Grid container spacing={3} className='pt-3'>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent className="flex justify-around">
              <div className='mb-2 float-left'>
              <Typography variant="h5" className='pr-[95px] pb-2'>Overview</Typography>
              
              <Typography>Total Appointments: {totalAppointments}</Typography>
              </div>
              <div style={{ height: 300 }}>
                <Pie data={patientOverview} />
              </div>
            </CardContent>
          </Card>

          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <Typography variant="h5">My Patients</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Date of Registration</TableCell>
                      <TableCell>Appointed For</TableCell>
                      <TableCell>Report</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.no} className='hover:bg-slate-100'>
                        <TableCell>{patient.no}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.registrationDate}</TableCell>
                        <TableCell>{patient.appointedFor}</TableCell>
                        <TableCell>{patient.report}</TableCell>
                        <TableCell>
                          <IconButton size='small'><ShareIcon fontSize='small' /></IconButton>
                          <IconButton size="small"><DownloadIcon fontSize='small' /></IconButton>
                          <IconButton size="small"><PrintIcon fontSize='small' /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Appointments</Typography>
              <Select fullWidth value={timeFilter} onChange={handleTimeFilterChange}>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
              <List>
                {appointments.map((appointment, index) => (
                  <ListItem key={index} className='hover:bg-slate-100'>
                    <ListItemText 
                      primary={appointment.patient} 
                      secondary={`${appointment.date} ${appointment.time}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
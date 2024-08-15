import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../api/userApi';
import { getAllAppointments } from '../api/appointmentApi';
import AppBarComponent from './AppBarComponent';


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
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);

  const [patientOverview, setPatientOverview] = useState({
    labels: ['Children', 'Adults', 'Teens', 'Older Patients'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setPatients(usersData);

        const appointmentsData = await getAllAppointments();
        setAppointments(appointmentsData);
        setTotalAppointments(appointmentsData.length);

        // Update patient overview data based on field of consultancy
        const dental = appointmentsData.filter(appointment => appointment.appointment_reason.toLowerCase().includes('dental')).length;
        const psychiatry = appointmentsData.filter(appointment => appointment.appointment_reason.toLowerCase().includes('psychiatry')).length;
        const general = appointmentsData.filter(appointment => appointment.appointment_reason.toLowerCase().includes('general')).length;
        const other = appointmentsData.length - dental - psychiatry - general;

        setPatientOverview(prevState => ({
          labels: ['Dental', 'Psychiatry', 'General', 'Other'],
          datasets: [{
            ...prevState.datasets[0],
            data: [dental, psychiatry, general, other]
          }]
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);





  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };




  return (
    <div className="container mx-auto">
      <AppBarComponent titleName="Dashboard" />


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
                    {patients.map((patient, index) => (
                      <TableRow key={patient.id} className='hover:bg-slate-100'>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{`${patient.first_name} ${patient.last_name}`}</TableCell>
                        <TableCell>{patient.reg_number}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.qualification}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
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
                      primary={`${appointment.doctor_name} - ${appointment.nurse_name}`}
                      secondary={`${appointment.date} - ${appointment.appointment_reason}`}
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
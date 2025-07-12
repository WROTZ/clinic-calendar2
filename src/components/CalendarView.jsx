import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Container, Dialog, DialogTitle,
  DialogContent, TextField, MenuItem, DialogActions, Select, InputLabel, FormControl
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const defaultDoctors = ['Dr. A', 'Dr. B', 'Dr. C'];
const defaultPatients = ['John Doe', 'Jane Smith', 'Alice'];

const CalendarView = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ patient: '', doctor: '', time: '' });
  const [filter, setFilter] = useState({ doctor: '', patient: '' });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(events));
  }, [events]);

  const logout = () => {
    localStorage.removeItem('authenticated');
    navigate('/');
  };

  const handleSlotSelect = (slotInfo) => {
    setSelectedSlot(slotInfo.start);
    setFormData({ patient: '', doctor: '', time: '' });
  };

  const handleAddAppointment = () => {
    const newEvent = {
      title: `${formData.patient} (${formData.doctor} @ ${formData.time})`,
      start: moment(selectedSlot).toDate(),
      end: moment(selectedSlot).add(1, 'hours').toDate(),
      doctor: formData.doctor,
      patient: formData.patient,
    };
    setEvents([...events, newEvent]);
    setSelectedSlot(null);
  };

  const handleDelete = (event) => {
    const confirmed = window.confirm(`Delete appointment for ${event.title}?`);
    if (confirmed) {
      setEvents(events.filter((e) => e !== event));
    }
  };

  const filteredEvents = events.filter((e) =>
    (!filter.doctor || e.doctor === filter.doctor) &&
    (!filter.patient || e.patient === filter.patient)
  );

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <Typography variant="h6">Appointment Calendar</Typography>
        <Button variant="contained" color="error" onClick={logout}>Logout</Button>
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <FormControl fullWidth>
          <InputLabel>Doctor</InputLabel>
          <Select
            value={filter.doctor}
            onChange={(e) => setFilter((f) => ({ ...f, doctor: e.target.value }))}
            label="Doctor"
          >
            <MenuItem value="">All</MenuItem>
            {defaultDoctors.map((doc) => (
              <MenuItem key={doc} value={doc}>{doc}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Patient</InputLabel>
          <Select
            value={filter.patient}
            onChange={(e) => setFilter((f) => ({ ...f, patient: e.target.value }))}
            label="Patient"
          >
            <MenuItem value="">All</MenuItem>
            {defaultPatients.map((pat) => (
              <MenuItem key={pat} value={pat}>{pat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleDelete}
      />

      <Dialog open={!!selectedSlot} onClose={() => setSelectedSlot(null)}>
        <DialogTitle>Add Appointment</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Patient</InputLabel>
            <Select
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              label="Patient"
            >
              {defaultPatients.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Doctor</InputLabel>
            <Select
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              label="Doctor"
            >
              {defaultDoctors.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="time"
            label="Time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedSlot(null)}>Cancel</Button>
          <Button onClick={handleAddAppointment} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CalendarView;

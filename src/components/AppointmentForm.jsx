import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { doctors, patients } from '../data';

const AppointmentForm = ({ open, onClose, date, onSave, current }) => {
    const [patient, setPatient] = useState(current?.patient || '');
    const [doctor, setDoctor] = useState(current?.doctor || '');
    const [time, setTime] = useState(current?.time || '');

    const handleSubmit = () => {
        if (!patient || !doctor || !time) return alert("Fill all fields");
        onSave({ patient, doctor, time });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', mx: 'auto', my: '20%', width: 300 }}>
            <h3>{date} - Appointment</h3>
            <TextField select fullWidth label="Patient" value={patient} onChange={(e) => setPatient(e.target.value)} margin="normal">
            {patients.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
            <TextField select fullWidth label="Doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} margin="normal">
            {doctors.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
            <TextField fullWidth label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} margin="normal" />
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>Save</Button>
        </Box>
        </Modal>
    );
};

export default AppointmentForm;

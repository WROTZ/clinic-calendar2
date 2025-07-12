import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const DarkModeToggle = ({ mode, setMode }) => {
    return (
        <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
    );
};

export default DarkModeToggle;

import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Typography,
    Menu,
    Box,
    Slider,
    Button,
} from '@mui/material';

const OdometerRangeSelect = ({ filters, setFilters }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOdometerRangeChange = (event, newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            odometerRange: newValue,
        }));
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <TextField
                label="Odometer Range (km)"
                value={
                    filters.odometerRange[0] != null && filters.odometerRange[1] != null
                        ? `${filters.odometerRange[0]} - ${filters.odometerRange[1]}`
                        : '' // If the value is empty or null, display the placeholder
                }
                placeholder="e.g., 0 - 300000"
                onClick={handleMenuOpen}
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                sx={{
                    borderRadius: 8,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 15,
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiInputBase-input': {
                        textAlign: 'left',
                    },
                }}
            />


            {/* Popup menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <Box sx={{ p: 2, width: 300 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Adjust Odometer Range (km)
                    </Typography>
                    <Slider
                        value={filters.odometerRange}
                        onChange={handleOdometerRangeChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={300000}
                        step={1000}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleMenuClose}>
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Menu>
        </Grid>
    );
};

export default OdometerRangeSelect;

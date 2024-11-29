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

const YearRangeSelect = ({ filters, setFilters, currentYear }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleYearRangeChange = (event, newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            yearRange: newValue,
        }));
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            {/*<Typography variant="subtitle1" gutterBottom>*/}
            {/*    Year Range*/}
            {/*</Typography>*/}

            <TextField
                label="Car Year Range"
                value={
                    filters.yearRange[0] && filters.yearRange[1]
                        ? `${filters.yearRange[0]} - ${filters.yearRange[1]}`
                        : '' // If the value is empty, display the placeholder
                }
                placeholder={!filters.yearRange[0] && !filters.yearRange[1] ? 'e.g., 2000 - 2023' : ''} // placeholder
                onClick={handleMenuOpen}
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                sx={{
                    borderRadius: 8,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 15,
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
                        Adjust Year Range
                    </Typography>
                    <Slider
                        value={filters.yearRange}
                        onChange={handleYearRangeChange}
                        valueLabelDisplay="auto"
                        min={2000}
                        max={currentYear}
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

export default YearRangeSelect;

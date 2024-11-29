import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Box,
    Menu,
    Button,
    Typography,
} from '@mui/material';

const DateRangeSelect = ({ filters, setFilters }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [customYears, setCustomYears] = useState(filters.saleDateRange || [null, null]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleYearChange = (index, value) => {
        const validValue = isNaN(value) ? null : value;
        const newYears = [...customYears];
        newYears[index] = validValue;
        setCustomYears(newYears);

        setFilters((prevFilters) => ({
            ...prevFilters,
            saleDateRange: newYears,
        }));
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Grid>
                {/*<Typography variant="subtitle1" gutterBottom>*/}
                {/*    Select Date Range*/}
                {/*</Typography>*/}
                <TextField
                    label="Sale Year Range"
                    value={
                        customYears[0] && customYears[1]
                            ? `${customYears[0]} - ${customYears[1]}`
                            : ''
                    }
                    placeholder="Custom Sale Date"
                    onClick={handleMenuOpen}
                    fullWidth
                    InputProps={{
                        readOnly: true, // Disable direct editing
                    }}
                    sx={{
                        borderRadius: 8,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 15,
                        },
                    }}
                />
            </Grid>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <Box sx={{ p: 2, width: 300 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Custom Year Range
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Start Year"
                            type="number"
                            value={customYears[0] || ''}
                            onChange={(e) => handleYearChange(0, parseInt(e.target.value, 10))}
                            fullWidth
                        />
                        <TextField
                            label="End Year"
                            type="number"
                            value={customYears[1] || ''}
                            onChange={(e) => handleYearChange(1, parseInt(e.target.value, 10))}
                            fullWidth
                        />
                    </Box>
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

export default DateRangeSelect;

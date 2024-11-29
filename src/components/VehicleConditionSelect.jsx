import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const VehicleConditionSelect = ({ filters, setFilters }) => {
    const handleConditionChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            vehicleCondition: event.target.value,
        }));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Vehicle Condition</InputLabel>
            <Select
                name="vehicleCondition"
                value={filters.vehicleCondition}
                onChange={handleConditionChange}
                sx={{
                    borderRadius: 8,
                }}
            >
                <MenuItem value="">All Car Conditions</MenuItem>
                <MenuItem value="Excellent">Excellent</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Above Average">Above Average</MenuItem>
                <MenuItem value="Average">Average</MenuItem>
                <MenuItem value="Below Average">Below Average</MenuItem>
                <MenuItem value="Poor">Poor</MenuItem>
            </Select>
        </FormControl>
    );
};

export default VehicleConditionSelect;

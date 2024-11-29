import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const StateSelect = ({ filters, setFilters }) => {
    const handleStateChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            state: event.target.value,
        }));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>States</InputLabel>
            <Select
                name="States"
                value={filters.state || ''}
                onChange={handleStateChange}
                sx={{
                    borderRadius: 8,
                }}
            >
                <MenuItem value="">All States</MenuItem>
                <MenuItem value="ACT">ACT</MenuItem>
                <MenuItem value="NSW">NSW</MenuItem>
                <MenuItem value="QLD">QLD</MenuItem>
                <MenuItem value="SA">SA</MenuItem>
                <MenuItem value="TAS">TAS</MenuItem>
                <MenuItem value="VIC">VIC</MenuItem>
            </Select>
        </FormControl>
    );
};

export default StateSelect;

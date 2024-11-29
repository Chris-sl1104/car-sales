import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MakeSelect = ({ filters, setFilters, makes }) => {
    const handleMakeChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            make: event.target.value,
            model: '',
        }));
    };

    return (
        <FormControl fullWidth sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <InputLabel>Make</InputLabel>
            <Select
                name="make"
                value={filters.make || ''}
                onChange={handleMakeChange}
                sx={{
                    borderRadius: 8,
                }}
            >
                <MenuItem value="">All Makes</MenuItem>
                {makes.map((make) => (
                    <MenuItem key={make} value={make}>
                        {make}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MakeSelect;

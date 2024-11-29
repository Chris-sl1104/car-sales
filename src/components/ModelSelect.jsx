import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ModelSelect = ({ filters, setFilters, models }) => {
    const handleModelChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            model: event.target.value,
        }));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Model</InputLabel>
            <Select
                name="model"
                value={filters.model || ''}
                onChange={handleModelChange}
                sx={{
                    borderRadius: 8,
                }}
            >
                <MenuItem value="">All Models</MenuItem>
                {models.map((model) => (
                    <MenuItem key={model} value={model}>
                        {model}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ModelSelect;

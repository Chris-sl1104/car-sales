import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortOrderSelect = ({ filters, setFilters }) => {
    const handleSortOrderChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortOrder: event.target.value,
        }));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Sort Order</InputLabel>
            <Select
                name="sortOrder"
                value={filters.sortOrder || ''}
                onChange={handleSortOrderChange}
                sx={{
                    borderRadius: 8,
                }}
            >
                <MenuItem value="asc">ASC</MenuItem>
                <MenuItem value="desc">DESC</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortOrderSelect;

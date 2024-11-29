import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortBySelect = ({ filters, setFilters }) => {
    const handleSortByChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy: event.target.value,
        }));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
                name="sortBy"
                value={filters.sortBy || ''}
                onChange={handleSortByChange}
                sx={{
                    borderRadius: 8,
                }}
            >
                <MenuItem value="saleDate">Sale Date</MenuItem>
                <MenuItem value="age">Age</MenuItem>
                <MenuItem value="year">Year</MenuItem>
                <MenuItem value="odometer">Odometer</MenuItem>
                <MenuItem value="salePrice">Price</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortBySelect;

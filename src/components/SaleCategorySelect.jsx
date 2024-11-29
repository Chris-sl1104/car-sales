import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SaleCategorySelect = ({ filters, setFilters }) => {
    const handleSaleCategoryChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            saleCategory: event.target.value,
        }));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Sale Category</InputLabel>
            <Select
                name="saleCategory"
                value={filters.saleCategory || ''}
                onChange={handleSaleCategoryChange}
                sx={{
                    borderRadius: 8,
                }}
            >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Auction">Auction</MenuItem>
                <MenuItem value="Dealership">Dealership</MenuItem>
                <MenuItem value="Fixed Price">Fixed Price</MenuItem>
                <MenuItem value="Wholesale">Wholesale</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SaleCategorySelect;

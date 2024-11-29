
import React, { useState, useEffect } from 'react';
import {
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    TextField,
    Slider,
    Typography,
    Box,
} from '@mui/material';


import dayjs from 'dayjs';
import { fetchMakes, fetchModelsByMake, fetchSaleLocations } from '../services/api';
import DateRangeSelect from "./DateRangeSelect.jsx";
import YearRangeSelect from './YearRangeSelect';
import OdometerRangeSelect from "./OdometerRangeSelect.jsx";
import VehicleConditionSelect from "./VehicleConditionSelect.jsx";
import StateSelect from "./StateSelect.jsx";
import SaleCategorySelect from "./SaleCategorySelect.jsx";
import SortBySelect from "./SortBySelect.jsx";
import SortOrderSelect from "./SortOrderSelect.jsx";
import MakeSelect from "./MakeSelect.jsx";
import ModelSelect from "./ModelSelect.jsx";

const FilterForm = ({ onApplyFilters }) => {
    const currentYear = new Date().getFullYear();
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        state: '',
        yearRange: [null, null],
        odometerRange: [null, null],
        minPrice: '',
        maxPrice: '',
        vehicleCondition: '',
        saleLocation: '',
        saleCategory: '',
        saleDateRange: [null, null],
        sortBy: 'saleDate', // Sort fields
        sortOrder: 'desc', // Sort order (asc: ascending, desc: descending)
    });

    // Get the brand list
    useEffect(() => {
        const loadMakes = async () => {
            try {
                const { data } = await fetchMakes();
                setMakes(data);
            } catch (error) {
                console.error('Failed to fetch makes:', error);
            }
        };
        loadMakes();
    }, []);

    // Dynamically load model
    useEffect(() => {
        if (filters.make) {
            const loadModels = async () => {
                try {
                    const { data } = await fetchModelsByMake(filters.make);
                    setModels(data);
                } catch (error) {
                    console.error('Failed to fetch models:', error);
                }
            };
            loadModels();
        } else {
            setModels([]);
        }
    }, [filters.make]);

    // Get the sales location list
    useEffect(() => {
        const loadLocations = async () => {
            if (!filters.make || !filters.model) {
                // If no selection is made, clear the sales location
                setLocations([]);
                return;
            }

            try {
                const { data } = await fetchSaleLocations(filters.make, filters.model);
                setLocations(data);
            } catch (error) {
                console.error('Failed to fetch sale locations:', error);
            }
        };

        loadLocations();
    }, [filters.make, filters.model]); // Monitor changes in make and model


    // 提交筛选条件
    const handleSubmit = (e) => {
        e.preventDefault();

        const [minYear, maxYear] = filters.yearRange || [null, null];
        const [minOdometer, maxOdometer] = filters.odometerRange || [null, null];
        const [startDate, endDate] = filters.saleDateRange || [null, null];

        const formattedStartDate = startDate && dayjs(startDate).isValid() ? dayjs(startDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = endDate && dayjs(endDate).isValid() ? dayjs(endDate).format('YYYY-MM-DD') : null;

        onApplyFilters({
            ...filters,
            minYear: minYear || undefined,
            maxYear: maxYear || undefined,
            minOdometer: minOdometer || undefined,
            maxOdometer: maxOdometer || undefined,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        });
    };


    // Clear the filter conditions
    const handleClear = () => {
        setFilters({
            make: '',
            model: '',
            yearRange: [2000, currentYear],
            odometerRange: [0, 300000],
            minPrice: '',
            maxPrice: '',
            vehicleCondition: '',
            saleLocation: '',
            saleCategory: '',
            saleDateRange: [null, null],
            sortBy: 'saleDate', // Sort fields
            sortOrder: 'desc', // Sort order (asc: ascending, desc: descending)
        });
        setModels([]);
        onApplyFilters({});
    };

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                borderRadius: 4,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: 3,
                mt: 4,
            }}
        >
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* brand */}
                <Grid item xs={12} sm={6} md={4}> <MakeSelect filters={filters} setFilters={setFilters} makes={makes} /> </Grid>

                {/* model */}
                <Grid item xs={12} sm={6} md={4}> <ModelSelect filters={filters} setFilters={setFilters} models={models} /> </Grid>

                {/* year range */}
                <YearRangeSelect filters={filters} setFilters={setFilters} currentYear={new Date().getFullYear()}/>

                {/* mileage range */}
                <OdometerRangeSelect filters={filters} setFilters={setFilters} />

                {/* Vehicle condition */}
                <Grid item xs={12} sm={6} md={4}> <VehicleConditionSelect filters={filters} setFilters={setFilters} /> </Grid>

                {/* sales state */}
                <Grid item xs={12} sm={6} md={4}> <StateSelect filters={filters} setFilters={setFilters} /> </Grid>

                {/* Sales Category */}
                <Grid item xs={12} sm={6} md={4}> <SaleCategorySelect filters={filters} setFilters={setFilters} /> </Grid>

                {/* Sales date range */}
                <DateRangeSelect filters={filters} setFilters={setFilters} />

                {/* Button */}
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                minWidth: { xs: '100px', sm: '150px', md: '200px' },
                                color: 'white',
                                backgroundColor: '#000000',
                                maxWidth: '300px',
                                flex: 1,
                                padding: { xs: '8px 16px', sm: '12px 24px' },
                                borderRadius: 8,
                            }}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClear}
                            sx={{
                                minWidth: { xs: '100px', sm: '150px', md: '200px' },
                                maxWidth: '300px',
                                color: 'black',
                                backgroundColor: '#ffffff',
                                flex: 1, // 自适应宽度
                                padding: { xs: '8px 16px', sm: '12px 24px' },
                                borderRadius: 8,
                                borderColor: 'black',
                            }}
                        >
                            Clear
                        </Button>
                    </Box>
                </Grid>



                {/* Select sorting item */}
                <Grid
                    container
                    justifyContent="flex-end"
                >
                    <Grid item>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: '20px',
                                gap: 2,
                                width: '280px',
                            }}
                        >
                            <SortBySelect filters={filters} setFilters={setFilters} />
                            <SortOrderSelect filters={filters} setFilters={setFilters} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </form>
        </Box>
    );
};

export default FilterForm;

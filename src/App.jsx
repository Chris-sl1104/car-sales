import React, { useState, useEffect } from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import FilterForm from './components/FilterForm';
import CarTable from './components/CarTable';
import { fetchCars } from './services/api';
import Header from './components/Header';
import Footer from "./components/Footer.jsx";
import LoginForm from './components/LoginForm';


const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const [cars, setCars] = useState([]); // Loaded vehicle data
    const [page, setPage] = useState(0);  // Current page number
    const [hasMore, setHasMore] = useState(true); // Is there more data?
    const [filters, setFilters] = useState({});

    if (!loggedIn) {
        return <LoginForm onLoginSuccess={() => setLoggedIn(true)} />;
    }


    // Load data method
    const loadCars = async (reset = false) => {
        const limit = 10;
        const skip = reset ? 0 : page * limit;

        try {
            const queryParams = {
                ...filters,
                skip,
                limit,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
            };

            const { data } = await fetchCars(queryParams);
            if (reset) {
                setCars(data);
                setPage(1); // Reset page number
            } else {
                setCars((prevCars) => [...prevCars, ...data]); // Append data
                setPage((prevPage) => prevPage + 1); // Increase the page number
            }

            setHasMore(data.length === limit);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
        }
    };


    useEffect(() => {
        loadCars(true); // Load the first page of data and reset
    }, [filters]); // Triggered when the filter condition changes

    // Dynamically generate title
    const getDynamicTitle = () => {
        const { make, model } = filters;
        if (make && model) {
            return `Car sales for ${make} ${model}`;
        } else if (make) {
            return `Car sales for ${make}`;
        } else {
            return 'Car Inventory';
        }
    };

    // 计算统计信息
    const calculateStatistics = () => {
        if (cars.length === 0) return { records: 0, averageKM: 0, averageAge: 'N/A' };

        const totalKM = cars.reduce((acc, car) => acc + car.odometer, 0);
        const averageKM = Math.round(totalKM / cars.length);

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const totalMonths = cars.reduce((acc, car) => {
            const carAgeYears = currentYear - car.year;
            const carAgeMonths = carAgeYears * 12 + (currentMonth - 1);
            return acc + carAgeMonths;
        }, 0);

        const averageMonths = Math.round(totalMonths / cars.length);
        const averageYears = Math.floor(averageMonths / 12);
        const remainingMonths = averageMonths % 12;

        return {
            records: cars.length,
            averageKM,
            averageAge: `${averageYears}yrs ${remainingMonths}mos`,
        };
    };

    const { records, averageKM, averageAge } = calculateStatistics();

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                minHeight: '100%',
            }}
        >
            <Header/>
        <Container sx={{ mt: 4 }} disableGutters>
            <Typography
                variant="h2"
                gutterBottom
                sx={{
                    fontSize: {
                        xs: '1.8rem',
                        sm: '2.5rem',
                        md: '3rem',
                        lg: '4rem',
                    },
                    fontWeight: 600,
                    lineHeight: 1.2,
                }}
            >
                {getDynamicTitle()}
            </Typography>

            <FilterForm
                onApplyFilters={(newFilters) => {
                    setFilters(newFilters);
                }}
            />
            {/* Dynamic statistics */}
            <Typography
                variant="h5"
                color="textSecondary"
                gutterBottom
                sx={{
                    mt: 4,
                    fontSize: {
                        xs: '0.9rem',
                        sm: '1rem',
                        md: '1.2rem',
                        lg: '1.5rem',
                    },
                    fontWeight: 500,
                    lineHeight: 1.5,
                }}
            >
                Records: {records} &nbsp; Average KM: {averageKM.toLocaleString()} &nbsp; Average age: {averageAge}
            </Typography>

            <CarTable cars={cars} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 4,
                }}
            >
                {hasMore ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => loadCars()}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            borderRadius: 20,
                            textTransform: 'none',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        Load More
                    </Button>
                ) : (
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '1rem',
                            fontStyle: 'italic',
                            textAlign: 'center',
                        }}
                    >
                        No more cars to load.
                    </Typography>
                )}
            </Box>

        </Container>
            <Footer></Footer>
        </Box>
    );
};

export default App;

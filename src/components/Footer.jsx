import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                borderTop: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
                py: 4,
                mt: 6,
            }}
        >
            <Container sx={{ textAlign: 'center' }}>
                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: '#333',
                    }}
                >
                    Looking for a car estimate?
                </Typography>
                {/* describe */}
                <Typography
                    variant="body1"
                    sx={{
                        mb: 3,
                        color: 'text.secondary',
                    }}
                >
                    Try our free valuation tool for an estimated value of your car.
                </Typography>
                {/* 按钮 */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        borderRadius: '20px',
                        fontSize: '1rem',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#0056b3',
                        },
                    }}
                >
                    Get free estimate
                </Button>
                {/* Copyright information at the bottom */}
                <Box
                    sx={{
                        mt: 4,
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                        }}
                    >
                        © 2023 All Rights Reserved
                    </Typography>
                    <Typography variant="body2">
                        <a
                            href="/"
                            style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                marginRight: 8,
                            }}
                        >
                            Terms & Conditions
                        </a>
                        |
                        <a
                            href="/"
                            style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                marginLeft: 8,
                            }}
                        >
                            Privacy Policy
                        </a>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;

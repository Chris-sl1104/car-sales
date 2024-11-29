import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const CarTable = ({ cars }) => {
    const theme = useTheme();
    const isLoggedIn = Boolean(localStorage.getItem('token')); // Check if you are logged in
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Determine whether it is a mobile phone screen

    return (
        <Box
            sx={{
                padding: isMobile ? 1 : 3,
                margin: "auto",
                maxWidth: "100%",
                background: isMobile
                    ? "#f9f9f9"
                    : "linear-gradient(135deg, #ffffff, #f7f7f7)",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            {!isMobile ? (
                <TableContainer
                    component={Paper}
                    sx={{
                        width: "100%",
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: 2,
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Make</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Model</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Year</TableCell>
                                <TableCell
                                    sx={{
                                        width: "40%",
                                        maxWidth: "600px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Description
                                </TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Odometer (km)</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Condition</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Location</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Category</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Salvage</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold" }}>Date</TableCell>
                                <TableCell
                                    sx={{
                                        maxWidth: "20%",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    Price
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cars.map((car) => (
                                <TableRow
                                    key={car._id}
                                    sx={{
                                        "&:nth-of-type(odd)": {
                                            backgroundColor: "#f7f7f7",
                                        },
                                    }}
                                >
                                    <TableCell>{car.make}</TableCell>
                                    <TableCell>{car.model}</TableCell>
                                    <TableCell>{car.year}</TableCell>
                                    <TableCell
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {car.description}
                                    </TableCell>
                                    <TableCell>{car.odometer}</TableCell>
                                    <TableCell>{car.vehicleCondition}</TableCell>
                                    <TableCell>{car.saleLocation}</TableCell>
                                    <TableCell>{car.saleCategory}</TableCell>
                                    <TableCell>{car.salvageVehicle ? "Yes" : "No"}</TableCell>
                                    <TableCell>{new Date(car.saleDate).toLocaleDateString()}</TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "rgba(0,0,0,0.83)",
                                                color: "white",
                                                fontSize: "12px",
                                                padding: "5px 10px",
                                                ":hover": { backgroundColor: "#008FCC" },
                                            }}
                                        >
                                            ${car.salePrice}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box>
                    {cars.map((car) => (
                        <Box
                            key={car._id}
                            sx={{
                                marginBottom: 2,
                                padding: 2,
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {car.make} {car.model} ({car.year})
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                {car.description}
                            </Typography>
                            <Typography variant="body2">Odometer: {car.odometer} km</Typography>
                            <Typography variant="body2">Condition: {car.vehicleCondition}</Typography>
                            <Typography variant="body2">Location: {car.saleLocation}</Typography>
                            <Typography variant="body2">Category: {car.saleCategory}</Typography>
                            <Typography variant="body2">
                                Salvage: {car.salvageVehicle ? "Yes" : "No"}
                            </Typography>
                            <Typography variant="body2">
                                Date: {new Date(car.saleDate).toLocaleDateString()}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "rgba(0,0,0,0.83)",
                                    color: "white",
                                    fontSize: "12px",
                                    padding: "5px 15px",
                                    marginTop: "10px",
                                    ":hover": { backgroundColor: "#008FCC" },
                                }}
                            >
                                ${car.salePrice}
                            </Button>

                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default CarTable;

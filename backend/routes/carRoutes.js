const express = require('express');
const Car = require('../models/Car');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const qs = require('qs');


/**
 * GET /api/car
 * Comprehensive filtering and statistics functionality for car listings.
 * Supported query parameters:
 * - make: Car make/brand
 * - model: Car model
 * - year: Specific year of manufacture
 * - minYear, maxYear: Year range
 * - minPrice, maxPrice: Price range
 * - minOdometer, maxOdometer: Mileage range
 * - condition: Car condition (New, Used, Salvage)
 * - saleLocation: Location of sale
 * - stats: If "true", returns statistics (e.g., count of cars per brand)
 * - sortBy: Field to sort by (default: saleDate)
 * - sortOrder: Sort order ('asc' or 'desc', default: 'desc')
 * - limit: Number of results to return (default: 10)
 * - skip: Number of results to skip (default: 0)
 */
router.get('/', authenticate, async (req, res) => {
    try {
        const query = qs.parse(req.query); // Parse parameters with []

        const {
            make,
            model,
            year,
            minYear,
            maxYear,
            minPrice,
            maxPrice,
            minOdometer,
            maxOdometer,
            vehicleCondition,
            state,
            saleLocation,
            saleCategory,
            saleDateRange,
            stats,
            sortBy = 'saleDate',
            sortOrder = 'desc',
            limit = 10,
            skip = 0,
        } = req.query;

        // If need statistics
        if (stats === 'true') {
            const statFilters = {};
            if (make) statFilters.make = make;

            const statistics = await Car.aggregate([
                { $match: statFilters },
                { $group: { _id: '$make', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]);
            return res.status(200).json(statistics);
        }

        // Dynamically construct filter conditions
        const filters = {};

        if (make) filters.make = make;
        if (model) filters.model = model;
        if (state) filters.state = state;
        if (year) filters.year = parseInt(year);
        if (saleCategory) filters.saleCategory = saleCategory;
        if (minYear || maxYear) {
            filters.year = {
                ...(filters.year || {}),
                ...(minYear ? { $gte: parseInt(minYear) } : {}),
                ...(maxYear ? { $lte: parseInt(maxYear) } : {}),
            };
        }
        if (minPrice || maxPrice) {
            filters.salePrice = {
                ...(minPrice ? { $gte: parseInt(minPrice) } : {}),
                ...(maxPrice ? { $lte: parseInt(maxPrice) } : {}),
            };
        }
        if (minOdometer || maxOdometer) {
            filters.odometer = {
                ...(minOdometer ? { $gte: parseInt(minOdometer) } : {}),
                ...(maxOdometer ? { $lte: parseInt(maxOdometer) } : {}),
            };
        }
        if (vehicleCondition) {
            filters.vehicleCondition = Array.isArray(vehicleCondition)
                ? { $in: vehicleCondition }
                : vehicleCondition;
        }

        // Handle date range
        if (saleDateRange) {
            const [startYear, endYear] = JSON.parse(saleDateRange); // Parse the JSON string
            if (startYear || endYear) {
                filters.saleDate = {
                    ...(startYear ? { $gte: new Date(`${startYear}-01-01T00:00:00Z`) } : {}),
                    ...(endYear ? { $lte: new Date(`${endYear}-12-31T23:59:59Z`) } : {}),
                };
            }
        }


        // Dynamic sorting
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1; // 1: ascending, -1: descending
        }


        // Query vehicle data (paging)
        const currentYear = new Date().getFullYear(); // Get the current year
        const cars = await Car.aggregate([
            {
                $addFields: {
                    age: { $subtract: [currentYear, "$year"] }, //Dynamically calculate age
                },
            },
            { $match: filters }, // Apply filters
            { $sort: sortOptions }, // Apply sorting
            { $skip: parseInt(skip) }, // Apply paging
            { $limit: parseInt(limit) }, // Limit the number of results returned
        ]);

        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /car/makes
 * Get all unique makes (make)
 */
router.get('/makes', authenticate, async (req, res) => {
    try {
        const makes = await Car.distinct('make');
        res.status(200).json(makes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /car/models
 * Get all models (model) according to the specified brand (make)
 */
router.get('/models', authenticate,  async (req, res) => {
    try {
        const { make } = req.query;

        if (!make) {
            return res.status(400).json({ message: 'Make is required' });
        }

        const models = await Car.distinct('model', { make });
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /car/locations
 * Get all unique sales locations (saleLocation)
 */
router.get('/locations', authenticate,  async (req, res) => {
    try {
        const { make, model } = req.query;

        // Dynamically construct filter conditions
        const filters = {};
        if (make) filters.make = make;
        if (model) filters.model = model;

        // Get the only sales location
        const locations = await Car.distinct('saleLocation', filters);
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sale locations' });
    }
});


module.exports = router;

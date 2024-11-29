const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    state: { type: String, required: true },
    description: String,
    odometer: { type: Number, required: true },
    vehicleCondition: { type: String, required: true },
    saleLocation: String,
    saleCategory: String,
    salvageVehicle: { type: Boolean, default: false },
    saleDate: { type: Date, required: true},
    salePrice: { type: Number, required: true },
});

module.exports = mongoose.model('Car', carSchema);



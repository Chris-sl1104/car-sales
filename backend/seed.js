require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Car = require("./models/Car");

// Define the correspondence between make and model
const makeModelMap = {
    Audi: ["A3", "A4", "A5", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron"],
    BMW: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "i3", "i8"],
    Toyota: ["Corolla", "Camry", "Yaris", "Avalon", "RAV4", "Highlander", "Hilux", "Tacoma", "Tundra", "Land Cruiser", "Prius"],
    Ford: ["Fiesta", "Focus", "Fusion", "Mustang", "EcoSport", "Escape", "Edge", "Explorer", "Expedition", "F-150"],
    Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Roadster"],
    Honda: ["Civic", "Accord", "Insight", "Fit", "CR-V", "HR-V", "Pilot", "Ridgeline", "Odyssey"],
    Mercedes: ["A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS", "EQC"],
    Volkswagen: ["Golf", "Polo", "Passat", "Jetta", "Arteon", "Tiguan", "Touareg", "ID.3", "ID.4"],
    Hyundai: ["Accent", "Elantra", "Sonata", "Kona", "Tucson", "Santa Fe", "Palisade", "Ioniq", "Nexo"],
    Nissan: ["Versa", "Sentra", "Altima", "Maxima", "Leaf", "Kicks", "Rogue", "Murano", "Pathfinder", "Armada"],
    Chevrolet: ["Spark", "Malibu", "Impala", "Cruze", "Trax", "Equinox", "Traverse", "Blazer", "Tahoe", "Suburban"],
    Subaru: ["Impreza", "Legacy", "Forester", "Outback", "Crosstrek", "Ascent", "WRX", "BRZ"],
    Kia: ["Rio", "Forte", "Optima", "Stinger", "Sportage", "Sorento", "Telluride", "Seltos", "Soul"],
    Jeep: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator"],
    Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40 Recharge"],
    Lexus: ["IS", "ES", "GS", "LS", "NX", "RX", "GX", "LX", "LC", "RC"],
    Mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-9", "MX-5 Miata"],
    Dodge: ["Charger", "Challenger", "Durango", "Journey", "Grand Caravan"],
    Porsche: ["911", "718 Boxster", "718 Cayman", "Macan", "Cayenne", "Taycan", "Panamera"],
};





// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Function to generate a random car object
const generateRandomCar = () => {
    // Randomly select a car make from the predefined map
    const makes = Object.keys(makeModelMap);
    const make = faker.helpers.arrayElement(makes);

    // Custom function to generate a random date within a given range
    const getRandomDate = (from, to) => {
        const fromDate = new Date(from).getTime();
        const toDate = new Date(to).getTime();
        const randomDate = new Date(fromDate + Math.random() * (toDate - fromDate));
        return randomDate;
    };

    // Randomly select a model based on the selected make
    const model = faker.helpers.arrayElement(makeModelMap[make]);

    // Generate additional properties for the car
    return {
        make,
        model,
        year: faker.number.int({ min: 2000, max: 2023 }),
        state: faker.helpers.arrayElement(["ACT", "NSW", "QLD", "SA", "TAS", "VIC"]),
        description: faker.lorem.sentence(), // Random description
        odometer: faker.number.int({ min: 0, max: 300000 }),
        vehicleCondition: (vehicleCondition = faker.helpers.arrayElement([
            "Excellent",
            "Good",
            "Above Average",
            "Average",
            "Below Average",
            "Poor",
        ])),
        saleLocation: faker.location.city(),
        saleCategory: faker.helpers.arrayElement([
            "Dealership",
            "Auction",
            "Fixed Price",
            "Wholesale",
        ]), // Type of sale
        salvageVehicle: vehicleCondition === "Poor" ? faker.datatype.boolean() : false,
        salePrice: faker.number.int({ min: 5000, max: 100000 }), // Random sale price
        saleDate: getRandomDate("2011-01-01", "2023-12-31"), // Random recent sale date
    };
};

// Function to seed random car data into the database
const seedCars = async () => {
    try {
        await connectDB();
        await Car.deleteMany(); // Clear existing data

        // Generate 5000 random car entries
        const cars = Array.from({ length: 5000 }).map(() => generateRandomCar());
        await Car.insertMany(cars); // Insert generated data into the database

        console.log("Random car data seeded successfully!");
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

// Call the function to start seeding data
seedCars();


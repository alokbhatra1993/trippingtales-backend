const Package = require("../models/package"); // Adjust the path as needed

// Function to add a new package
exports.addPackage = async (req, res) => {
  console.log("INSIDE ADD PAKCGAE");
  
    try {
        console.log("req.body", req.body);
        const {
            packageName,
            tourId, // Get the tourId from the request body
            duration,
            location,
            date,
            price,
            originalPrice,
            savings,
            images,
            requestQuoteLink,
        } = req.body;

        // Validate required fields
        if (!packageName || !tourId || !duration || !location || !date || !price || !originalPrice || !savings || !requestQuoteLink) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const packageObj = {
            packageName,
            tourId, // Store the tourId in the package object
            duration,
            location,
            date,
            price,
            originalPrice,
            savings,
            images,
            requestQuoteLink,
        };

        // Save the new package
        const newPackage = new Package(packageObj);
        const savedPackage = await newPackage.save();

        res.status(201).json(savedPackage);

    } catch (error) {
        console.error("Error in addPackage:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to fetch all packages for a specific tour
exports.fetchPackagesByTour = async (req, res) => {
    try {
        const { tourId } = req.params; // Get tourId from URL parameters
        const packages = await Package.find({ tourId }); // Find packages by tourId
        console.log("packages", packages);
        res.status(200).json(packages);
    } catch (error) {
        console.error("Error in fetchPackagesByTour:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const express = require('express');
const { addPackage,fetchPackagesByTour } = require('../controllers/package');

// Importing controller functions


const router = express.Router();

// Route to add a new package
router.post('/Add', addPackage);
router.get('/Fetch', fetchPackagesByTour);

// Route to fetch packages by tour ID
router.get('/fetch/tour/:tourId',fetchPackagesByTour);

module.exports = router;

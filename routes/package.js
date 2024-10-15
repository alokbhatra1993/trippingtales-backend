const express = require('express');
const { addPackage } = require('../controllers/package');

// Importing controller functions


const router = express.Router();

// Route to add a new package
router.post('/Add', addPackage);

// Route to fetch packages by tour ID
router.get('/fetch/tour/:tourId');

module.exports = router;

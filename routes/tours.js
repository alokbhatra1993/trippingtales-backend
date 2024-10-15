const express = require('express');

// controller functions improted 
const {addTour, fetchAllTours } = require('../controllers/tours');

const router = express.Router();

router.post('/Add', addTour);
router.get('/Fetch', fetchAllTours);



module.exports = router;





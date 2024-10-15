const Tour = require("../models/tours");

exports.addTour= async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { tourName, category, tourImage } = req.body;

    // Validate required fields
    if (!tourName || !category || !tourImage) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const tourObj = {
      tourName,
      category,
      tourImage

    }
 // Save the new tour
    const newTour = new Tour(tourObj);
    const saveUserQuery = await newTour.save();

    res.status(201).json(saveUserQuery);

  } catch (error) {
    console.error("Error in SignUp:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.fetchAllTours = async (req,res) => {
 try{
  const tours = await Tour.find()
  console.log("tours",tours)
  res.status(201).json(tours);
 }
 catch (error){
  console.error("Error in fetchTours:", error);
  res.status(500).json({ message: 'Server error' });
 }
}
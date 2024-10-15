const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    tourName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    tourImage: {
        type: String,
        required: true,
    },
 
}, { timestamps: true });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

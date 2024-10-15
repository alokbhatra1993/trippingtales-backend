const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        trim: true,
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tour', // Reference to the Tour model
    },
    duration: {
        type: String, // e.g., "5N/6D"
        required: true,
        trim: true,
    },
    location: {
        type: String, // e.g., "Baku Airport"
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    savings: {
        type: Number,
        required: true,
    },
    images: [{
        type: String, // Array to store image URLs
    }],
    requestQuoteLink: {
        type: String, // URL or string for the "Request a Quote" button
        required: true,
    },
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;

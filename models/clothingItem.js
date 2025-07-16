const mongoose = require('mongoose');
const validator = require('validator');

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Minimum length is 2'],
    maxlength: [30, 'Maximum length is 30'],
  },
  weather: {
    type: String,
    required: [true, 'Weather is required'],
    enum: {
      values: ['hot', 'warm', 'cold'],
      message: 'Weather must be one of hot, warm, cold',
    },
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid image URL format',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('ClothingItem', clothingItemSchema);

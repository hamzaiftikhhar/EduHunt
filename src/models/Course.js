const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['Udemy', 'Coursera', 'edX', 'Khan Academy', 'freeCodeCamp', 'YouTube', 'Other'],
    index: true
  },
  instructor: {
    type: String,
    default: 'Unknown'
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  subcategory: {
    type: String
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    default: 'All Levels'
  },
  price: {
    type: String,
    enum: ['Free', 'Paid', 'Freemium'],
    default: 'Free',
    index: true
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  enrollments: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: 'Self-paced'
  },
  language: {
    type: String,
    default: 'English'
  },
  thumbnail: {
    type: String
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  skills: [{
    type: String
  }],
  certificate: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ provider: 1, category: 1 });
courseSchema.index({ price: 1, rating: -1 });

// Virtual for display
courseSchema.virtual('displayPrice').get(function() {
  return this.price === 'Free' ? 'Free' : `$${this.originalPrice}`;
});

module.exports = mongoose.model('Course', courseSchema);

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'La note est requise'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Le commentaire est requis'],
    trim: true,
    maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Un utilisateur ne peut laisser qu'un seul avis
reviewSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);

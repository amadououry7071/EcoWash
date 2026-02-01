const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');

// @route   GET /api/reviews
// @desc    Obtenir tous les avis (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   POST /api/reviews
// @desc    Créer un avis
// @access  Private (utilisateur connecté)
router.post('/', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Vérifier si l'utilisateur a déjà laissé un avis
    const existingReview = await Review.findOne({ user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'Vous avez déjà laissé un avis' });
    }

    const review = await Review.create({
      user: req.user._id,
      rating,
      comment
    });

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'firstName lastName');

    res.status(201).json(populatedReview);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Vous avez déjà laissé un avis' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   PUT /api/reviews
// @desc    Modifier son avis
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findOne({ user: req.user._id });
    if (!review) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'firstName lastName');

    res.json(populatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   DELETE /api/reviews
// @desc    Supprimer son avis
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const review = await Review.findOne({ user: req.user._id });
    if (!review) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }

    await review.deleteOne();
    res.json({ message: 'Avis supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   GET /api/reviews/my
// @desc    Obtenir son propre avis
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const review = await Review.findOne({ user: req.user._id })
      .populate('user', 'firstName lastName');
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Reservation = require('../models/Reservation');

// @route   POST /api/reservations
// @desc    Créer une nouvelle réservation
// @access  Private (utilisateur connecté)
router.post('/', protect, async (req, res) => {
  try {
    const { vehicleType, service, date, time, address, notes } = req.body;

    const reservation = await Reservation.create({
      user: req.user._id,
      vehicleType,
      service,
      date,
      time,
      address,
      notes,
      status: 'pending'
    });

    const populatedReservation = await Reservation.findById(reservation._id).populate('user', 'firstName lastName email phone');

    res.status(201).json(populatedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// @route   GET /api/reservations/my
// @desc    Obtenir les réservations de l'utilisateur connecté
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   GET /api/reservations/:id
// @desc    Obtenir une réservation par ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user', 'firstName lastName email phone');

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    // Vérifier que l'utilisateur est propriétaire de la réservation
    if (reservation.user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

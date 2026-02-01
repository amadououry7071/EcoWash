const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const Reservation = require('../models/Reservation');
const Contact = require('../models/Contact');
const User = require('../models/User');
const { sendEmail, getApprovalEmailTemplate, getRejectionEmailTemplate } = require('../utils/sendEmail');

// @route   GET /api/admin/reservations
// @desc    Obtenir toutes les réservations
// @access  Admin
router.get('/reservations', protectAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }

    const reservations = await Reservation.find(query)
      .populate('user', 'firstName lastName email phone')
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   PUT /api/admin/reservations/:id
// @desc    Modifier le statut d'une réservation
// @access  Admin
router.put('/reservations/:id', protectAdmin, async (req, res) => {
  try {
    const { status, rejectReason } = req.body;
    
    const reservation = await Reservation.findById(req.params.id).populate('user', 'firstName lastName email phone');

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    const previousStatus = reservation.status;
    reservation.status = status;
    
    // Si refusé, enregistrer la raison
    if (status === 'rejected' && rejectReason) {
      reservation.rejectReason = rejectReason;
    }
    
    await reservation.save();

    // Envoyer un email si la réservation est approuvée
    if (status === 'approved' && previousStatus !== 'approved') {
      try {
        const emailHtml = getApprovalEmailTemplate(reservation, reservation.user);
        await sendEmail({
          email: reservation.user.email,
          subject: '✅ Votre réservation EcoWash est confirmée !',
          html: emailHtml
        });
        console.log(`Email de confirmation envoyé à ${reservation.user.email}`);
      } catch (emailError) {
        console.error('Erreur envoi email:', emailError);
      }
    }

    // Envoyer un email si la réservation est refusée
    if (status === 'rejected' && previousStatus !== 'rejected' && rejectReason) {
      try {
        const emailHtml = getRejectionEmailTemplate(reservation, reservation.user, rejectReason);
        await sendEmail({
          email: reservation.user.email,
          subject: '❌ Votre réservation EcoWash a été refusée',
          html: emailHtml
        });
        console.log(`Email de refus envoyé à ${reservation.user.email}`);
      } catch (emailError) {
        console.error('Erreur envoi email:', emailError);
      }
    }

    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   DELETE /api/admin/reservations/:id
// @desc    Supprimer une réservation
// @access  Admin
router.delete('/reservations/:id', protectAdmin, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    await reservation.deleteOne();
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   GET /api/admin/contacts
// @desc    Obtenir tous les messages de contact
// @access  Admin
router.get('/contacts', protectAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   PUT /api/admin/contacts/:id/read
// @desc    Marquer un message comme lu
// @access  Admin
router.put('/contacts/:id/read', protectAdmin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    contact.read = true;
    await contact.save();

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   DELETE /api/admin/contacts/:id
// @desc    Supprimer un message de contact
// @access  Admin
router.delete('/contacts/:id', protectAdmin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    await contact.deleteOne();
    res.json({ message: 'Message supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   GET /api/admin/stats
// @desc    Obtenir les statistiques
// @access  Admin
router.get('/stats', protectAdmin, async (req, res) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    const pendingReservations = await Reservation.countDocuments({ status: 'pending' });
    const approvedReservations = await Reservation.countDocuments({ status: 'approved' });
    const completedReservations = await Reservation.countDocuments({ status: 'completed' });
    const totalUsers = await User.countDocuments();
    const unreadMessages = await Contact.countDocuments({ read: false });

    res.json({
      totalReservations,
      pendingReservations,
      approvedReservations,
      completedReservations,
      totalUsers,
      unreadMessages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

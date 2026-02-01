const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Le type de véhicule est requis'],
    enum: ['berline', 'suv', 'camionnette', 'moto', 'autre']
  },
  service: {
    type: String,
    required: [true, 'Le service est requis'],
    enum: ['exterieur', 'complet', 'forfait']
  },
  date: {
    type: Date,
    required: [true, 'La date est requise']
  },
  time: {
    type: String,
    required: [true, 'L\'heure est requise']
  },
  address: {
    type: String,
    required: [true, 'L\'adresse est requise'],
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  rejectReason: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);

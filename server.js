const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ----- ROUTES API -----
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/reviews', require('./routes/reviews'));

// Route test serveur
app.get('/api/test', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API EcoWash' });
});

// ----- SERVIR LE FRONT REACT -----
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
// ----- PORT -----
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur EcoWash démarré sur le port ${PORT}`);
});

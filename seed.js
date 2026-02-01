const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté');

    // Supprimer les anciens admins
    await Admin.deleteMany({});
    console.log('Anciens admins supprimés');

    // Créer le nouvel admin
    const admin = await Admin.create({
      email: 'amadouourymargar@gmail.com',
      password: 'diallo123!'
    });

    console.log('Admin créé avec succès:');
    console.log(`  Email: ${admin.email}`);
    console.log('  Mot de passe: diallo123!');

    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

seedAdmin();

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"EcoWash" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

// Template d'email pour réservation approuvée
const getApprovalEmailTemplate = (reservation, user) => {
  const serviceNames = {
    'exterieur': 'Lavage Extérieur (20-30$)',
    'complet': 'Lavage Complet (40-60$)',
    'forfait': 'Forfait Mensuel (200$)'
  };

  const vehicleNames = {
    'berline': 'Berline',
    'suv': 'SUV',
    'camionnette': 'Camionnette',
    'moto': 'Moto',
    'autre': 'Autre'
  };

  const date = new Date(reservation.date).toLocaleDateString('fr-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4A154B 0%, #22C55E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22C55E; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        h1 { margin: 0; }
        .highlight { color: #22C55E; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 EcoWash</h1>
          <p>Votre réservation est confirmée !</p>
        </div>
        <div class="content">
          <p>Bonjour <strong>${user.firstName} ${user.lastName}</strong>,</p>
          <p>Nous avons le plaisir de vous confirmer que votre réservation a été <span class="highlight">approuvée</span> !</p>
          
          <div class="info-box">
            <h3>📋 Détails de votre réservation</h3>
            <p><strong>Service :</strong> ${serviceNames[reservation.service]}</p>
            <p><strong>Véhicule :</strong> ${vehicleNames[reservation.vehicleType]}</p>
            <p><strong>Date :</strong> ${date}</p>
            <p><strong>Heure :</strong> ${reservation.time}</p>
            <p><strong>Adresse :</strong> ${reservation.address}</p>
            ${reservation.notes ? `<p><strong>Notes :</strong> ${reservation.notes}</p>` : ''}
          </div>
          
          <div class="info-box">
            <h3>📍 Notre adresse</h3>
            <p>3030 Rue Hochelaga, Montreal, Qc H1W 1G2</p>
            <p><strong>Téléphone :</strong> 438-674-3689</p>
          </div>
          
          <p><strong>Rappel :</strong> Le paiement se fait sur place.</p>
          <p>Merci de votre confiance et à bientôt !</p>
          
          <div class="footer">
            <p>L'équipe EcoWash 🌿</p>
            <p><em>Le lavage automobile écologique</em></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template d'email pour réservation refusée
const getRejectionEmailTemplate = (reservation, user, reason) => {
  const serviceNames = {
    'exterieur': 'Lavage Extérieur (20-30$)',
    'complet': 'Lavage Complet (40-60$)',
    'forfait': 'Forfait Mensuel (200$)'
  };

  const vehicleNames = {
    'berline': 'Berline',
    'suv': 'SUV',
    'camionnette': 'Camionnette',
    'moto': 'Moto',
    'autre': 'Autre'
  };

  const date = new Date(reservation.date).toLocaleDateString('fr-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4A154B 0%, #DB2777 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #DB2777; }
        .reason-box { background: #FEF2F2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #DC2626; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        h1 { margin: 0; }
        .highlight { color: #DC2626; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 EcoWash</h1>
          <p>Information sur votre réservation</p>
        </div>
        <div class="content">
          <p>Bonjour <strong>${user.firstName} ${user.lastName}</strong>,</p>
          <p>Nous sommes désolés de vous informer que votre réservation a été <span class="highlight">refusée</span>.</p>
          
          <div class="reason-box">
            <h3>❌ Raison du refus</h3>
            <p>${reason}</p>
          </div>
          
          <div class="info-box">
            <h3>📋 Détails de la réservation</h3>
            <p><strong>Service :</strong> ${serviceNames[reservation.service]}</p>
            <p><strong>Véhicule :</strong> ${vehicleNames[reservation.vehicleType]}</p>
            <p><strong>Date demandée :</strong> ${date}</p>
            <p><strong>Heure :</strong> ${reservation.time}</p>
          </div>
          
          <p>N'hésitez pas à faire une nouvelle réservation avec une date différente ou à nous contacter pour plus d'informations.</p>
          
          <div class="info-box">
            <h3>📞 Nous contacter</h3>
            <p>3030 Rue Hochelaga, Montreal, Qc H1W 1G2</p>
            <p><strong>Téléphone :</strong> 438-674-3689</p>
            <p><strong>Email :</strong> amadouourymargar@gmail.com</p>
          </div>
          
          <div class="footer">
            <p>L'équipe EcoWash 🌿</p>
            <p><em>Le lavage automobile écologique</em></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { sendEmail, getApprovalEmailTemplate, getRejectionEmailTemplate };

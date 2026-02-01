import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Car, MapPin, Clock, FileText, CheckCircle, Home, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createReservation } from '../services/api';

const Reservation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    vehicleType: '',
    service: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  });
  const [serviceLocation, setServiceLocation] = useState(''); // 'onsite' ou 'mobile'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const vehicleTypes = [
    { value: 'berline', label: 'Berline' },
    { value: 'suv', label: 'SUV' },
    { value: 'camionnette', label: 'Camionnette' },
    { value: 'moto', label: 'Moto' },
    { value: 'autre', label: 'Autre' }
  ];

  const services = [
    { value: 'exterieur', label: 'Lavage Extérieur (20-30$)', price: '20-30$' },
    { value: 'complet', label: 'Lavage Complet (40-60$)', price: '40-60$' },
    { value: 'forfait', label: 'Forfait Mensuel (200$)', price: '200$' }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation du lieu de service
    if (!serviceLocation) {
      setError('Veuillez choisir le lieu de service');
      setLoading(false);
      return;
    }

    // Si service mobile, l'adresse est obligatoire
    if (serviceLocation === 'mobile' && !formData.address.trim()) {
      setError('Veuillez entrer votre adresse pour le service mobile');
      setLoading(false);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        address: serviceLocation === 'onsite' 
          ? '3030 Rue Hochelaga, Montreal, Qc H1W 1G2 (Sur place)' 
          : formData.address
      };
      await createReservation(dataToSend, user.token);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (success) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <CheckCircle className="w-20 h-20 text-secondary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              Réservation envoyée !
            </h2>
            <p className="text-gray-600 mb-6">
              Votre demande de réservation a été envoyée avec succès. 
              Vous recevrez un email de confirmation une fois que notre équipe aura approuvé votre réservation.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/mes-reservations')}
                className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Voir mes réservations
              </button>
              <button
                onClick={() => {
                  setSuccess(false);
                  setServiceLocation('');
                  setFormData({
                    vehicleType: '',
                    service: '',
                    date: '',
                    time: '',
                    address: '',
                    notes: ''
                  });
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Nouvelle réservation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Réserver un lavage
          </h1>
          <p className="text-xl text-gray-200">
            Bienvenue {user?.firstName} ! Remplissez le formulaire ci-dessous.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="inline w-5 h-5 mr-2 text-secondary" />
                  Type de véhicule *
                </label>
                <select
                  name="vehicleType"
                  required
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Sélectionnez un type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service souhaité *
                </label>
                <div className="space-y-3">
                  {services.map((service) => (
                    <label
                      key={service.value}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.service === service.value
                          ? 'border-secondary bg-secondary/5'
                          : 'border-gray-300 hover:border-secondary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.value}
                        checked={formData.service === service.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary"
                        required
                      />
                      <span className="ml-3 flex-grow">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-5 h-5 mr-2 text-secondary" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-5 h-5 mr-2 text-secondary" />
                    Heure *
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  >
                    <option value="">Sélectionnez</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Location Choice */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-5 h-5 mr-2 text-secondary" />
                  Lieu du service *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      serviceLocation === 'onsite'
                        ? 'border-secondary bg-secondary/10'
                        : 'border-gray-300 hover:border-secondary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceLocation"
                      value="onsite"
                      checked={serviceLocation === 'onsite'}
                      onChange={(e) => setServiceLocation(e.target.value)}
                      className="sr-only"
                    />
                    <Home className={`w-8 h-8 mb-2 ${serviceLocation === 'onsite' ? 'text-secondary' : 'text-gray-400'}`} />
                    <span className="font-medium text-gray-700">Je me déplace</span>
                    <span className="text-xs text-gray-500 text-center mt-1">Au local EcoWash</span>
                  </label>
                  <label
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      serviceLocation === 'mobile'
                        ? 'border-secondary bg-secondary/10'
                        : 'border-gray-300 hover:border-secondary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceLocation"
                      value="mobile"
                      checked={serviceLocation === 'mobile'}
                      onChange={(e) => setServiceLocation(e.target.value)}
                      className="sr-only"
                    />
                    <Truck className={`w-8 h-8 mb-2 ${serviceLocation === 'mobile' ? 'text-secondary' : 'text-gray-400'}`} />
                    <span className="font-medium text-gray-700">Service mobile</span>
                    <span className="text-xs text-gray-500 text-center mt-1">On vient chez vous</span>
                  </label>
                </div>
              </div>

              {/* Address - Only if mobile service */}
              {serviceLocation === 'mobile' && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-5 h-5 mr-2 text-secondary" />
                    Votre adresse *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Entrez votre adresse complète"
                  />
                </div>
              )}

              {/* Show EcoWash address if onsite */}
              {serviceLocation === 'onsite' && (
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 animate-fadeIn">
                  <p className="text-sm text-gray-700">
                    <strong>📍 Adresse du local EcoWash :</strong><br />
                    3030 Rue Hochelaga, Montreal, Qc H1W 1G2
                  </p>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline w-5 h-5 mr-2 text-secondary" />
                  Notes (optionnel)
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                  placeholder="Informations supplémentaires..."
                ></textarea>
              </div>

              {/* Info Box */}
              <div className="bg-secondary/10 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Rappel :</strong> Le paiement se fait sur place. 
                  Vous recevrez un email de confirmation une fois votre réservation approuvée par notre équipe.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary hover:bg-secondary-dark text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer la demande de réservation'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Reservation;

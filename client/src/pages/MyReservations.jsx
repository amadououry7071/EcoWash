import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, Plus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyReservations } from '../services/api';

const MyReservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getMyReservations(user.token);
        setReservations(data);
      } catch (err) {
        setError('Erreur lors du chargement des réservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user.token]);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approuvée', class: 'bg-green-100 text-green-800' },
      rejected: { label: 'Refusée', class: 'bg-red-100 text-red-800' },
      completed: { label: 'Terminée', class: 'bg-blue-100 text-blue-800' }
    };
    return badges[status] || badges.pending;
  };

  const getServiceName = (service) => {
    const services = {
      exterieur: 'Lavage Extérieur',
      complet: 'Lavage Complet',
      forfait: 'Forfait Mensuel'
    };
    return services[service] || service;
  };

  const getVehicleName = (vehicle) => {
    const vehicles = {
      berline: 'Berline',
      suv: 'SUV',
      camionnette: 'Camionnette',
      moto: 'Moto',
      autre: 'Autre'
    };
    return vehicles[vehicle] || vehicle;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Mes réservations
              </h1>
              <p className="text-gray-200">
                Retrouvez l'historique de vos réservations
              </p>
            </div>
            <Link
              to="/reservation"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              <span>Nouvelle réservation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gray-50 min-h-[50vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center space-x-2">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucune réservation
              </h3>
              <p className="text-gray-500 mb-6">
                Vous n'avez pas encore effectué de réservation.
              </p>
              <Link
                to="/reservation"
                className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Plus size={20} />
                <span>Faire une réservation</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => {
                const status = getStatusBadge(reservation.status);
                return (
                  <div
                    key={reservation._id}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-primary">
                            {getServiceName(reservation.service)}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.class}`}>
                            {status.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Car size={18} className="text-secondary" />
                            <span>{getVehicleName(reservation.vehicleType)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={18} className="text-secondary" />
                            <span>{formatDate(reservation.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={18} className="text-secondary" />
                            <span>{reservation.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={18} className="text-secondary" />
                            <span className="truncate">{reservation.address}</span>
                          </div>
                        </div>

                        {reservation.notes && (
                          <p className="mt-3 text-sm text-gray-500 italic">
                            Note: {reservation.notes}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6 text-right">
                        <p className="text-sm text-gray-500">
                          Créée le {new Date(reservation.createdAt).toLocaleDateString('fr-CA')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyReservations;

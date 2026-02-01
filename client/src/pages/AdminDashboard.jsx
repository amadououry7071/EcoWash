import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, MessageSquare, LogOut, 
  Users, CheckCircle, Clock, XCircle, Trash2, Eye,
  Check, X, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getAdminReservations, updateReservationStatus, deleteReservation,
  getAdminContacts, markContactAsRead, deleteContact, getAdminStats 
} from '../services/api';

// Dashboard Overview Component
const DashboardOverview = ({ admin }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats(admin.token);
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [admin.token]);

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  const statCards = [
    { label: 'Total réservations', value: stats?.totalReservations || 0, icon: Calendar, color: 'bg-blue-500' },
    { label: 'En attente', value: stats?.pendingReservations || 0, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Approuvées', value: stats?.approvedReservations || 0, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Terminées', value: stats?.completedReservations || 0, icon: Check, color: 'bg-purple-500' },
    { label: 'Utilisateurs', value: stats?.totalUsers || 0, icon: Users, color: 'bg-indigo-500' },
    { label: 'Messages non lus', value: stats?.unreadMessages || 0, icon: MessageSquare, color: 'bg-red-500' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Tableau de bord</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reservations Management Component
const ReservationsManagement = ({ admin }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [rejectModal, setRejectModal] = useState({ show: false, reservationId: null });
  const [rejectReason, setRejectReason] = useState('');

  const fetchReservations = async () => {
    try {
      const data = await getAdminReservations(admin.token, filter);
      setReservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [admin.token, filter]);

  const handleStatusChange = async (id, status, reason = null) => {
    setActionLoading(id);
    try {
      await updateReservationStatus(id, status, admin.token, reason);
      fetchReservations();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (id) => {
    setRejectModal({ show: true, reservationId: id });
    setRejectReason('');
  };

  const closeRejectModal = () => {
    setRejectModal({ show: false, reservationId: null });
    setRejectReason('');
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Veuillez entrer une raison de refus');
      return;
    }
    await handleStatusChange(rejectModal.reservationId, 'rejected', rejectReason);
    closeRejectModal();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;
    setActionLoading(id);
    try {
      await deleteReservation(id, admin.token);
      fetchReservations();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

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
    const services = { exterieur: 'Extérieur', complet: 'Complet', forfait: 'Forfait' };
    return services[service] || service;
  };

  const getVehicleName = (vehicle) => {
    const vehicles = { berline: 'Berline', suv: 'SUV', camionnette: 'Camionnette', moto: 'Moto', autre: 'Autre' };
    return vehicles[vehicle] || vehicle;
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Réservations</h2>
        <div className="mt-4 md:mt-0 flex space-x-2">
          {['all', 'pending', 'approved', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'Toutes' : f === 'pending' ? 'En attente' : f === 'approved' ? 'Approuvées' : 'Terminées'}
            </button>
          ))}
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucune réservation trouvée</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservations.map((res) => {
                  const status = getStatusBadge(res.status);
                  return (
                    <tr key={res._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {res.user?.firstName} {res.user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{res.user?.email}</p>
                          <p className="text-sm text-gray-500">{res.user?.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{getServiceName(res.service)}</p>
                        <p className="text-sm text-gray-500">{getVehicleName(res.vehicleType)}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{res.address}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{new Date(res.date).toLocaleDateString('fr-CA')}</p>
                        <p className="text-sm text-gray-500">{res.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.class}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {res.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(res._id, 'approved')}
                                disabled={actionLoading === res._id}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Approuver"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                onClick={() => openRejectModal(res._id)}
                                disabled={actionLoading === res._id}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Refuser"
                              >
                                <X size={18} />
                              </button>
                            </>
                          )}
                          {res.status === 'approved' && (
                            <button
                              onClick={() => handleStatusChange(res._id, 'completed')}
                              disabled={actionLoading === res._id}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              title="Marquer terminée"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(res._id)}
                            disabled={actionLoading === res._id}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de refus */}
      {rejectModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-primary mb-4">Refuser la réservation</h3>
            <p className="text-gray-600 mb-4">
              Veuillez indiquer la raison du refus. Un email sera envoyé au client.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Raison du refus..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows="4"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={closeRejectModal}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
              >
                {actionLoading ? 'Envoi...' : 'Refuser et envoyer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Messages Management Component
const MessagesManagement = ({ admin }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const data = await getAdminContacts(admin.token);
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [admin.token]);

  const handleMarkRead = async (id) => {
    try {
      await markContactAsRead(id, admin.token);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;
    try {
      await deleteContact(id, admin.token);
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Messages de contact</h2>

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun message</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.read) handleMarkRead(msg._id);
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?._id === msg._id ? 'bg-secondary/10' : ''
                  } ${!msg.read ? 'border-l-4 border-secondary' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-medium ${!msg.read ? 'text-primary' : 'text-gray-700'}`}>
                        {msg.name}
                      </p>
                      <p className="text-sm text-gray-500">{msg.subject}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleDateString('fr-CA')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {selectedMessage ? (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{selectedMessage.subject}</h3>
                    <p className="text-gray-500">De: {selectedMessage.name} ({selectedMessage.email})</p>
                    <p className="text-sm text-gray-400">
                      {new Date(selectedMessage.createdAt).toLocaleString('fr-CA')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="mt-4">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Répondre par email</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Sélectionnez un message pour le lire</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const { admin, logoutAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { path: '/admin/reservations', label: 'Réservations', icon: Calendar },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-primary min-h-screen fixed left-0 top-0 pt-20">
          <div className="p-4">
            <div className="text-white text-center mb-8">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold">EW</span>
              </div>
              <p className="font-semibold">Administration</p>
              <p className="text-sm text-gray-300">{admin?.email}</p>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-secondary text-white'
                      : 'text-gray-300 hover:bg-primary-light hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-colors"
              >
                <LogOut size={20} />
                <span>Déconnexion</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 pt-24">
          <Routes>
            <Route path="dashboard" element={<DashboardOverview admin={admin} />} />
            <Route path="reservations" element={<ReservationsManagement admin={admin} />} />
            <Route path="messages" element={<MessagesManagement admin={admin} />} />
            <Route path="*" element={<DashboardOverview admin={admin} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

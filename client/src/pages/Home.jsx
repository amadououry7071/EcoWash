import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Leaf, Clock, MapPin, Star, ArrowRight, Send, Edit2, Trash2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getReviews, getMyReview, createReview, updateReview, deleteReview } from '../services/api';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const features = [
    {
      icon: <Droplets className="w-8 h-8 text-secondary" />,
      title: 'Sans eau',
      description: 'Notre technologie innovante économise 150-200L d\'eau par lavage.'
    },
    {
      icon: <Leaf className="w-8 h-8 text-secondary" />,
      title: '100% Écologique',
      description: 'Produits biodégradables à base de limonène et huile de colza.'
    },
    {
      icon: <Clock className="w-8 h-8 text-secondary" />,
      title: 'Service rapide',
      description: 'Lavage complet en 30 minutes, on se déplace chez vous.'
    },
    {
      icon: <MapPin className="w-8 h-8 text-secondary" />,
      title: 'Service mobile',
      description: 'Nous venons à votre domicile ou lieu de travail.'
    }
  ];

  // Charger les avis
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (err) {
        console.error('Erreur chargement avis:', err);
      }
    };
    fetchReviews();
  }, []);

  // Charger mon avis si connecté
  useEffect(() => {
    const fetchMyReview = async () => {
      if (isAuthenticated && user?.token) {
        try {
          const data = await getMyReview(user.token);
          setMyReview(data);
          if (data) {
            setReviewForm({ rating: data.rating, comment: data.comment });
          }
        } catch (err) {
          console.error('Erreur chargement mon avis:', err);
        }
      }
    };
    fetchMyReview();
  }, [isAuthenticated, user]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing && myReview) {
        await updateReview(reviewForm, user.token);
      } else {
        await createReview(reviewForm, user.token);
      }
      
      // Recharger les avis
      const updatedReviews = await getReviews();
      setReviews(updatedReviews);
      const updatedMyReview = await getMyReview(user.token);
      setMyReview(updatedMyReview);
      
      setShowReviewForm(false);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer votre avis ?')) return;
    
    try {
      await deleteReview(user.token);
      setMyReview(null);
      setReviewForm({ rating: 5, comment: '' });
      const updatedReviews = await getReviews();
      setReviews(updatedReviews);
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  const openEditForm = () => {
    setReviewForm({ rating: myReview.rating, comment: myReview.comment });
    setIsEditing(true);
    setShowReviewForm(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-12">
            {/* Texte à gauche */}
            <div className="text-white text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                EcoWash
              </h1>
              <p className="text-xl md:text-2xl mb-2 text-secondary font-semibold">
                Le lavage automobile écologique
              </p>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Des solutions propres pour des véhicules brillants
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/reservation"
                  className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Réserver maintenant</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/services"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-white/30 text-center"
                >
                  Nos services
                </Link>
              </div>
            </div>
            {/* Image à droite */}
            <div className="flex justify-center">
              <img
                src="/Images/photoAcceuil.png"
                alt="EcoWash - Lavage automobile écologique"
                className="w-full max-w-lg rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Pourquoi choisir EcoWash ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un service de lavage automobile qui respecte l'environnement sans compromettre la qualité.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Notre mission
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                Chez EcoWash, nous sommes spécialisés dans le lavage de véhicules 
                respectueux de l'environnement. Nous utilisons des sprays écologiques 
                à base de limonène et d'huile de colza.
              </p>
              <p className="text-lg text-gray-200 mb-8">
                Notre mission : <span className="text-secondary font-semibold">Protéger l'environnement 
                tout en offrant un service de qualité.</span>
              </p>
              <Link
                to="/a-propos"
                className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-dark px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <span>En savoir plus</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/Images/photoDuGarage.png"
                alt="Station EcoWash"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/Images/photoDuProduit.png"
                alt="Spray LimoFresh"
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-secondary font-semibold">Notre produit vedette</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 mt-2">
                Spray LimoFresh
              </h2>
              <p className="text-gray-600 mb-4">
                Nettoyez votre véhicule rapidement et sans rinçage grâce au spray LimoFresh, 
                formulé à base de limonène d'agrumes et de colza saponifié.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span className="text-gray-700">100% biodégradable</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span className="text-gray-700">Parfum agrumes naturels</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span className="text-gray-700">pH neutre (6-7)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span className="text-gray-700">Disponible en 500mL et 1L</span>
                </li>
              </ul>
              <Link
                to="/produit"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <span>Découvrir le produit</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ce que disent nos clients
            </h2>
            {isAuthenticated && !myReview && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="mt-4 inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Send size={20} />
                <span>Donner mon avis</span>
              </button>
            )}
            {isAuthenticated && myReview && (
              <div className="mt-4 flex items-center justify-center space-x-3">
                <span className="text-gray-600">Vous avez déjà laissé un avis</span>
                <button
                  onClick={openEditForm}
                  className="inline-flex items-center space-x-1 text-secondary hover:text-secondary-dark"
                >
                  <Edit2 size={18} />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={handleDeleteReview}
                  className="inline-flex items-center space-x-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                  <span>Supprimer</span>
                </button>
              </div>
            )}
            {!isAuthenticated && (
              <p className="mt-4 text-gray-500">
                <Link to="/connexion" className="text-secondary hover:underline">Connectez-vous</Link> pour laisser votre avis
              </p>
            )}
          </div>

          {/* Liste des avis */}
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-50 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-gray-300" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-primary">
                      {review.user?.firstName} {review.user?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('fr-CA')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
            </div>
          )}
        </div>

        {/* Modal formulaire d'avis */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">
                  {isEditing ? 'Modifier mon avis' : 'Donner mon avis'}
                </h3>
                <button
                  onClick={() => { setShowReviewForm(false); setIsEditing(false); setError(''); }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitReview}>
                {/* Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note *
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={`${
                            star <= reviewForm.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre commentaire *
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    rows="4"
                    required
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                    placeholder="Partagez votre expérience avec EcoWash..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {reviewForm.comment.length}/500 caractères
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !reviewForm.comment.trim()}
                  className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? 'Envoi...' : isEditing ? 'Modifier mon avis' : 'Publier mon avis'}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à essayer EcoWash ?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Réservez votre lavage écologique dès maintenant et contribuez à protéger l'environnement.
          </p>
          <Link
            to="/reservation"
            className="inline-flex items-center space-x-2 bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            <span>Réserver maintenant</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

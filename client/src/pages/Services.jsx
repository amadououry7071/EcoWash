import { Link } from 'react-router-dom';
import { Car, Sparkles, Calendar, Check, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Car className="w-12 h-12" />,
      title: 'Lavage Extérieur',
      price: '20-30 $',
      description: 'Nettoyage complet de l\'extérieur de votre véhicule.',
      features: [
        'Carrosserie complète',
        'Vitres et rétroviseurs',
        'Jantes et pneus',
        'Plastiques extérieurs',
        'Produits 100% écologiques'
      ],
      popular: false
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'Lavage Complet',
      price: '40-60 $',
      description: 'Nettoyage intérieur et extérieur pour une voiture comme neuve.',
      features: [
        'Tout le lavage extérieur',
        'Aspiration intérieure',
        'Nettoyage des sièges',
        'Tableau de bord',
        'Vitres intérieures',
        'Parfum d\'agrumes offert'
      ],
      popular: true
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: 'Forfait Mensuel',
      price: '200 $',
      description: 'Lavages illimités pendant un mois pour les professionnels.',
      features: [
        'Lavages extérieurs illimités',
        '2 lavages complets inclus',
        'Priorité de réservation',
        'Rabais entreprises disponibles',
        'Service VIP',
        'Facturation simplifiée'
      ],
      popular: false
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Services
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Des formules adaptées à vos besoins, toujours avec des produits écologiques.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:-translate-y-2 ${
                  service.popular ? 'ring-4 ring-secondary' : ''
                }`}
              >
                {service.popular && (
                  <div className="bg-secondary text-white text-center py-2 font-semibold">
                    Le plus populaire
                  </div>
                )}
                <div className="p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary text-center mb-2">
                    {service.title}
                  </h3>
                  <p className="text-3xl font-bold text-secondary text-center mb-4">
                    {service.price}
                  </p>
                  <p className="text-gray-600 text-center mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/reservation"
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-colors ${
                      service.popular
                        ? 'bg-secondary hover:bg-secondary-dark text-white'
                        : 'bg-primary hover:bg-primary-dark text-white'
                    }`}
                  >
                    <span>Réserver</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Informations complémentaires
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Service Mobile
              </h3>
              <p className="text-gray-600">
                Nous nous déplaçons directement chez vous, à votre domicile ou lieu de travail. 
                Plus besoin de perdre du temps dans une station de lavage !
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Paiement sur place
              </h3>
              <p className="text-gray-600">
                Le paiement s'effectue directement sur place après le service. 
                Nous acceptons les paiements en espèces et par carte.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Rabais pour flottes
              </h3>
              <p className="text-gray-600">
                Vous avez plusieurs véhicules ? Contactez-nous pour obtenir un 
                tarif préférentiel adapté à votre flotte d'entreprise.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Notre adresse
              </h3>
              <p className="text-gray-600">
                Vous pouvez aussi venir sur place :<br />
                <strong>3030 Rue Hochelaga, Montreal, Qc H1W 1G2</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à faire briller votre véhicule ?
          </h2>
          <p className="text-gray-200 mb-8">
            Réservez dès maintenant et profitez d'un lavage écologique de qualité.
          </p>
          <Link
            to="/reservation"
            className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            <span>Réserver maintenant</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;

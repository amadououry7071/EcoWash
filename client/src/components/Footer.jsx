import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">EW</span>
              </div>
              <span className="font-bold text-xl">EcoWash</span>
            </div>
            <p className="text-gray-300 mb-4">
              Le lavage automobile écologique. Des solutions propres pour des véhicules brillants.
              Nous utilisons des produits 100% biodégradables pour protéger l'environnement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/produit" className="text-gray-300 hover:text-secondary transition-colors">
                  Produit LimoFresh
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-gray-300 hover:text-secondary transition-colors">
                  Réserver
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  3030 Rue Hochelaga<br />
                  Montreal, Qc H1W 1G2
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-secondary" />
                <a href="tel:4386743689" className="text-gray-300 hover:text-secondary transition-colors">
                  438-674-3689
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-secondary" />
                <a href="mailto:amadouourymargar@gmail.com" className="text-gray-300 hover:text-secondary transition-colors">
                  amadouourymargar@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400">
            © {new Date().getFullYear()} EcoWash. Tous droits réservés.
          </p>
          <Link 
            to="/admin/login" 
            className="text-gray-500 hover:text-secondary transition-colors text-sm mt-4 md:mt-0"
          >
            Administration
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

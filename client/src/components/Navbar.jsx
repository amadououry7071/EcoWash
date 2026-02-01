import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Produit', path: '/produit' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">EW</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">EcoWash</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white hover:text-secondary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/reservation"
                  className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Calendar size={18} />
                  <span>Réserver</span>
                </Link>
                <Link
                  to="/mes-reservations"
                  className="text-white hover:text-secondary transition-colors px-3 py-2 text-sm"
                >
                  Mes réservations
                </Link>
                <div className="flex items-center space-x-2 text-white">
                  <User size={18} />
                  <span className="text-sm">{user?.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-accent transition-colors p-2"
                  title="Déconnexion"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/connexion"
                  className="text-white hover:text-secondary transition-colors px-3 py-2 text-sm font-medium"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-secondary transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-secondary block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/reservation"
                  onClick={() => setIsOpen(false)}
                  className="bg-secondary text-white block px-3 py-2 rounded-md text-base font-medium mt-2"
                >
                  Réserver
                </Link>
                <Link
                  to="/mes-reservations"
                  onClick={() => setIsOpen(false)}
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Mes réservations
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="text-accent hover:text-accent-light block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Déconnexion ({user?.firstName})
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  onClick={() => setIsOpen(false)}
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  onClick={() => setIsOpen(false)}
                  className="bg-secondary text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

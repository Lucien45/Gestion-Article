import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">À propos</h3>
            <p className="text-gray-700 dark:text-gray-300">
              BlogApp est une plateforme de partage de connaissances et d'expériences.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/articles" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Articles</Link></li>
              <li><Link to="/categories" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Catégories</Link></li>
              <li><Link to="/authors" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Auteurs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Politique de confidentialité</Link></li>
              <li><Link to="/terms" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Conditions d'utilisation</Link></li>
              <li><Link to="/cookies" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Politique des cookies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} BlogApp. Tous droits réservés.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Fait avec <Heart className="h-4 w-4 text-red-500 mx-1" /> à Madagascar
            </p>
          </div>
        </div>
      </div>
    </footer>

  );
};

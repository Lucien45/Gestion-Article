import { BookOpen, Filter, LogOut, Menu, X } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Token } from '../utils/Token';
import { UserService } from '../services/user.service';
import { isAuthenticated, logout } from '../context/AuthContext';
import { apiUrl } from '../services/api';
import { Footer } from './Footer';
import { ThemeToggle } from './ThemeToggle';
import { Category } from '../types';
import { ArticleService } from '../services/article.service';

interface User {
  id: number;
  email: string;
  username: string;
  profile?: string;
  role: string;
}

export function Header() {
  const [user, setUser]  = useState<User | null>(null);
  const userProfile = Token.GetToken('profile') ? JSON.parse(Token.GetToken("profile") as string) : null;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [dataFilter, setDataFilter] = useState({
    categroie: '',
    auteur: '',

  });
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [auteurList, setAuteurList] = useState<User[]>([]);


  const fetchUser = async () => {
    if (userProfile) {
      UserService.getUserById(userProfile.id)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
    }else {
      setUser(null);
    }
  }

  const fetchDataFilter = async () => {
    try {
      const response = await ArticleService.getAllCategories();
      setCategoryList(response.data);

      const res = await UserService.getAllUsers();
      const auteur: User[] = res.data.filter((author: User) => author.role === 'auteur' || author.role === 'editeur');
      setAuteurList(auteur ? auteur : [])
    } catch (error: unknown) {
      console.warn("Aucun datafilter disponible",error);
    }
  }

  const handleSignOut = async () => {
    logout();
    navigate('/');
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/articles?search=${encodeURIComponent(search.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/articles?';
    if (search.trim()) url += `search=${encodeURIComponent(search.trim())}&`;
    if (dataFilter.categroie) url += `category=${dataFilter.categroie}&`;
    if (dataFilter.auteur) url += `author=${dataFilter.auteur}&`;
    navigate(url.replace(/&$/, ''));
    setShowFilters(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    fetchUser();
    fetchDataFilter();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }
    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            <div className="flex">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">BlogApp</span>
              </Link>
            </div>

            {/* Barre de recherche + bouton filtre */}
            <div className="flex items-center space-x-4 mr-4 relative">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-64 px-4 py-2 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 font-semibold"
                >
                  Rechercher
                </button>
              </form>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow-md font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
                type="button"
                aria-label="Filtres"
              >
                <Filter className="h-5 w-5" />
              </button>
              {showFilters && (
                <div
                  ref={filterRef}
                  className="absolute top-12 right-0 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 w-64"
                >
                  <form onSubmit={handleFilterSubmit} className="flex flex-col gap-3">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Catégorie</label>
                    <select
                      value={dataFilter.categroie}
                      onChange={e => setDataFilter({ ...dataFilter, categroie: e.target.value })}
                      className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    >
                      <option value="">Toutes les catégories</option>
                      {categoryList.map((cat) => (
                        <option key={cat.id} value={cat.nom}>{cat.nom}</option>
                      ))}
                    </select>

                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Auteur</label>
                    <select
                      value={dataFilter.auteur}
                      onChange={e => setDataFilter({ ...dataFilter, auteur: e.target.value })}
                      className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    >
                      <option value="">Tous les auteurs</option>
                      {auteurList.map((auteur) => (
                        <option key={auteur.id} value={auteur.username}>{auteur.username}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 font-semibold"
                    >
                      Appliquer
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <ThemeToggle />
              {isAuthenticated() ? (
                <>
                  <Link to="/articles" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                    Articles
                  </Link>
                  {(user?.role === 'admin' || user?.role === 'editeur' || user?.role === 'auteur') && (
                    <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="flex items-center space-x-2">
                      <img
                        src={user?.profile ? `${apiUrl}/${user.profile}` : user?.username || `https://ui-avatars.com/api/?name=${user?.username}`}
                        alt={user?.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-gray-700 dark:text-gray-200">{user?.username}</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="auth/login"
                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="auth/register"
                    className="w-[100px] bg-black h-[35px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
                  >
                    Register
                  </Link>
                </div>

              )}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {isAuthenticated() ? (
                <>
                  <Link
                    to="/articles"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Articles
                  </Link>
                  {(user?.role === 'admin' || user?.role === 'editeur' || user?.role === 'auteur') && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="auth/login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="auth/register"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
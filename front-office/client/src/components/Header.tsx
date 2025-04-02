import { BookOpen, LogOut, Menu, X } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Token } from '../utils/Token';
import { UserService } from '../services/user.service';
import { logout } from '../context/AuthContext';
import { apiUrl } from '../services/api';

interface User {
  id: number;
  email: string;
  username: string;
  profile?: string;
  role: string;
}

export function Header() {

  const [user, setUser]  = useState<User | null>(null);
  const userProfile = JSON.parse(Token.GetToken("profile") as string);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">BlogApp</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {user ? (
                <>
                  <Link to="/" className="text-gray-700 hover:text-gray-900">
                    Articles
                  </Link>
                  {(user.role === 'admin' || user.role === 'editeur' || user.role === 'auteur') && (
                    <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="flex items-center space-x-2">
                      <img
                        src={user?.profile ? `${apiUrl}/${user.profile}` : user?.username || `https://ui-avatars.com/api/?name=${user.username}`}
                        alt={user.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-gray-700">{user.username}</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
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
              {user ? (
                <>
                  <Link
                    to="/articles"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Articles
                  </Link>
                  {(user.role === 'admin' || user.role === 'editeur' || user.role === 'auteur') && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
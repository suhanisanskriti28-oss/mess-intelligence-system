import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, Utensils, MessageSquare, LayoutDashboard, Store } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = userRole === 'admin' 
    ? [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={16} /> },
        { name: 'Complaints', path: '/admin/complaints', icon: <MessageSquare size={16} /> },
        { name: 'Feedback', path: '/admin/feedback', icon: <Utensils size={16} /> }
      ]
    : userRole === 'student'
      ? [
          { name: 'Home', path: '/student/home', icon: <Utensils size={16} /> },
          { name: 'Feedback', path: '/student/feedback', icon: <MessageSquare size={16} /> },
          { name: 'Complaints', path: '/student/complaints', icon: <MessageSquare size={16} /> },
          { name: 'Vendors', path: '/student/vendors', icon: <Store size={16} /> }
        ]
      : [];

  if (!currentUser) return null;

  return (
    <nav className="bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E8D5] sticky top-0 z-50 shadow-sm shadow-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="bg-primary p-1.5 rounded-lg shadow-md shadow-primary/30">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <Link
              to={userRole === 'admin' ? '/admin/dashboard' : '/student/home'}
              className="font-extrabold text-xl tracking-tight text-primary"
            >
              Mess Intel
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/8'
                      : 'text-[#4A3728] hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                  {/* Active indicator underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 ml-3 px-4 py-2 bg-primary hover:bg-primaryHover rounded-lg text-sm font-bold text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#4A3728] hover:text-primary hover:bg-primary/5 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#E8E8D5] pb-4 px-4 pt-2 animate-fade-in shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border-l-4 border-primary'
                      : 'text-[#4A3728] hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primaryHover transition-colors mt-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

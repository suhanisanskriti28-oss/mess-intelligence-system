import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Successfully logged in!");
      // Navigation is handled by ProtectedRoute automatically checking state
      // but we can ensure a forced redirect to home handled there or here
      navigate('/'); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-[#FDF5E6] rounded-3xl shadow-[0_20px_60px_-15px_rgba(128,0,0,0.4)] hover:shadow-[0_30px_70px_-15px_rgba(74,55,40,0.5)] hover:-translate-y-2 transition-all duration-500 p-8 space-y-6 animate-fade-in relative z-10 border-b-4 border-r-4 border-primary/20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#800000]">Welcome back</h2>
          <p className="text-[#4A3728] mt-2 font-medium">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block tracking-wide text-[#4A3728] text-sm font-bold mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 bg-white border border-[#E8E8D5] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 shadow-sm"
                placeholder="student@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block tracking-wide text-[#4A3728] text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-3 py-3 bg-white border border-[#E8E8D5] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 shadow-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-bold text-white bg-primary hover:bg-primaryHover shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FDF5E6] focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6 md:mt-8 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-neonRed hover:text-red-400 transition-colors">
            Sign up as a student
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

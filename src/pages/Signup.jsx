import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name, role);
      toast.success("Account created successfully!");
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/home'); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-[#FDF5E6] border-panelBorder rounded-3xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 p-8 space-y-6 animate-fade-in relative z-10 border-b-4 border-r-4 border-primary/5">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#800000]">Create an account</h2>
          <p className="text-[#4A3728] mt-2 font-medium">Join Mess Intel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Role Selection */}
          <div className="flex rounded-md shadow-sm p-1 bg-white border border-[#E8E8D5] mb-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 flex justify-center items-center py-2 px-4 rounded-md text-sm font-bold transition-all ${
                role === 'student' ? 'bg-[#FDF5E6] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 flex justify-center items-center py-2 px-4 rounded-md text-sm font-bold transition-all ${
                role === 'admin' ? 'bg-[#FDF5E6] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Admin
            </button>
          </div>

          <div>
            <label className="block tracking-wide text-[#4A3728] text-sm font-bold mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 bg-white border border-[#E8E8D5] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 shadow-sm"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
            {loading ? 'Creating account...' : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Sign Up
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6 md:mt-8 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-neonRed hover:text-red-400 transition-colors">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

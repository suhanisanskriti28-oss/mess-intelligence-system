import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Utensils, MessageSquare, Star, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Landing = () => {
  const { currentUser, userRole } = useAuth();

  // Redirect if already logged in
  if (currentUser) {
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'student') return <Navigate to="/student/home" replace />;
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center animate-fade-in overflow-hidden">

      {/* Warm glow flares */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary rounded-full opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-neonOrange rounded-full opacity-8 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Hero Text — centered on all screens */}
        <div className="text-center space-y-6 pt-8 pb-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FDF5E6] border border-[#E8E8D5] rounded-full shadow-md">
            <span className="w-2 h-2 rounded-full bg-neonOrange animate-pulse" />
            <span className="text-xs font-bold text-[#4A3728] tracking-wider uppercase">Built for Modern Campuses</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#4A3728] tracking-tight leading-tight">
            Next Gen <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neonOrange">
              Mess Intel
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#4A3728]/70 font-medium max-w-2xl mx-auto leading-relaxed px-2">
            Real-time meal feedback, complaint tracking, and smart vendor selection — all in one beautiful platform built for student mess systems.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primaryHover text-white rounded-xl font-bold text-sm sm:text-base transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 duration-200"
            >
              <Utensils size={20} />
              Get Started — Student Login
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FDF5E6] border border-[#E8E8D5] hover:border-primary/30 text-[#4A3728] rounded-xl font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
            >
              Admin Portal
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-12">
          {[
            {
              icon: <Star className="h-6 w-6 text-primary" />,
              title: 'Meal Ratings',
              desc: 'Rate every meal and drive data-powered improvements to your daily food.'
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-primary" />,
              title: 'Complaint Board',
              desc: 'Post, upvote, and track complaints that matter most to your community.'
            },
            {
              icon: <ShieldCheck className="h-6 w-6 text-primary" />,
              title: 'Vendor Choice',
              desc: 'Browse full weekly menus and opt into your preferred caterer each month.'
            }
          ].map((f) => (
            <div
              key={f.title}
              className="bg-[#FDF5E6] border border-[#E8E8D5] rounded-2xl p-5 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-primary/10 w-11 h-11 rounded-xl flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="font-extrabold text-primary text-sm mb-1">{f.title}</h3>
              <p className="text-[#4A3728]/70 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Landing;

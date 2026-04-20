import React from 'react';
import QRCode from 'react-qr-code';
import { X, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const MealPassModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  const today = new Date();
  
  // Format data for the QR
  const qrData = JSON.stringify({
    uid: user.uid,
    name: user.name,
    date: format(today, 'yyyy-MM-dd')
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDF5E6] border-panelBorder rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="bg-primary p-6 text-center text-white">
          <h2 className="text-xl font-bold tracking-tight">Digital Meal Pass</h2>
          <p className="text-indigo-200 text-sm mt-1">{format(today, 'EEEE, MMMM do')}</p>
        </div>

        <div className="p-8 flex flex-col items-center">
          <div className="bg-[#FDF5E6] border-panelBorder p-4 rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border-2 border-indigo-50 mb-6">
            <QRCode value={qrData} size={180} fgColor="#111827" />
          </div>

          <div className="text-center w-full">
            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-500 mb-4">{user.email}</p>
            
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 py-2 px-4 rounded-lg">
              <CheckCircle size={16} />
              Status: Active & Valid
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPassModal;

import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = true, text = "Loading..." }) => {
  const containerClass = fullScreen 
    ? "min-h-screen w-full flex flex-col items-center justify-center bg-[#FDFBF7]"
    : "w-full py-12 flex flex-col items-center justify-center";

  return (
    <div className={containerClass}>
      <div className="relative mb-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <div className="absolute inset-0 h-10 w-10 rounded-full bg-primary/10 animate-ping" />
      </div>
      <p className="text-[#4A3728] font-semibold text-sm tracking-wide">{text}</p>
    </div>
  );
};

export default Loader;

import React, { useEffect, useRef, useState } from 'react';

// Animated count-up hook
const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (typeof target === 'string' || isNaN(Number(target))) {
      setValue(target);
      return;
    }
    const end = Number(target);
    const start = 0;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
};

const StatsCard = ({ title, value, icon: Icon, colorClass, subtitle }) => {
  const animatedValue = useCountUp(value);

  // Determine if value is numeric for animated display
  const isNumeric = typeof value === 'number';

  return (
    <div className="group bg-[#FDF5E6] rounded-xl border border-[#E8E8D5] p-6 flex items-center justify-between shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
      <div>
        <h3 className="text-xs font-bold text-[#4A3728]/60 tracking-widest uppercase mb-1">{title}</h3>
        <div className="text-3xl font-extrabold text-primary">
          {isNumeric ? animatedValue : value}
        </div>
        {subtitle && (
          <p className="text-xs text-[#4A3728]/60 mt-1.5 font-medium">{subtitle}</p>
        )}
      </div>
      {Icon && (
        <div className={`p-4 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-7 w-7" />
        </div>
      )}
    </div>
  );
};

export default StatsCard;

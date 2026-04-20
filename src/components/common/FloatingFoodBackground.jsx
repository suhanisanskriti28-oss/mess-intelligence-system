import React, { useState, useEffect } from 'react';
import { Utensils, Coffee, Pizza, Croissant, Apple, Carrot, Cherry, Cake } from 'lucide-react';

// Collection of background icons with relative depth & positioning characteristics
const FOOD_ICONS = [
  { id: 1, Icon: Utensils, color: 'text-indigo-200', startX: 10, startY: 15, size: 64, depth: 0.8, rotation: 15 },
  { id: 2, Icon: Coffee, color: 'text-amber-200', startX: 85, startY: 20, size: 80, depth: 1.2, rotation: -10 },
  { id: 3, Icon: Pizza, color: 'text-orange-200', startX: 20, startY: 75, size: 96, depth: 1.5, rotation: 45 },
  { id: 4, Icon: Croissant, color: 'text-yellow-200', startX: 75, startY: 80, size: 72, depth: 0.9, rotation: -25 },
  { id: 5, Icon: Apple, color: 'text-red-200', startX: 50, startY: 10, size: 50, depth: 0.4, rotation: 5 },
  { id: 6, Icon: Carrot, color: 'text-orange-300', startX: 90, startY: 50, size: 60, depth: 0.6, rotation: -45 },
  { id: 7, Icon: Cherry, color: 'text-rose-300', startX: 5, startY: 45, size: 45, depth: 0.5, rotation: 20 },
  { id: 8, Icon: Cake, color: 'text-pink-200', startX: 45, startY: 90, size: 85, depth: 1.8, rotation: -5 }
];

const FloatingFoodBackground = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e) => {
    // Calculate normalized mouse position relative to center of screen screen (-1 to 1)
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden bg-darkBg flex items-center justify-center p-6"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isClient && FOOD_ICONS.map((item) => {
          const { Icon, color, startX, startY, size, depth, rotation } = item;
          // Calculate parallax offset based on depth setting
          const xOffset = mousePos.x * depth * -30; // Negative for opposite movement direction
          const yOffset = mousePos.y * depth * -30;
          
          return (
            <div
              key={item.id}
              className={`absolute opacity-60 ${color} transition-transform duration-300 ease-out`}
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
              }}
            >
              <Icon size={size} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Content Layer (Foreground) */}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default FloatingFoodBackground;
